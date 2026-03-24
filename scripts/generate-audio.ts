/**
 * Batch audio generation script — Google Cloud TTS Neural2
 *
 * Generates all phoneme + word audio files for f8-alphablocks.
 * IDs match exactly what the curriculum/phonemePlayer expects.
 * Skips files that already exist — safe to re-run.
 *
 * Usage:
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-audio.ts
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-audio.ts --lang=en
 *   npx ts-node --project tsconfig.scripts.json scripts/generate-audio.ts --lang=zh
 *
 * Requires: GOOGLE_TTS_API_KEY in .env
 */

import * as fs from 'fs'
import * as path from 'path'
import * as https from 'https'

// Load .env manually
const envPath = path.join(process.cwd(), '.env')
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8')
    .split('\n')
    .forEach(line => {
      const [key, ...val] = line.split('=')
      if (key && val.length) process.env[key.trim()] = val.join('=').trim()
    })
}

const API_KEY = process.env.GOOGLE_TTS_API_KEY
if (!API_KEY) {
  console.error('Missing GOOGLE_TTS_API_KEY in .env')
  process.exit(1)
}

const OUTPUT_EN = path.join(process.cwd(), 'static', 'audio', 'en')
const OUTPUT_ZH = path.join(process.cwd(), 'static', 'audio', 'zh')
fs.mkdirSync(OUTPUT_EN, { recursive: true })
fs.mkdirSync(OUTPUT_ZH, { recursive: true })

// ---------------------------------------------------------------------------
// English phonemes — IDs must match curriculum/en.ts newPhonemeIds exactly
// ---------------------------------------------------------------------------

interface EnPhoneme {
  id: string      // file stem — e.g. en-sh, en-a, en-ck
  text: string    // plain text — TTS reads this directly, no IPA tags (Wavenet-B ignores them)
  label: string
}

// UK phonics sounds — plain text so TTS reads exactly what we write.
// Plosives: "buh", "puh" etc. = the phoneme + schwa (standard phonics teaching sound).
// Fricatives/nasals: repeated letter = sustained sound ("sss", "mmm").
// Vowels: short words that start with the correct vowel sound.
// Digraphs: the digraph text itself (TTS reads "shh", "ee", "ay" correctly).
const EN_PHONEMES: EnPhoneme[] = [
  // Short vowels — schwa/exclamation form that TTS reads as the short vowel sound
  { id: 'en-a',   text: 'aa',    label: '/æ/ as in cat' },
  { id: 'en-e',   text: 'eh',    label: '/ɛ/ as in bed' },
  { id: 'en-i',   text: 'ih',    label: '/ɪ/ as in sit' },
  { id: 'en-o',   text: 'oh',    label: '/ɒ/ as in hot' },
  { id: 'en-u',   text: 'uh',    label: '/ʌ/ as in cup' },
  // Vowel digraphs — TTS reads these as the correct vowel team sounds
  { id: 'en-ay',  text: 'ay',    label: '/eɪ/ as in rain' },
  { id: 'en-ee',  text: 'ee',    label: '/iː/ as in feet' },
  { id: 'en-igh', text: 'eye',   label: '/aɪ/ as in night' },
  { id: 'en-oa',  text: 'oh',    label: '/oʊ/ as in boat' },
  { id: 'en-oo',  text: 'oo',    label: '/uː/ as in moon' },
  // Plosive consonants — "-ah" form: British Neural2-B reads open "pu/tu/su" as /uː/
  // Using "-ah" forces /ɑː/ vowel in a closed-syllable context the TTS knows well.
  { id: 'en-b',   text: 'bah',   label: '/b/' },
  { id: 'en-c',   text: 'cah',   label: '/k/ (c spelling)' },
  { id: 'en-ck',  text: 'cah',   label: '/k/ (ck spelling)' },
  { id: 'en-d',   text: 'dah',   label: '/d/' },
  { id: 'en-g',   text: 'gah',   label: '/ɡ/' },
  { id: 'en-k',   text: 'cah',   label: '/k/ (k spelling)' },
  { id: 'en-p',   text: 'pah',   label: '/p/' },
  { id: 'en-t',   text: 'tah',   label: '/t/' },
  // Fricatives — "-ah" form
  { id: 'en-f',   text: 'fah',   label: '/f/' },
  { id: 'en-h',   text: 'hah',   label: '/h/' },
  { id: 'en-r',   text: 'rah',   label: '/r/' },
  { id: 'en-s',   text: 'sah',   label: '/s/' },
  { id: 'en-v',   text: 'vah',   label: '/v/' },
  // Nasals/liquids — "-ah" form
  { id: 'en-l',   text: 'lah',   label: '/l/' },
  { id: 'en-m',   text: 'mmm',   label: '/m/' },
  { id: 'en-n',   text: 'nah',   label: '/n/' },
  // Digraph consonants
  { id: 'en-sh',  text: 'shh',   label: '/ʃ/' },
  { id: 'en-ch',  text: 'chah',  label: '/tʃ/' },
  { id: 'en-th',  text: 'thah',  label: '/θ/ as in thin' },
  { id: 'en-ng',  text: 'ngg',   label: '/ŋ/ as in ring' },
]

// All words from curriculum/en.ts — IDs must match exactly
const EN_WORDS: Array<{ id: string; text: string }> = [
  // Phase 1
  { id: 'en-sat',   text: 'sat' },
  { id: 'en-sit',   text: 'sit' },
  { id: 'en-tin',   text: 'tin' },
  { id: 'en-pin',   text: 'pin' },
  { id: 'en-tip',   text: 'tip' },
  { id: 'en-tap',   text: 'tap' },
  { id: 'en-nap',   text: 'nap' },
  { id: 'en-pan',   text: 'pan' },
  { id: 'en-tan',   text: 'tan' },
  { id: 'en-sip',   text: 'sip' },
  { id: 'en-pit',   text: 'pit' },
  { id: 'en-ant',   text: 'ant' },
  // Phase 2
  { id: 'en-cat',   text: 'cat' },
  { id: 'en-dog',   text: 'dog' },
  { id: 'en-map',   text: 'map' },
  { id: 'en-top',   text: 'top' },
  { id: 'en-kit',   text: 'kit' },
  { id: 'en-kid',   text: 'kid' },
  { id: 'en-cod',   text: 'cod' },
  { id: 'en-cot',   text: 'cot' },
  { id: 'en-dot',   text: 'dot' },
  { id: 'en-got',   text: 'got' },
  { id: 'en-nod',   text: 'nod' },
  { id: 'en-mop',   text: 'mop' },
  { id: 'en-pig',   text: 'pig' },
  { id: 'en-dig',   text: 'dig' },
  { id: 'en-mad',   text: 'mad' },
  { id: 'en-can',   text: 'can' },
  // Phase 3
  { id: 'en-red',   text: 'red' },
  { id: 'en-bed',   text: 'bed' },
  { id: 'en-hen',   text: 'hen' },
  { id: 'en-leg',   text: 'leg' },
  { id: 'en-pet',   text: 'pet' },
  { id: 'en-run',   text: 'run' },
  { id: 'en-bun',   text: 'bun' },
  { id: 'en-bug',   text: 'bug' },
  { id: 'en-rug',   text: 'rug' },
  { id: 'en-mud',   text: 'mud' },
  { id: 'en-fun',   text: 'fun' },
  { id: 'en-hug',   text: 'hug' },
  { id: 'en-lip',   text: 'lip' },
  { id: 'en-log',   text: 'log' },
  { id: 'en-hot',   text: 'hot' },
  { id: 'en-fog',   text: 'fog' },
  { id: 'en-rob',   text: 'rob' },
  { id: 'en-bit',   text: 'bit' },
  // Phase 4
  { id: 'en-ship',  text: 'ship' },
  { id: 'en-shop',  text: 'shop' },
  { id: 'en-chip',  text: 'chip' },
  { id: 'en-chop',  text: 'chop' },
  { id: 'en-chin',  text: 'chin' },
  { id: 'en-thin',  text: 'thin' },
  { id: 'en-that',  text: 'that' },
  { id: 'en-ring',  text: 'ring' },
  { id: 'en-king',  text: 'king' },
  { id: 'en-sing',  text: 'sing' },
  { id: 'en-bang',  text: 'bang' },
  { id: 'en-duck',  text: 'duck' },
  { id: 'en-lock',  text: 'lock' },
  { id: 'en-sock',  text: 'sock' },
  { id: 'en-pick',  text: 'pick' },
  { id: 'en-kick',  text: 'kick' },
  // Phase 5
  { id: 'en-rain',  text: 'rain' },
  { id: 'en-sail',  text: 'sail' },
  { id: 'en-tail',  text: 'tail' },
  { id: 'en-paid',  text: 'paid' },
  { id: 'en-feet',  text: 'feet' },
  { id: 'en-seen',  text: 'seen' },
  { id: 'en-keep',  text: 'keep' },
  { id: 'en-deep',  text: 'deep' },
  { id: 'en-night', text: 'night' },
  { id: 'en-light', text: 'light' },
  { id: 'en-sigh',  text: 'sigh' },
  { id: 'en-boat',  text: 'boat' },
  { id: 'en-coat',  text: 'coat' },
  { id: 'en-road',  text: 'road' },
  { id: 'en-moon',  text: 'moon' },
  { id: 'en-pool',  text: 'pool' },
  { id: 'en-root',  text: 'root' },
  { id: 'en-boot',  text: 'boot' },
]

// ---------------------------------------------------------------------------
// Mandarin — IDs match curriculum/zh.ts newPhonemeIds + word IDs exactly
// ---------------------------------------------------------------------------

interface ZhEntry {
  id: string
  text: string
  label: string
}

// Single characters — each is one atomic phoneme (no initial/final breakdown)
const ZH_CHARACTERS: ZhEntry[] = [
  { id: 'zh-huo3',  text: '火',   label: 'huǒ fire' },
  { id: 'zh-shan1', text: '山',   label: 'shān mountain' },
  { id: 'zh-shui3', text: '水',   label: 'shuǐ water' },
  { id: 'zh-da4',   text: '大',   label: 'dà big' },
  { id: 'zh-xiao3', text: '小',   label: 'xiǎo small' },
  { id: 'zh-ren2',  text: '人',   label: 'rén person' },
  { id: 'zh-ri4',   text: '日',   label: 'rì sun' },
  { id: 'zh-yue4',  text: '月',   label: 'yuè moon' },
  { id: 'zh-mu4',   text: '木',   label: 'mù tree' },
  { id: 'zh-guo3',  text: '果',   label: 'guǒ fruit' },
]

// Compound words — combinations of known characters
const ZH_COMPOUNDS: ZhEntry[] = [
  { id: 'zh-huoshan',  text: '火山', label: 'huǒshān volcano' },
  { id: 'zh-shanshui', text: '山水', label: 'shānshuǐ landscape' },
  { id: 'zh-shuiguo',  text: '水果', label: 'shuǐguǒ fruit' },
  { id: 'zh-daren',    text: '大人', label: 'dàrén adult' },
  { id: 'zh-dashan',   text: '大山', label: 'dàshān big mountain' },
]

// Numbers 1-10
const ZH_NUMBERS: ZhEntry[] = [
  { id: 'zh-yi1',  text: '一', label: 'yī one' },
  { id: 'zh-er4',  text: '二', label: 'èr two' },
  { id: 'zh-san1', text: '三', label: 'sān three' },
  { id: 'zh-si4',  text: '四', label: 'sì four' },
  { id: 'zh-wu3',  text: '五', label: 'wǔ five' },
  { id: 'zh-liu4', text: '六', label: 'liù six' },
  { id: 'zh-qi1',  text: '七', label: 'qī seven' },
  { id: 'zh-ba1',  text: '八', label: 'bā eight' },
  { id: 'zh-jiu3', text: '九', label: 'jiǔ nine' },
  { id: 'zh-shi2', text: '十', label: 'shí ten' },
]

// Animals
const ZH_ANIMALS: ZhEntry[] = [
  { id: 'zh-mao1',  text: '猫', label: 'māo cat' },
  { id: 'zh-gou3',  text: '狗', label: 'gǒu dog' },
  { id: 'zh-yu2',   text: '鱼', label: 'yú fish' },
  { id: 'zh-niao3', text: '鸟', label: 'niǎo bird' },
  { id: 'zh-ma3',   text: '马', label: 'mǎ horse' },
  { id: 'zh-niu2',  text: '牛', label: 'niú cow' },
  { id: 'zh-zhu1',  text: '猪', label: 'zhū pig' },
  { id: 'zh-yang2', text: '羊', label: 'yáng sheep' },
  { id: 'zh-ji1',   text: '鸡', label: 'jī chicken' },
  { id: 'zh-long2', text: '龙', label: 'lóng dragon' },
  { id: 'zh-shi1',  text: '狮', label: 'shī lion' },
  { id: 'zh-hou2',  text: '猴', label: 'hóu monkey' },
  { id: 'zh-xiong2',text: '熊', label: 'xióng bear' },
  { id: 'zh-tu4',   text: '兔', label: 'tù rabbit' },
  { id: 'zh-she2',  text: '蛇', label: 'shé snake' },
  { id: 'zh-hu3',   text: '虎', label: 'hǔ tiger' },
  { id: 'zh-xiang4',text: '象', label: 'xiàng elephant' },
  { id: 'zh-e2',    text: '鹅', label: 'é goose' },
  { id: 'zh-ya1',   text: '鸭', label: 'yā duck' },
  { id: 'zh-kong3', text: '恐', label: 'kǒng' },
]

// Compound animal words
const ZH_COMPOUND_ANIMALS: ZhEntry[] = [
  { id: 'zh-xiaogou',  text: '小狗', label: 'xiǎogǒu puppy' },
  { id: 'zh-xiaomao',  text: '小猫', label: 'xiǎomāo kitten' },
  { id: 'zh-xiaoniao', text: '小鸟', label: 'xiǎoniǎo little bird' },
  { id: 'zh-dama',     text: '大马', label: 'dàmǎ big horse' },
  { id: 'zh-shuiniu',  text: '水牛', label: 'shuǐniú water buffalo' },
  { id: 'zh-huolong',  text: '火龙', label: 'huǒlóng fire dragon' },
  { id: 'zh-daxiang',  text: '大象', label: 'dàxiàng elephant' },
  { id: 'zh-xiongmao', text: '熊猫', label: 'xióngmāo panda' },
  { id: 'zh-xiaotu',   text: '小兔', label: 'xiǎotù bunny' },
  { id: 'zh-konglong', text: '恐龙', label: 'kǒnglóng dinosaur' },
]

// Colours
const ZH_COLOURS: ZhEntry[] = [
  { id: 'zh-hong2',  text: '红', label: 'hóng red' },
  { id: 'zh-lan2',   text: '蓝', label: 'lán blue' },
  { id: 'zh-lv4',    text: '绿', label: 'lǜ green' },
  { id: 'zh-huang2', text: '黄', label: 'huáng yellow' },
  { id: 'zh-bai2',   text: '白', label: 'bái white' },
  { id: 'zh-hei1',   text: '黑', label: 'hēi black' },
  { id: 'zh-fen3',   text: '粉', label: 'fěn pink' },
  { id: 'zh-zi3',    text: '紫', label: 'zǐ purple' },
]

// Compound colour words
const ZH_COMPOUND_COLOURS: ZhEntry[] = [
  { id: 'zh-hongshan', text: '红山', label: 'hóngshān red mountain' },
  { id: 'zh-huangniu', text: '黄牛', label: 'huángniú yellow cow' },
  { id: 'zh-baima',    text: '白马', label: 'báimǎ white horse' },
  { id: 'zh-heiyu',    text: '黑鱼', label: 'hēiyú black fish' },
  { id: 'zh-lanshan',  text: '蓝山', label: 'lánshān blue mountain' },
  { id: 'zh-honglong', text: '红龙', label: 'hónglóng red dragon' },
]

// Compound numbers
const ZH_COMPOUND_NUMBERS: ZhEntry[] = [
  { id: 'zh-shiyi',  text: '十一', label: 'shíyī eleven' },
  { id: 'zh-shier',  text: '十二', label: 'shíèr twelve' },
  { id: 'zh-shisan', text: '十三', label: 'shísān thirteen' },
  { id: 'zh-shiwu',  text: '十五', label: 'shíwǔ fifteen' },
  { id: 'zh-ershi',  text: '二十', label: 'èrshí twenty' },
  { id: 'zh-jiushi', text: '九十', label: 'jiǔshí ninety' },
]

// ---------------------------------------------------------------------------
// Google Cloud TTS
// ---------------------------------------------------------------------------

function ttsRequest(body: object): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(body)
    const options = {
      hostname: 'texttospeech.googleapis.com',
      path: `/v1/text:synthesize?key=${API_KEY}`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
      },
    }
    const req = https.request(options, (res) => {
      const chunks: Buffer[] = []
      res.on('data', (c) => chunks.push(c))
      res.on('end', () => {
        const json = JSON.parse(Buffer.concat(chunks).toString())
        if (json.error) return reject(new Error(`TTS error: ${JSON.stringify(json.error)}`))
        resolve(Buffer.from(json.audioContent, 'base64'))
      })
    })
    req.on('error', reject)
    req.write(payload)
    req.end()
  })
}

async function generateFile(opts: {
  outputPath: string
  ssml?: string
  text?: string
  languageCode: string
  voiceName: string
}) {
  if (fs.existsSync(opts.outputPath)) {
    console.log(`  skip (exists): ${path.basename(opts.outputPath)}`)
    return
  }

  const input = opts.ssml
    ? { ssml: `<speak>${opts.ssml}</speak>` }
    : { text: opts.text }

  const isChirp = opts.voiceName.includes('Chirp')
  const body = {
    input,
    voice: { languageCode: opts.languageCode, name: opts.voiceName },
    audioConfig: {
      audioEncoding: 'MP3',
      sampleRateHertz: 44100,
      speakingRate: 0.85,
      ...(isChirp ? {} : {
        effectsProfileId: ['headphone-class-device'],
        pitch: 1.5,
      }),
    },
  }

  try {
    const audio = await ttsRequest(body)
    fs.writeFileSync(opts.outputPath, audio)
    console.log(`  ✓ ${path.basename(opts.outputPath)}`)
  } catch (err) {
    console.error(`  ✗ ${path.basename(opts.outputPath)}: ${err}`)
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function generateEnglish() {
  console.log('\n── English phonemes ──')
  for (const p of EN_PHONEMES) {
    await generateFile({
      outputPath: path.join(OUTPUT_EN, `${p.id}.m4a`),
      text: p.text,
      languageCode: 'en-US',
      voiceName: 'en-US-Neural2-D',
    })
  }

  console.log('\n── English words ──')
  for (const w of EN_WORDS) {
    await generateFile({
      outputPath: path.join(OUTPUT_EN, `${w.id}.m4a`),
      text: w.text,
      languageCode: 'en-US',
      voiceName: 'en-US-Neural2-D',
    })
  }
}

async function generateMandarin() {
  console.log('\n── Mandarin characters (single) ──')
  for (const p of ZH_CHARACTERS) {
    await generateFile({
      outputPath: path.join(OUTPUT_ZH, `${p.id}.m4a`),
      text: p.text,
      languageCode: 'cmn-CN',
      voiceName: 'cmn-CN-Chirp3-HD-Aoede',
    })
  }

  console.log('\n── Mandarin compound words ──')
  for (const w of ZH_COMPOUNDS) {
    await generateFile({
      outputPath: path.join(OUTPUT_ZH, `${w.id}.m4a`),
      text: w.text,
      languageCode: 'cmn-CN',
      voiceName: 'cmn-CN-Chirp3-HD-Aoede',
    })
  }

  console.log('\n── Mandarin numbers ──')
  for (const p of ZH_NUMBERS) {
    await generateFile({
      outputPath: path.join(OUTPUT_ZH, `${p.id}.m4a`),
      text: p.text,
      languageCode: 'cmn-CN',
      voiceName: 'cmn-CN-Chirp3-HD-Aoede',
    })
  }

  console.log('\n── Mandarin compound numbers ──')
  for (const w of ZH_COMPOUND_NUMBERS) {
    await generateFile({
      outputPath: path.join(OUTPUT_ZH, `${w.id}.m4a`),
      text: w.text,
      languageCode: 'cmn-CN',
      voiceName: 'cmn-CN-Chirp3-HD-Aoede',
    })
  }

  console.log('\n── Mandarin animals ──')
  for (const p of ZH_ANIMALS) {
    await generateFile({
      outputPath: path.join(OUTPUT_ZH, `${p.id}.m4a`),
      text: p.text,
      languageCode: 'cmn-CN',
      voiceName: 'cmn-CN-Chirp3-HD-Aoede',
    })
  }

  console.log('\n── Mandarin compound animals ──')
  for (const w of ZH_COMPOUND_ANIMALS) {
    await generateFile({
      outputPath: path.join(OUTPUT_ZH, `${w.id}.m4a`),
      text: w.text,
      languageCode: 'cmn-CN',
      voiceName: 'cmn-CN-Chirp3-HD-Aoede',
    })
  }

  console.log('\n── Mandarin colours ──')
  for (const p of ZH_COLOURS) {
    await generateFile({
      outputPath: path.join(OUTPUT_ZH, `${p.id}.m4a`),
      text: p.text,
      languageCode: 'cmn-CN',
      voiceName: 'cmn-CN-Chirp3-HD-Aoede',
    })
  }

  console.log('\n── Mandarin compound colours ──')
  for (const w of ZH_COMPOUND_COLOURS) {
    await generateFile({
      outputPath: path.join(OUTPUT_ZH, `${w.id}.m4a`),
      text: w.text,
      languageCode: 'cmn-CN',
      voiceName: 'cmn-CN-Chirp3-HD-Aoede',
    })
  }
}

async function main() {
  const args = process.argv.slice(2)
  const lang = args.find(a => a.startsWith('--lang='))?.split('=')[1]

  console.log('f8-alphablocks — Google Cloud TTS batch generator')
  console.log(`Output: ${OUTPUT_EN}, ${OUTPUT_ZH}`)

  if (!lang || lang === 'en') await generateEnglish()
  if (!lang || lang === 'zh') await generateMandarin()

  console.log('\n✓ Done.')
}

main().catch(console.error)
