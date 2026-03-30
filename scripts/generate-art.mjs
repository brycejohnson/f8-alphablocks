/**
 * Leonardo.ai art generation script for Volcano Frog assets
 * Usage: node scripts/generate-art.mjs <prompt-name>
 * Available prompts: mascot, rival-frogs, bugs, volcano-scene, pathway-cards
 */
import { writeFileSync, mkdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '..', 'art-assets')
mkdirSync(outDir, { recursive: true })

const API_KEY = process.env.LEONARDO_API_KEY
if (!API_KEY) { console.error('Missing LEONARDO_API_KEY in .env'); process.exit(1) }

const BASE = 'https://cloud.leonardo.ai/api/rest/v1'

const headers = {
  'Authorization': `Bearer ${API_KEY}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json',
}

// Prompt library
const PROMPTS = {
  'mascot': {
    prompt: 'Cute cartoon volcano frog character for a children\'s learning app, bright green with orange-red belly, big round friendly eyes, wide happy smile, sitting pose facing forward, Pixar style 3D render, simple clean design, soft lighting, white background, game character concept art, high quality',
    negative: 'realistic, scary, dark, horror, complex background, text, watermark',
    count: 4,
  },
  'mascot-poses': {
    prompt: 'Cute cartoon volcano frog character sheet, bright green with orange-red belly, big round eyes, multiple poses: sitting, eating with tongue out, surprised, laughing, farting embarrassed, Pixar style 3D render, children\'s game character, white background, concept art sheet',
    negative: 'realistic, scary, dark, horror, text, watermark',
    count: 4,
  },
  'rival-frogs': {
    prompt: 'Three cute cartoon frog characters sitting together for a children\'s game, each different species and color: one bright green tree frog, one brown bumpy toad, one yellow and black spotted frog, Pixar style 3D render, friendly expressions, white background, game character lineup',
    negative: 'realistic, scary, dark, horror, text, watermark',
    count: 4,
  },
  'bugs': {
    prompt: 'Cute cartoon bug sprites for a children\'s game, top-down view, set of 4 bugs: cricket, moth, beetle, worm, simple flat design, bright cheerful colors, transparent background, game sprite sheet, children friendly, not scary',
    negative: 'realistic, scary, dark, disgusting, text, watermark',
    count: 4,
  },
  'volcano-scene': {
    prompt: 'Cute cartoon volcano scene for a children\'s learning app splash screen, small friendly volcano with gentle smoke, Chinese character blocks floating out of the top like confetti, dark blue night sky background, stars, warm orange glow from volcano, Pixar style, children\'s book illustration, whimsical',
    negative: 'realistic, scary, dark lava, destruction, text, watermark',
    count: 4,
  },
  'pathway-cards': {
    prompt: 'Set of 4 cute cartoon icons for a children\'s learning app: 1) Chinese characters on colorful blocks, 2) numbers 1-2-3 on blocks, 3) cute cartoon animals (cat dog fish), 4) rainbow paint splashes for colors, Pixar style, simple clean design, children\'s app UI icons, white background',
    negative: 'realistic, scary, text, watermark, complex',
    count: 4,
  },
}

async function generateImages(promptName) {
  const config = PROMPTS[promptName]
  if (!config) {
    console.error(`Unknown prompt: ${promptName}`)
    console.log('Available:', Object.keys(PROMPTS).join(', '))
    process.exit(1)
  }

  console.log(`Generating: ${promptName}`)
  console.log(`Prompt: ${config.prompt}\n`)

  // Step 1: Create generation
  const genRes = await fetch(`${BASE}/generations`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      prompt: config.prompt,
      negative_prompt: config.negative,
      num_images: config.count,
      width: 1024,
      height: 1024,
      modelId: 'b24e16ff-06e3-43eb-8d33-4416c2d75876', // Leonardo Creative
      alchemy: true,
      photoReal: false,
      presetStyle: 'ILLUSTRATION',
    }),
  })

  if (!genRes.ok) {
    const err = await genRes.text()
    console.error('Generation failed:', genRes.status, err)
    process.exit(1)
  }

  const { sdGenerationJob } = await genRes.json()
  const genId = sdGenerationJob.generationId
  console.log(`Generation ID: ${genId}`)
  console.log('Waiting for images...\n')

  // Step 2: Poll for results
  let images = []
  for (let i = 0; i < 60; i++) {
    await new Promise(r => setTimeout(r, 5000))

    const statusRes = await fetch(`${BASE}/generations/${genId}`, { headers })
    const data = await statusRes.json()
    const gen = data.generations_by_pk

    if (gen.status === 'COMPLETE') {
      images = gen.generated_images
      break
    } else if (gen.status === 'FAILED') {
      console.error('Generation failed!')
      process.exit(1)
    }
    process.stdout.write('.')
  }

  if (images.length === 0) {
    console.error('Timed out waiting for images')
    process.exit(1)
  }

  console.log(`\nGot ${images.length} images. Downloading...\n`)

  // Step 3: Download images
  for (let i = 0; i < images.length; i++) {
    const img = images[i]
    const url = img.url
    const filename = `${promptName}-${i + 1}.png`
    const filepath = join(outDir, filename)

    const imgRes = await fetch(url)
    const buffer = Buffer.from(await imgRes.arrayBuffer())
    writeFileSync(filepath, buffer)
    console.log(`✓ ${filename} (${(buffer.length / 1024).toFixed(0)} KB)`)
  }

  console.log(`\nDone! Files in: ${outDir}`)
}

// Run
const promptName = process.argv[2]
if (!promptName) {
  console.log('Usage: node scripts/generate-art.mjs <prompt-name>')
  console.log('Available prompts:', Object.keys(PROMPTS).join(', '))
  process.exit(0)
}

generateImages(promptName).catch(console.error)
