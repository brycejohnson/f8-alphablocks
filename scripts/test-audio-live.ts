/**
 * Live audio validation test
 *
 * Fetches every phoneme audio URL from the live deployment and verifies:
 *  1. HTTP 200
 *  2. Content-Type contains 'audio' or 'octet-stream'
 *  3. Body is non-empty
 *  4. First bytes are a valid MP3 sync word (0xFF 0xFB / 0xFF 0xFA / ID3 tag)
 *
 * Usage:
 *   npx ts-node --project tsconfig.scripts.json scripts/test-audio-live.ts
 *   BASE_URL=https://your-deployment.pages.dev/volcanofrog npx ts-node --project tsconfig.scripts.json scripts/test-audio-live.ts
 */

import * as https from 'https'
import * as http from 'http'
import { URL } from 'url'

const BASE_URL = process.env.BASE_URL ?? 'https://aq-website.pages.dev/volcanofrog'
const CACHE_BUST = 'v=6'

// All phoneme IDs that have generated audio files (matches generate-audio.ts EN_PHONEMES)
const EN_IDS = [
  'en-a', 'en-e', 'en-i', 'en-o', 'en-u',
  'en-ay', 'en-ee', 'en-igh', 'en-oa', 'en-oo',
  'en-b', 'en-c', 'en-ck', 'en-d', 'en-g', 'en-k', 'en-p', 'en-t',
  'en-f', 'en-h', 'en-r', 'en-s', 'en-v', 'en-l', 'en-m', 'en-n',
  'en-sh', 'en-ch', 'en-th', 'en-ng',
]

interface Result {
  id: string
  url: string
  pass: boolean
  status?: number
  contentType?: string
  bytes?: number
  magic?: string
  error?: string
}

function fetchBytes(url: string, maxBytes = 64): Promise<{ status: number; contentType: string; body: Buffer }> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url)
    const mod = parsed.protocol === 'https:' ? https : http
    let resolved = false
    const req = mod.get(url, (res) => {
      const status = res.statusCode ?? 0
      const contentType = res.headers['content-type'] ?? ''
      const chunks: Buffer[] = []
      let total = 0
      res.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
        total += chunk.length
        if (total >= maxBytes && !resolved) {
          resolved = true
          resolve({ status, contentType, body: Buffer.concat(chunks) })
          req.destroy() // abort rest of response — we have enough
        }
      })
      res.on('end', () => {
        if (!resolved) {
          resolved = true
          resolve({ status, contentType, body: Buffer.concat(chunks) })
        }
      })
      res.on('error', (e) => { if (!resolved) reject(e) })
    })
    req.on('error', (e) => { if (!resolved) reject(e) })
    req.setTimeout(10000, () => { if (!resolved) { req.destroy(); reject(new Error('timeout')) } })
  })
}

function magicDescription(buf: Buffer): string {
  if (buf.length < 2) return 'too short'
  const b0 = buf[0]; const b1 = buf[1]
  // ID3 tag
  if (b0 === 0x49 && b1 === 0x44 && buf[2] === 0x33) return 'ID3 tag (MP3)'
  // MPEG sync word: 0xFF 0xFx (where x >= 0xE0 for MPEG1, various for MPEG2)
  if (b0 === 0xFF && (b1 & 0xE0) === 0xE0) return `MP3 sync (0x${b0.toString(16).toUpperCase()} 0x${b1.toString(16).toUpperCase()})`
  // M4A / ftyp box
  if (buf.length >= 8 && buf.slice(4, 8).toString('ascii') === 'ftyp') return 'M4A/ftyp'
  return `unknown (0x${b0.toString(16).toUpperCase()} 0x${b1.toString(16).toUpperCase()})`
}

function isValidAudio(buf: Buffer): boolean {
  if (buf.length < 2) return false
  const b0 = buf[0]; const b1 = buf[1]
  if (b0 === 0x49 && b1 === 0x44 && buf[2] === 0x33) return true // ID3
  if (b0 === 0xFF && (b1 & 0xE0) === 0xE0) return true // MPEG sync
  if (buf.length >= 8 && buf.slice(4, 8).toString('ascii') === 'ftyp') return true // M4A
  return false
}

async function testOne(lang: string, id: string): Promise<Result> {
  const url = `${BASE_URL}/audio/${lang}/${id}.m4a?${CACHE_BUST}`
  try {
    const { status, contentType, body } = await fetchBytes(url, 64)
    const magic = magicDescription(body)
    const pass = status === 200
      && (contentType.includes('audio') || contentType.includes('octet-stream') || contentType.includes('mpeg'))
      && body.length > 0
      && isValidAudio(body)
    return { id, url, pass, status, contentType, bytes: body.length, magic }
  } catch (e) {
    return { id, url, pass: false, error: String(e) }
  }
}

async function main() {
  console.log(`\nTesting live audio: ${BASE_URL}\n`)

  const results: Result[] = []

  // Test English phonemes sequentially to avoid hammering the server
  for (const id of EN_IDS) {
    const r = await testOne('en', id)
    const icon = r.pass ? '✓' : '✗'
    if (r.pass) {
      console.log(`  ${icon} ${id.padEnd(10)} ${r.status} ${r.contentType?.split(';')[0]} [${r.magic}]`)
    } else {
      console.log(`  ${icon} ${id.padEnd(10)} FAIL  status=${r.status} ct="${r.contentType}" magic=${r.magic} err=${r.error ?? ''}`)
    }
    results.push(r)
  }

  const passed = results.filter(r => r.pass).length
  const failed = results.filter(r => !r.pass).length
  console.log(`\n${passed}/${results.length} passed${failed > 0 ? ` — ${failed} FAILED` : ''}`)

  if (failed > 0) {
    console.log('\nFailed IDs:')
    results.filter(r => !r.pass).forEach(r => console.log(`  ${r.id}: ${r.url}`))
    process.exit(1)
  }
}

main().catch(e => { console.error(e); process.exit(1) })
