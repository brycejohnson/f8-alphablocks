/**
 * Cloudflare Pages Function — Audio proxy
 * Route: /volcanofrog/audio/:lang/:id.m4a
 *
 * 1. Try R2 first (cache-first, near-zero latency, free egress)
 * 2. If missing, call Google TTS, store result in R2, return audio
 * 3. If TTS key absent or TTS fails, return 404
 */

interface Env {
  AUDIO_BUCKET: R2Bucket
  GOOGLE_TTS_KEY?: string
}

// Maps curriculum IDs to Google TTS pronunciation hints
const EN_PHONEME_TEXT: Record<string, string> = {
  // Vowels — short vowel sounds
  'en-a': 'aa', 'en-e': 'eh', 'en-i': 'ih', 'en-o': 'oh', 'en-u': 'uh',
  // Vowel digraphs
  'en-ay': 'ay', 'en-ee': 'ee', 'en-igh': 'eye', 'en-oa': 'oh', 'en-oo': 'oo',
  // Plosives — "-ah" form (avoids open-syllable /uː/ reading in any English accent)
  'en-b': 'bah', 'en-c': 'cah', 'en-d': 'dah', 'en-g': 'gah',
  'en-k': 'cah', 'en-p': 'pah', 'en-t': 'tah',
  // Fricatives/nasals — "-ah" form
  'en-f': 'fah', 'en-h': 'hah', 'en-l': 'lah', 'en-m': 'mmm',
  'en-n': 'nah', 'en-r': 'rah', 'en-s': 'sah', 'en-v': 'vah',
  // Digraph consonants
  'en-sh': 'shh', 'en-ch': 'chah', 'en-th': 'thah', 'en-ng': 'ngg', 'en-ck': 'cah',
}

// For Mandarin, the text is embedded in the ID: zh-ma-1 → "mā" etc.
// Rather than decode tones here, we use the ID suffix to pick pinyin text.
const ZH_TONE_MAP: Record<string, string> = { '1': '1', '2': '2', '3': '3', '4': '4' }

function idToTtsParams(lang: string, id: string): { text: string; languageCode: string; name: string } | null {
  if (lang === 'en') {
    // Phoneme: en-sh → text = "sh"; word: en-cat → text = "cat"
    const text = EN_PHONEME_TEXT[id] ?? id.replace(/^en-/, '')
    return { text, languageCode: 'en-US', name: 'en-US-Neural2-D' }
  }
  if (lang === 'zh') {
    // e.g. zh-ma-1 → pinyin "mā", zh-ma1 → word "妈"
    // For simplicity: strip zh- prefix and pass the pinyin/characters directly
    const raw = id.replace(/^zh-/, '')
    return { text: raw, languageCode: 'cmn-CN', name: 'cmn-CN-Neural2-B' }
  }
  return null
}

async function synthesiseWithTts(
  params: { text: string; languageCode: string; name: string },
  apiKey: string
): Promise<ArrayBuffer | null> {
  const body = {
    input: { text: params.text },
    voice: { languageCode: params.languageCode, name: params.name },
    audioConfig: { audioEncoding: 'MP3' },
  }
  const res = await fetch(
    `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
    { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
  )
  if (!res.ok) return null
  const json = await res.json() as { audioContent?: string }
  if (!json.audioContent) return null
  // Decode base64 → ArrayBuffer
  const binary = atob(json.audioContent)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return bytes.buffer
}

export const onRequest: PagesFunction<Env> = async ({ request, env, params }) => {
  // params.path is an array e.g. ['en', 'en-a.m4a']
  const pathParts = (params.path as string[])
  const r2Key = 'audio/' + pathParts.join('/')

  // 1. R2 lookup
  const obj = await env.AUDIO_BUCKET.get(r2Key)
  if (obj) {
    // Use stored content-type if set, otherwise serve as MP3 (our generated files are MP3)
    const ct = obj.httpMetadata?.contentType ?? 'audio/mpeg'
    return new Response(obj.body, {
      headers: {
        'Content-Type': ct,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    })
  }

  // 2. TTS fallback
  if (!env.GOOGLE_TTS_KEY) {
    return new Response('Not found', { status: 404 })
  }

  const lang = pathParts[0] // 'en' or 'zh'
  const filename = pathParts[pathParts.length - 1] // 'en-a.m4a'
  const id = filename.replace(/\.m4a$/, '')
  const ttsParams = idToTtsParams(lang, id)
  if (!ttsParams) return new Response('Not found', { status: 404 })

  const audio = await synthesiseWithTts(ttsParams, env.GOOGLE_TTS_KEY)
  if (!audio) return new Response('TTS failed', { status: 502 })

  // Store in R2 so next request hits cache
  await env.AUDIO_BUCKET.put(r2Key, audio, {
    httpMetadata: { contentType: 'audio/mp4' },
  })

  return new Response(audio, {
    headers: {
      'Content-Type': 'audio/mp4',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
