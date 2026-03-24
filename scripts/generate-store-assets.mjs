import sharp from 'sharp'
import { mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'store-assets')
mkdirSync(outDir, { recursive: true })

// App Icon SVG (512x512)
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF6B35"/>
      <stop offset="100%" stop-color="#E53935"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="112" fill="url(#bg)"/>
  <rect x="72" y="72" width="368" height="368" rx="72" fill="#fff"/>
  <text x="256" y="352" text-anchor="middle" font-size="288" font-weight="900" font-family="Arial, sans-serif" fill="#1a1a1a">火</text>
</svg>`

// Feature Graphic SVG (1024x500)
const featureSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 500">
  <defs>
    <linearGradient id="bg2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1a1a2e"/>
      <stop offset="50%" stop-color="#16213e"/>
      <stop offset="100%" stop-color="#0f3460"/>
    </linearGradient>
  </defs>
  <rect width="1024" height="500" fill="url(#bg2)"/>

  <!-- Scattered small blocks -->
  <g transform="translate(80,60) rotate(-12)">
    <rect width="50" height="50" rx="12" fill="#fff" stroke="#1565C0" stroke-width="3" opacity="0.7"/>
    <text x="25" y="38" text-anchor="middle" font-size="28" font-weight="900" font-family="Arial" fill="#1a1a1a" opacity="0.7">水</text>
  </g>
  <g transform="translate(894,70) rotate(8)">
    <rect width="50" height="50" rx="12" fill="#fff" stroke="#F9A825" stroke-width="3" opacity="0.7"/>
    <text x="25" y="38" text-anchor="middle" font-size="28" font-weight="900" font-family="Arial" fill="#1a1a1a" opacity="0.7">日</text>
  </g>
  <g transform="translate(120,380) rotate(15)">
    <rect width="50" height="50" rx="12" fill="#fff" stroke="#78909C" stroke-width="3" opacity="0.7"/>
    <text x="25" y="38" text-anchor="middle" font-size="28" font-weight="900" font-family="Arial" fill="#1a1a1a" opacity="0.7">月</text>
  </g>
  <g transform="translate(854,360) rotate(-8)">
    <rect width="50" height="50" rx="12" fill="#fff" stroke="#6D4C41" stroke-width="3" opacity="0.7"/>
    <text x="25" y="38" text-anchor="middle" font-size="28" font-weight="900" font-family="Arial" fill="#1a1a1a" opacity="0.7">人</text>
  </g>
  <g transform="translate(200,180) rotate(5)">
    <rect width="45" height="45" rx="10" fill="#fff" stroke="#E91E63" stroke-width="3" opacity="0.6"/>
    <text x="22" y="34" text-anchor="middle" font-size="25" font-weight="900" font-family="Arial" fill="#1a1a1a" opacity="0.6">果</text>
  </g>
  <g transform="translate(780,280) rotate(-15)">
    <rect width="45" height="45" rx="10" fill="#fff" stroke="#558B2F" stroke-width="3" opacity="0.6"/>
    <text x="22" y="34" text-anchor="middle" font-size="25" font-weight="900" font-family="Arial" fill="#1a1a1a" opacity="0.6">木</text>
  </g>

  <!-- Center: three title blocks -->
  <g transform="translate(332,120)">
    <rect width="100" height="100" rx="20" fill="#fff" stroke="#E53935" stroke-width="6"/>
    <text x="50" y="78" text-anchor="middle" font-size="60" font-weight="900" font-family="Arial" fill="#1a1a1a">火</text>
  </g>
  <g transform="translate(462,120)">
    <rect width="100" height="100" rx="20" fill="#fff" stroke="#2E7D32" stroke-width="6"/>
    <text x="50" y="78" text-anchor="middle" font-size="60" font-weight="900" font-family="Arial" fill="#1a1a1a">山</text>
  </g>
  <g transform="translate(592,120)">
    <rect width="100" height="100" rx="20" fill="#fff" stroke="#B7D019" stroke-width="6"/>
    <text x="50" y="78" text-anchor="middle" font-size="60" font-weight="900" font-family="Arial" fill="#1a1a1a">蛙</text>
  </g>

  <!-- Subtitle -->
  <text x="512" y="290" text-anchor="middle" font-size="36" font-weight="700" font-family="Arial" fill="rgba(255,255,255,0.8)">Volcano Frog</text>
  <text x="512" y="330" text-anchor="middle" font-size="20" font-weight="600" font-family="Arial" fill="rgba(255,255,255,0.5)">Mandarin Learning Game</text>
</svg>`

async function generate() {
  // App icon 512x512
  await sharp(Buffer.from(iconSvg))
    .resize(512, 512)
    .png()
    .toFile(join(outDir, 'app-icon-512.png'))
  console.log('✓ app-icon-512.png')

  // Feature graphic 1024x500
  await sharp(Buffer.from(featureSvg))
    .resize(1024, 500)
    .png()
    .toFile(join(outDir, 'feature-graphic-1024x500.png'))
  console.log('✓ feature-graphic-1024x500.png')

  console.log(`\nDone. Files in: ${outDir}`)
}

generate().catch(console.error)
