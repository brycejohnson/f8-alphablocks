/**
 * Upload generated audio files to Cloudflare R2
 *
 * Run after generate-audio.ts:
 *   node scripts/upload-audio.mjs
 *
 * Reads token from cloudflare.env (same pattern as aq-website)
 */

import { execSync } from 'child_process'
import { readFileSync, readdirSync, existsSync } from 'fs'
import { resolve, join } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const projectDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const nodejsDir = 'C:\\Program Files\\nodejs'

const envWithPath = {
  ...process.env,
  PATH: `${nodejsDir};${process.env.PATH || ''}`
}

// Load Cloudflare credentials — same pattern as aq-website
const envContent = readFileSync(resolve(projectDir, 'cloudflare.env'), 'utf-8')
const lines = envContent.trim().split('\n')
const token = lines[0].trim()
const accountId = '3436927bbff054905cd261f5bdd1a773'

const cfEnv = { ...envWithPath, CLOUDFLARE_API_TOKEN: token, CLOUDFLARE_ACCOUNT_ID: accountId }

const BUCKET = 'f8-alphablocks-audio'
const AUDIO_DIR = resolve(projectDir, 'static', 'audio')

function run(cmd) {
  return execSync(cmd, { cwd: projectDir, encoding: 'utf-8', env: cfEnv, timeout: 30000 })
}

// Create bucket if it doesn't exist
console.log(`Ensuring R2 bucket "${BUCKET}" exists...`)
try {
  run(`npx wrangler r2 bucket create ${BUCKET}`)
  console.log('  Bucket created.')
} catch (e) {
  const msg = (e.stderr || '') + (e.stdout || '') + (e.message || '')
  if (msg.includes('already exists') || msg.includes('10006')) {
    console.log('  Bucket already exists.')
  } else {
    console.error('  Bucket error:', msg)
    process.exit(1)
  }
}

// Upload all files from static/audio/
let uploaded = 0
let skipped = 0

for (const lang of ['en', 'zh']) {
  const dir = join(AUDIO_DIR, lang)
  if (!existsSync(dir)) { console.log(`  No ${lang} audio dir, skipping.`); continue }

  const files = readdirSync(dir).filter(f => f.endsWith('.m4a'))
  console.log(`\nUploading ${files.length} ${lang.toUpperCase()} files...`)

  for (const file of files) {
    const localPath = join(dir, file)
    const r2Key = `audio/${lang}/${file}`
    try {
      run(`npx wrangler r2 object put ${BUCKET}/${r2Key} --file="${localPath}" --content-type="audio/mp4"`)
      console.log(`  ✓ ${r2Key}`)
      uploaded++
    } catch (e) {
      console.error(`  ✗ ${r2Key}: ${e.message}`)
      skipped++
    }
  }
}

console.log(`\n✓ Done. ${uploaded} uploaded, ${skipped} failed.`)
console.log(`Files available at: https://${BUCKET}.r2.dev/audio/{lang}/{file}.m4a`)
console.log('(Enable public access on the bucket in Cloudflare Dashboard → R2 → bucket → Settings → Public Access)')
