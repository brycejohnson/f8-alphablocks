/**
 * Deploy volcanofrog to Cloudflare Pages
 * Same pattern as aq-website/deploy.mjs
 *
 * Usage:
 *   node deploy.mjs install
 *   node deploy.mjs build
 *   node deploy.mjs deploy
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync } from 'fs'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const projectDir = dirname(fileURLToPath(import.meta.url))
const logFile = resolve(projectDir, 'deploy_output.log')
const nodejsDir = 'C:\\Program Files\\nodejs'

const envWithPath = {
  ...process.env,
  PATH: `${nodejsDir};${process.env.PATH || ''}`
}

const action = process.argv[2] || 'install'
const projectName = 'volcanofrog'
const accountId = process.env.CF_ACCOUNT_ID || '3436927bbff054905cd261f5bdd1a773'
const zoneId = process.env.CF_ZONE_ID || '75f0fa5dcba84349f3d92800b20b95ee'

let output = ''
function log(msg) { console.log(msg); output += msg + '\n' }

/** Redact tokens/keys from strings before logging */
function sanitize(str, token) {
  if (!token || token.length < 8) return str
  return str.replaceAll(token, '***REDACTED***')
}

try {
  if (action === 'install') {
    log('Installing dependencies...')
    const out = execSync('npm install', { cwd: projectDir, encoding: 'utf-8', timeout: 120000, env: envWithPath })
    log(out)
    log('DONE: Dependencies installed')

  } else if (action === 'build') {
    log('Building project...')
    const out = execSync('npm run build', { cwd: projectDir, encoding: 'utf-8', timeout: 120000, env: envWithPath })
    log(out)
    log('DONE: Build completed')

  } else if (action === 'deploy') {
    const envContent = readFileSync(resolve(projectDir, 'cloudflare.env'), 'utf-8')
    const token = envContent.trim().split('\n')[0].trim()
    const cfEnv = { ...envWithPath, CLOUDFLARE_API_TOKEN: token, CLOUDFLARE_ACCOUNT_ID: accountId }

    // Ensure Pages project exists
    log(`Ensuring Cloudflare Pages project "${projectName}" exists...`)
    try {
      const out = execSync(`npx wrangler pages project create ${projectName} --production-branch main`, {
        cwd: projectDir, encoding: 'utf-8', timeout: 30000, env: cfEnv
      })
      log('Project created: ' + sanitize(out, token))
    } catch (e) {
      const msg = sanitize((e.stderr || '') + (e.stdout || '') + (e.message || ''), token)
      if (msg.includes('already exists') || msg.includes('8000002')) {
        log('Project already exists, deploying...')
      } else {
        log('Project create note: ' + msg)
      }
    }

    log(`Deploying to Cloudflare Pages: ${projectName}...`)
    const out = execSync(`npx wrangler pages deploy build --project-name ${projectName} --commit-dirty=true`, {
      cwd: projectDir, encoding: 'utf-8', timeout: 120000, env: cfEnv
    })
    log(sanitize(out, token))

    // Purge Cloudflare CDN cache so users get fresh assets immediately
    log('Purging Cloudflare CDN cache...')
    try {
      const purgeRes = execSync(
        `node -e "fetch('https://api.cloudflare.com/client/v4/zones/${zoneId}/purge_cache',{method:'POST',headers:{'Authorization':'Bearer '+process.env.CLOUDFLARE_API_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({purge_everything:true})}).then(r=>r.json()).then(j=>console.log(j.success?'Cache purged':'Purge failed: '+JSON.stringify(j.errors)))"`,
        { cwd: projectDir, encoding: 'utf-8', timeout: 15000, env: cfEnv }
      )
      log(purgeRes.trim())
    } catch (e) {
      log('Cache purge warning: ' + sanitize(e.message || String(e), token))
    }

    log('DONE: Deploy completed')
  }
} catch (err) {
  log('ERROR: ' + err.message)
  if (err.stdout) log('stdout: ' + err.stdout)
  if (err.stderr) log('stderr: ' + err.stderr)
}

writeFileSync(logFile, output, 'utf-8')
