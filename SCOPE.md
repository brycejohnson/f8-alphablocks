# f8-Alphablocks — Technical Scope

## Concept

**f8-Alphablocks** is a children's phonetics game inspired by the BBC's *Alphablocks* series. Animated letter characters teach phonics interactively — children tap letters to hear their sounds, build words, and progress through games that reinforce sound-symbol relationships.

**Languages:** English (primary), Mandarin Chinese (secondary)

### Core Mechanic — Sequence of Events

1. **Letter blocks appear** — characters stand in a row, each holding their letter on a frosted rounded-rect card on their chest
2. **Child taps a block** — character animates (bounce/wiggle), plays its isolated phoneme sound (e.g. "buh", "a", "t")
3. **Each block says its sound in sequence** — left to right, one at a time with a beat between them
4. **Blocks slide together and hold hands** — characters link into a word, the individual letter cards merge into one connected word display
5. **The whole word is pronounced** — the blended audio of all phonemes plays as one word (e.g. "bat")
6. **Stars burst out** — multicoloured stars (yellow, green, purple, red, orange, blue) explode outward from behind the characters, densest at the top, radiating in all directions — the signature Alphablocks celebration
7. **Word is revealed** — the complete word glows, characters cheer

### Visual Design — From Reference Screenshots

**Letter block characters:**
- Chunky, rounded, 3D-looking bodies — like soft toy robots
- Each character has expressive eyes, stubby arms, small legs
- Their letter sits on a **frosted/translucent white rounded-rectangle card** on their chest/body
- The letter is dark (near-black), bold, lowercase
- Each letter has a **consistent colour identity** across the whole app:
  - O = orange, T = blue-grey, D = purple, A = green, U = sky blue, I = pink/magenta, E = red, F = silver/astronaut-grey, N = lime green, etc.

**Digraphs (two-letter phonemes):**
- Two characters of the same colour hold hands as a single unit (e.g. "oo" = two orange O characters linked)
- Treated as one phoneme — tap plays the digraph sound, not individual letters

**Word formation layout:**
- Characters stand side by side in a horizontal line
- When word is complete they slide together, hold hands, their card borders merge into one continuous word strip
- Background: themed illustrated scene (space, outdoor hillside, planet surface, sunny day)

**Star burst celebration (ablx4 reference):**
- Triggered the moment the word is fully formed and pronounced
- Stars are 4-pointed or 5-pointed, varied sizes, 6+ colours simultaneously
- Originate from behind/around the character group — heaviest burst upward and outward
- Duration ~1.5–2 seconds, stars arc outward then fade
- Characters visibly react — bounce, raise arms, grin

### Key UX Elements
- Bright, high-contrast colour palette — each letter has its own identity colour
- Large tap targets — designed for small fingers on a phone screen
- **Immediate** audio + visual feedback — zero perceptible delay between tap and sound
- Portrait mobile-first layout — characters fill the lower 60% of screen, sky/background fills upper 40%
- No reading required to navigate — icon-driven menus
- Bilingual toggle: English ↔ Mandarin (pinyin + characters)

---

## Architecture

### Application Type
- **Single-page web app** — no SSR needed for a game
- **Client-first** — all core gameplay runs in-browser
- **Progressive** — language packs and levels loaded on demand

### Languages supported
| Language | Script | Phoneme system | Notes |
|---|---|---|---|
| English | Latin | IPA / phonics alphabet | 44 phonemes, standard BBC Alphablocks approach |
| Mandarin | Simplified Chinese + Pinyin | Pinyin initial/final/tone | 21 initials, 35 finals, 4 tones + neutral |

### Language Switching
- Single toggle button in the HUD (flag icon or EN/中 label)
- Persisted in `settingsStore` (Zustand) + `localStorage`
- Switching language: reloads the active level's phoneme set and word list in the new language
- Audio pre-buffers for the active language only — switching triggers a background load of the new language's phoneme sounds
- UI labels, menus, instructions all swap instantly (no page reload)
- Characters keep their colour identity per letter — but Mandarin blocks show pinyin initials/finals instead of Latin letters

---

## Language Packs — Libraries & Data Sources

### English Phonics

| Purpose | Package | Notes |
|---|---|---|
| Text → phonemes | `phonemize` | Rule-based G2P, IPA output, no native deps |
| Word → ARPABET | `cmu-pronouncing-dictionary` | 134k words, 39 phonemes, npm ready |
| IPA dataset | `ipa-dict` (GitHub) | Machine-readable IPA transcriptions |
| Word families | Custom JSON | Curated CVC/CVCC lists per level (small enough to hand-craft) |

**English phoneme set for MVP (BBC Alphablocks style):**
- Phase 1: s, a, t, p, i, n (first 6 — enough to make ~20 words)
- Phase 2: m, d, g, o, c, k
- Phase 3: ck, e, u, r, h, b, f, ff, l, ll, ss
- Digraphs: ch, sh, th, ng, ai, ee, igh, oa, oo, ar, or, ur, ow, oi, ear, air, ure, er

**Unicode:** IPA Extensions block U+0250–U+02AF — full browser support, no special handling.

---

### Mandarin Phonics

| Purpose | Package | Notes |
|---|---|---|
| Characters → pinyin | `pinyin-pro` | Best-in-class, polyphonic chars, actively maintained |
| Tone formatting | `pinyin-tone` | Converts `hao3` → `hǎo` |
| Tone ↔ number | `pinyin-utils` | Tone number extraction, diacritic stripping |
| Pinyin → IPA | `pinyin2ipa` (GitHub) | Links pinyin to actual phonetic sounds |
| Vocabulary data | `cc-cedict` | Full CEDICT dictionary, simplified/traditional + pinyin |
| Child-level words | HSK 2.0 vocab (GitHub: `complete-hsk-vocabulary`) | 11k words with pinyin — filter to HSK 1–2 for children |

**Install:**
```bash
npm install pinyin-pro pinyin-tone pinyin-utils cc-cedict
```

**Mandarin phoneme structure for MVP:**
- Initials (声母): b, p, m, f, d, t, n, l, g, k, h, j, q, x, zh, ch, sh, r, z, c, s (21 total)
- Finals (韵母): a, o, e, i, u, ü + compound finals (ai, ei, ao, ou, an, en, ang, eng, ong...)
- Tones: 4 tones + neutral — colour coded: tone1=blue, tone2=green, tone3=orange, tone4=red

**Unicode:** CJK Unified Ideographs U+4E00–U+9FFF + pinyin diacritics via Latin Extended — full browser support.

---

### Audio Strategy

| Scenario | Solution | Latency |
|---|---|---|
| **MVP / dev** | `Web Speech API` (`SpeechSynthesis`) | ~100ms, voice quality depends on OS |
| **Per-phoneme isolated sounds** | Pre-recorded WAV files (one per phoneme) | <10ms (pre-buffered) |
| **Production, no audio files** | `@mintplex-labs/piper-tts-web` (Piper TTS, WebAssembly, offline) | ~200ms first call |
| **Production, cloud** | Google Cloud TTS with SSML phoneme tags | Best quality, requires API key |

**Recommended approach:**
1. **MVP:** Web Speech API for full words + manually record ~50 isolated English phoneme sounds (or source from IPA Chart audio)
2. **Production:** Pre-recorded WAV per phoneme (44 English + ~60 Mandarin syllable+tone combos) hosted on Cloudflare R2
3. **Mandarin tones:** Each syllable needs 4 audio files — naming: `{pinyin}-{tone}.wav` e.g. `ma-1.wav`, `ma-2.wav`, `ma-3.wav`, `ma-4.wav`

**Web Speech API — language codes:**
```typescript
// English
const utterance = new SpeechSynthesisUtterance('cat')
utterance.lang = 'en-GB'  // or 'en-US'

// Mandarin
const utterance = new SpeechSynthesisUtterance('猫')
utterance.lang = 'zh-CN'
```

**Limitation:** Web Speech API cannot produce isolated phoneme sounds reliably — it speaks full words only. For the core mechanic (each block says its sound), pre-recorded WAVs are required.

---

## Tech Stack

### Framework Decision

| Framework | Bundle | Perf rank | PixiJS integration | Verdict |
|---|---|---|---|---|
| **React 19** | 44.5 KB | 3rd | Official `@pixi/react` | Works, but VDOM overhead fights the game loop |
| **Svelte 5** | 2.6 KB | 2nd | Manual (clean) | ✅ **Recommended** |
| **Solid.js** | 2.6 KB | 1st | Manual | Overkill for this scope |
| **Vue 3** | 31 KB | 4th | Manual | No meaningful advantage |
| **Phaser 4** | 120 KB | N/A (replaces PixiJS) | Built-in renderer | Best if no web UI — too constrained |
| **Vanilla + PixiJS** | 70 KB | — | Direct | No state management — maintenance nightmare |

**Chosen: Svelte 5 + PixiJS v8**

#### Why Svelte 5 beats React for this specific project

**1. The fundamental React problem for games**

React's job is to watch state, diff a virtual DOM tree, and sync changes to the real DOM. For a game, it's dead weight. The Alphablocks render loop runs entirely inside PixiJS:

```
PixiJS ticker fires (60fps)
  → update character positions
  → update particle positions
  → update star velocities
  → redraw canvas
```

React has no part in this. PixiJS owns the canvas completely. So React's VDOM sits there doing reconciliation work on a DOM tree that barely changes — a HUD with a score and a language button. You pay the React tax (44.5 KB runtime, VDOM diffing every render) for something that updates a handful of times per minute.

**2. Svelte is a compiler, not a runtime**

Svelte compiles components into surgical vanilla JS at build time. There is no Svelte "engine" running in the browser — just the output code. For a real DOM update like "score changed from 3 to 4":

- React: `new VDOM tree → diff against old VDOM → patch real DOM`
- Svelte: `scoreElement.textContent = newScore`

No diffing. No tree walking.

**3. Runes are a perfect fit for language switching**

The hardest state problem in this game is the EN ↔ ZH toggle. When it fires:
- Active phoneme set changes
- Audio buffer cache flushes and reloads
- Block characters re-render with new symbols
- Word list changes
- Tone colour system activates/deactivates

With Svelte 5 Runes this is one reactive object:

```typescript
// settings.svelte.ts
export const settings = $state({ language: 'en' })

// phonemePlayer.ts — runs automatically on language change
$effect(() => {
  flushAudioCache()
  preloadPhonemes(settings.language)
})
```

The PixiJS side reads `settings.language` directly — no hooks, no context, no prop drilling, no stale closure bugs. Runes are signals that work anywhere, including outside Svelte components (inside PixiJS ticker callbacks). React hooks cannot do this — they only work inside the React tree.

**4. Bundle size matters on children's devices**

Primary devices are budget Android tablets on school wifi, low-end phones, iPads. A child waiting for a game to load will just leave.

| What's in the bundle | Svelte 5 | React 19 |
|---|---|---|
| Framework runtime | 2.6 KB | 44.5 KB |
| PixiJS | ~70 KB | ~70 KB |
| GSAP | ~23 KB | ~23 KB |
| **Total approx** | **~96 KB** | **~138 KB** |

30% smaller initial download. That budget is better spent on phoneme audio files — the actual content.

**5. No `@pixi/react` means no architectural compromise**

`@pixi/react` bridges React's declarative model with PixiJS's imperative one — but it creates friction. React 19's concurrent mode can defer renders; bad when game logic assumes synchronous updates. `useTick()` hooks must live inside the React tree, creating awkward coupling.

With Svelte the boundary is clean:
```
Svelte owns  → DOM layer: score, language button, menus
PixiJS owns  → canvas: letter blocks, particles, animations
Share via    → $state stores (plain JS objects both sides import directly)
```

**6. Developer satisfaction**

State of JS 2024 — "would use again": Svelte 62.4% vs React 52.1%. Svelte has topped this survey 4 consecutive years. For a long-lived project, the framework you enjoy working in is the one you'll maintain and extend.

**The one genuine downside**

No official `@pixi/svelte` package. With React you get `@pixi/react` first-party. With Svelte you write the PixiJS lifecycle yourself — but it's 12 lines and simpler than the abstraction it replaces:

```svelte
<script>
  import { onMount, onDestroy } from 'svelte'
  import { Application } from 'pixi.js'

  let canvas, app

  onMount(async () => {
    app = new Application()
    await app.init({ canvas, width: 390, height: 844 })
  })

  onDestroy(() => app?.destroy())
</script>

<canvas bind:this={canvas} />
```

**Why not Phaser 4:**
- Phaser replaces PixiJS entirely with its own renderer — locks us into Phaser's UI system for menus, language toggles, settings
- Building polished HTML/CSS UI (language switcher, bilingual text, pinyin overlays) is harder inside Phaser's game-centric architecture
- We want a web app that contains a game, not a game that pretends to be a web app

### Framework & Build
| Tool | Version | Reason |
|---|---|---|
| **Svelte** | 5 | Compiles to vanilla JS, Runes reactivity, 2.6 KB runtime |
| **TypeScript** | 5 strict | Type-safe phoneme/word data models |
| **Vite** | 6 | Fast HMR, Svelte plugin, optimised production bundles |
| **npm** | latest | Package management |

Scaffold command:
```bash
npm create svelte@latest f8-alphablocks
# select: SvelteKit, TypeScript, no additional options
npm install pixi.js gsap
```

**Note on Moneylasso:** Moneylasso uses React 19 + `@pixi/react`. For Alphablocks we deliberately step up to Svelte 5 — the game-heavy workload makes the VDOM overhead matter more, and Svelte's Runes are a cleaner fit for language switching than Zustand + React hooks.

### Game Renderer — PixiJS v8 + @pixi/react
- **PixiJS v8** — 2D WebGL/WebGPU renderer, hardware-accelerated
- **@pixi/react v8** — declarative JSX with `pixi` prefix components
  - `<pixiGraphics>`, `<pixiSprite>`, `<pixiContainer>`, `<pixiText>`
  - `extend` API for tree-shaking — import only what you use
- Letter block characters rendered as PixiJS sprites/graphics
- Word formation animations run in the same WebGL context as the characters
- No separate charting library needed

**Why PixiJS for a children's game:**
- 60fps on mid-range mobile devices
- GLSL shader support for liquid/bounce/glow effects on letter blocks
- Sprite sheets for animated letter characters
- Text rendering for dynamic pinyin/character display

### Rendering Architecture — Hybrid Layered
```
Layer 3 (top):    React DOM
                  — score, progress bar, language toggle, menus
                  — Animated with GSAP or CSS transitions

Layer 2 (middle): PixiJS Canvas (@pixi/react)
                  — letter block characters, tap targets
                  — word-building animations, bounce/glow shaders
                  — win effects, confetti, particle bursts

Layer 1 (bottom): PixiJS Canvas (same WebGL context)
                  — background scenes, animated environments
                  — scrolling landscapes per level theme
```

### Animation System — GSAP + PixiJS Particles

**GSAP 3:**
- DOM-level: score counters, screen transitions, menu reveals
- `back.out` easing for bouncy letter block tap response
- GSAP timelines sequence the full word-build event: tap sounds → slide together → word pronounce → star burst → settle

**PixiJS Ticker (canvas-level):**
- Block bouncing and character expression changes
- Characters sliding horizontally to link into a word
- Hand-holding join animation (cards merging borders)
- Shader effects (glow on correct match)

**Star Burst — PixiJS ParticleContainer:**
- ~60–100 star particles per burst
- Each star: randomised colour from palette `[#FFD700, #7CFC00, #9B59B6, #E74C3C, #FF8C00, #00BFFF]`
- Initial velocity: strong upward bias with random spread (±60° from vertical)
- Arc trajectory: gravity applied each tick so they arc outward then fall
- Scale: starts large (1.2–2.0), shrinks to 0 as alpha fades
- Duration: ~1.5s total, staggered emission over first 200ms
- Implementation: `PIXI.ParticleContainer` with a pre-drawn star `Texture` (generated via `PIXI.Graphics`)

### Letter Block Effects — Custom GLSL Shaders
- PixiJS **Filter** system for custom fragment shaders
- **Displacement maps** for the signature Alphablocks "liquid letter" morph effect
- Glow/pulse shaders for correct phoneme matches
- Simple ripple shader on tap (< 30 lines GLSL, 60fps mobile)

### State Management — Svelte 5 Runes (built-in, no library needed)
Svelte 5's Runes replace Zustand entirely — reactive state with zero library overhead:

```typescript
// src/stores/game.svelte.ts
export const game = $state({
  language: 'en' as 'en' | 'zh',
  currentLevel: 1,
  activeWord: null as Word | null,
  phonemeSequenceIndex: 0,   // which block is currently "speaking"
  wordComplete: false,
  score: 0
})

// src/stores/settings.svelte.ts
export const settings = $state({
  language: 'en' as 'en' | 'zh',
  volume: 1.0,
  reducedMotion: false
})
```

- `$state` — mutable reactive state (replaces Zustand store)
- `$derived` — computed values that auto-update (replaces Zustand selectors)
- `$effect` — side effects on state change (language switch → reload audio buffers)
- Access from PixiJS ticker: import the store object directly — no hook needed, works outside components

### Audio System

> **Lesson from Moneylasso:** WAV files via Web Audio API caused glitchy, distorted playback on iOS Safari due to a known WebKit sample rate mismatch bug (WebKit #154538, #221334). WAV files are banned from this project. Use AAC/M4A exclusively.

#### Format Decision — AAC/M4A at 44.1 kHz

| Format | iOS Safari | Android Chrome | Verdict |
|---|---|---|---|
| **AAC / M4A** | Native, optimal | Supported | ✅ Use this |
| MP3 44.1 kHz | Supported | Supported | ✅ Acceptable fallback |
| WAV | Sample rate mismatch glitches | Fine | ❌ Banned — Moneylasso bug |
| OGG | Not supported | Supported | ❌ Safari incompatible |

All phoneme audio assets: **AAC/M4A, 44.1 kHz, mono, ~64 kbps**

#### iOS AudioContext — Unlock Pattern (Critical)

iOS blocks all audio until a user gesture. This must be handled at app start:

```typescript
// src/lib/audio/phonemePlayer.ts
const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()

export function unlockAudio() {
  if (ctx.state !== 'suspended') return
  const events = ['touchstart', 'touchend', 'mousedown']
  const unlock = () => {
    ctx.resume().then(() =>
      events.forEach(e => document.removeEventListener(e, unlock))
    )
  }
  events.forEach(e => document.addEventListener(e, unlock, { once: true }))
}
```

Call `unlockAudio()` immediately on app mount — the first tap on a letter block will unlock it. Safari also limits 4 concurrent AudioContext instances per page — use one shared context throughout.

#### Pre-decode Pattern (Low Latency)

Never decode audio at playback time — pre-decode everything at level load into `AudioBuffer` objects. Creating a `BufferSourceNode` is cheap; decoding is expensive.

```typescript
const bufferCache = new Map<string, AudioBuffer>()

export async function preloadPhonemes(language: 'en' | 'zh') {
  const phonemes = language === 'en' ? EN_PHONEMES : ZH_PHONEMES
  await Promise.all(phonemes.map(async (p) => {
    const res = await fetch(`/audio/${language}/${p.audioFile}`)
    const raw = await res.arrayBuffer()
    bufferCache.set(p.id, await ctx.decodeAudioData(raw))
  }))
}

export function playPhoneme(id: string) {
  const buffer = bufferCache.get(id)
  if (!buffer) return
  const source = ctx.createBufferSource()
  source.buffer = buffer
  source.connect(ctx.destination)
  source.start(0)  // immediate, <5ms latency
}
```

Language switching calls `preloadPhonemes()` in a `$effect` — the new language loads in the background.

#### Audio Source — Google Cloud TTS Neural2 (Batch Generation)

**Decision:** Google Cloud TTS Neural2, using existing Google account with billing attached.

Apple's AVSpeechSynthesizer (Siri-quality voice) is native Swift only — a future item when we build the native iOS app. For the web app, Google Cloud TTS is the clear choice.

**Setup (one-time):**
1. Go to Google Cloud Console → enable **Cloud Text-to-Speech API**
2. Create an API key (restrict to TTS API only)
3. Run the batch generation script once → ~250 M4A files → upload to Cloudflare R2
4. Done — no ongoing API costs, files served from CDN

**Solution: batch-generate all phoneme audio once using Google Cloud TTS Neural2, store as static M4A files on Cloudflare R2.**

| Provider | Phoneme SSML | Mandarin tones | Quality | Cost for ~250 files |
|---|---|---|---|---|
| **Google Cloud TTS Neural2** | ✅ IPA tags | ✅ Accurate | Excellent | ~$0.03 one-time |
| Azure TTS Neural | ✅ IPA tags | ✅ Excellent | Excellent | ~$0.03 one-time |
| Amazon Polly Neural | ✅ IPA/X-SAMPA | ✅ Good | Very Good | ~$0.03 one-time |
| ElevenLabs | ❌ No phoneme tags | Mediocre | Best naturalness | Not suitable |
| Apple AVSpeechSynthesizer | N/A (native only) | ✅ | Good | Not web-accessible |

**Generation approach — SSML phoneme tags:**
```xml
<!-- Isolated phoneme sound, not the letter name -->
<speak>
  <phoneme alphabet="ipa" ph="ʃ">sh</phoneme>
</speak>
```

This produces the sound "shh" rather than the letter name "ess-aitch". Critical distinction for phonics.

**One-time batch script** (run once, commit the M4A files to R2):
- ~50 English phoneme sounds
- ~200 Mandarin syllable+tone combos (initials × key finals × 4 tones)
- ~30 full English word pronunciations (per level)
- ~30 full Mandarin word pronunciations (per level)
- **Total cost: under $0.10 at WaveNet pricing. Free tier covers it entirely.**
- After generation: zero per-playback cost — static files on CDN

**File naming convention:**
```
/audio/en/en-sh.m4a          # isolated English phoneme
/audio/en/en-cat.m4a         # full English word
/audio/zh/zh-b.m4a           # Mandarin initial (neutral)
/audio/zh/zh-ma-1.m4a        # mā (tone 1)
/audio/zh/zh-ma-2.m4a        # má (tone 2)
/audio/zh/zh-ma-3.m4a        # mǎ (tone 3)
/audio/zh/zh-ma-4.m4a        # mà (tone 4)
/audio/zh/zh-cat.m4a         # 猫 full word
```

#### UI Sounds — Synthesised (Zero Files)

Tap feedback and celebration tones are synthesised via Web Audio API oscillators — no files, zero latency, same approach as Moneylasso (which worked well for these):

```typescript
export function playTapClick() {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.frequency.value = 800
  gain.gain.setValueAtTime(0.3, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08)
  osc.start()
  osc.stop(ctx.currentTime + 0.08)
}
```

### Styling — Svelte Scoped CSS + Global Reset
- Svelte's built-in scoped `<style>` blocks per component (no CSS-in-JS library needed)
- One global `src/app.css` for resets + font loading
- No external CSS framework — keeps bundle lean
- Custom colour system per language theme:
  - **English:** Primary primaries (red, yellow, blue, green) — classic Alphablocks palette
  - **Mandarin:** Ink wash + warm reds — culturally resonant

### Typography
- **English:** Rounded, chunky display font (e.g., Nunito, Fredoka One)
- **Mandarin:** System CJK font stack with pinyin overlay support
- Fonts loaded via `@font-face` in `index.css`, subsetted for performance

### Authentication / User Profiles
- Optional (not required for MVP)
- If needed: SHA-256 session tokens via Web Crypto API (from Moneylasso's `PasswordGate` pattern)
- Anonymous play with localStorage progress save for MVP

---

## Phonetic Data — Per Letter / Per Symbol

### English — All 44 Phonemes

Every phoneme needs: display label on block, IPA symbol, audio file, colour identity.

**Vowels (short):**
| Block label | IPA | Example word | Audio file | Colour |
|---|---|---|---|---|
| a | /æ/ | cat | `en-a-short.wav` | green |
| e | /ɛ/ | bed | `en-e-short.wav` | red |
| i | /ɪ/ | sit | `en-i-short.wav` | pink |
| o | /ɒ/ | hot | `en-o-short.wav` | orange |
| u | /ʌ/ | cup | `en-u-short.wav` | sky blue |

**Vowels (long / digraph):**
| Block label | IPA | Example | Audio file |
|---|---|---|---|
| ai / a_e | /eɪ/ | rain, cake | `en-ai.wav` |
| ee / ea | /iː/ | feet, beat | `en-ee.wav` |
| igh / i_e | /aɪ/ | night, kite | `en-igh.wav` |
| oa / o_e | /əʊ/ | boat, bone | `en-oa.wav` |
| oo (long) | /uː/ | moon | `en-oo-long.wav` |
| oo (short) | /ʊ/ | book | `en-oo-short.wav` |
| ar | /ɑː/ | car | `en-ar.wav` |
| or | /ɔː/ | for | `en-or.wav` |
| ur/er/ir | /ɜː/ | burn | `en-ur.wav` |
| ow | /aʊ/ | cow | `en-ow.wav` |
| oi | /ɔɪ/ | coin | `en-oi.wav` |
| ear | /ɪə/ | near | `en-ear.wav` |
| air | /eə/ | chair | `en-air.wav` |

**Consonants:**
| Block label | IPA | Example | Audio file | Colour |
|---|---|---|---|---|
| b | /b/ | bat | `en-b.wav` | dark blue |
| c / k | /k/ | cat, kit | `en-k.wav` | dark green |
| ck | /k/ | duck | `en-ck.wav` | dark green |
| d | /d/ | dog | `en-d.wav` | brown |
| f / ff | /f/ | fan | `en-f.wav` | silver |
| g | /ɡ/ | got | `en-g.wav` | lime |
| h | /h/ | hat | `en-h.wav` | tan |
| j | /dʒ/ | jet | `en-j.wav` | purple |
| l / ll | /l/ | leg | `en-l.wav` | yellow |
| m | /m/ | man | `en-m.wav` | teal |
| n / nn | /n/ | net | `en-n.wav` | olive |
| ng | /ŋ/ | ring | `en-ng.wav` | olive |
| p | /p/ | pot | `en-p.wav` | coral |
| qu | /kw/ | queen | `en-qu.wav` | violet |
| r | /r/ | red | `en-r.wav` | rust |
| s / ss | /s/ | sun | `en-s.wav` | yellow-green |
| sh | /ʃ/ | ship | `en-sh.wav` | light grey |
| t | /t/ | top | `en-t.wav` | blue-grey |
| th (voiced) | /ð/ | this | `en-th-v.wav` | maroon |
| th (unvoiced) | /θ/ | thin | `en-th-u.wav` | maroon |
| v | /v/ | van | `en-v.wav` | indigo |
| w | /w/ | win | `en-w.wav` | magenta |
| x | /ks/ | fox | `en-x.wav` | copper |
| y | /j/ | yes | `en-y.wav` | gold |
| z / zz | /z/ | zip | `en-z.wav` | hot pink |
| ch | /tʃ/ | chip | `en-ch.wav` | amber |

---

### Mandarin — Pinyin Initials & Finals

Every initial and final is its own block with its audio (per tone where applicable).

**Initials (声母) — 21 total:**
| Block | Pinyin | IPA approx | Audio files |
|---|---|---|---|
| b | b | /p/ | `zh-b.wav` |
| p | p | /pʰ/ | `zh-p.wav` |
| m | m | /m/ | `zh-m.wav` |
| f | f | /f/ | `zh-f.wav` |
| d | d | /t/ | `zh-d.wav` |
| t | t | /tʰ/ | `zh-t.wav` |
| n | n | /n/ | `zh-n.wav` |
| l | l | /l/ | `zh-l.wav` |
| g | g | /k/ | `zh-g.wav` |
| k | k | /kʰ/ | `zh-k.wav` |
| h | h | /x/ | `zh-h.wav` |
| j | j | /tɕ/ | `zh-j.wav` |
| q | q | /tɕʰ/ | `zh-q.wav` |
| x | x | /ɕ/ | `zh-x.wav` |
| zh | zh | /tʂ/ | `zh-zh.wav` |
| ch | ch | /tʂʰ/ | `zh-ch.wav` |
| sh | sh | /ʂ/ | `zh-sh.wav` |
| r | r | /ɻ/ | `zh-r.wav` |
| z | z | /ts/ | `zh-z.wav` |
| c | c | /tsʰ/ | `zh-c.wav` |
| s | s | /s/ | `zh-s.wav` |

**Simple Finals (韵母) — key set:**
| Final | Example char | Pinyin | Audio (tone 1–4) |
|---|---|---|---|
| a | 啊 | ā á ǎ à | `zh-a-1.wav` … `zh-a-4.wav` |
| o | 哦 | ō ó ǒ ò | `zh-o-1.wav` … |
| e | 饿 | ē é ě è | `zh-e-1.wav` … |
| i | 一 | yī yí yǐ yì | `zh-i-1.wav` … |
| u | 五 | wū wú wǔ wù | `zh-u-1.wav` … |
| ü | 鱼 | yū yú yǔ yù | `zh-v-1.wav` … |
| ai | 爱 | āi ái ǎi ài | `zh-ai-1.wav` … |
| ei | 诶 | — éi — èi | `zh-ei-1.wav` … |
| ao | 好 | āo áo ǎo ào | `zh-ao-1.wav` … |
| ou | 哦 | ōu óu ǒu òu | `zh-ou-1.wav` … |
| an | 安 | ān án ǎn àn | `zh-an-1.wav` … |
| en | 恩 | ēn én ěn èn | `zh-en-1.wav` … |
| ang | 昂 | āng áng ǎng àng | `zh-ang-1.wav` … |
| eng | 灯 | ēng éng ěng èng | `zh-eng-1.wav` … |
| ong | 红 | — óng ǒng òng | `zh-ong-1.wav` … |
| ing | 星 | īng íng ǐng ìng | `zh-ing-1.wav` … |

**Tone colour system (consistent throughout game):**
| Tone | Mark | Colour | Hex |
|---|---|---|---|
| 1st (flat) | ā | Blue | `#3498DB` |
| 2nd (rising) | á | Green | `#27AE60` |
| 3rd (dip) | ǎ | Orange | `#E67E22` |
| 4th (falling) | à | Red | `#E74C3C` |
| Neutral | a | Grey | `#95A5A6` |

---

## Data Models

### Phoneme
```typescript
interface Phoneme {
  id: string           // e.g. "en-sh", "zh-b", "zh-a-2"
  language: 'en' | 'zh'
  symbol: string       // IPA: "ʃ" | pinyin: "b" | "á"
  displayChar: string  // shown on block: "SH" | "b" | "á"
  audioFile: string    // "en-sh.wav" | "zh-a-2.wav"
  colour: string       // hex — consistent per phoneme identity
  toneNumber?: 1|2|3|4|0  // Mandarin only (0 = neutral)
}
```

### Word
```typescript
interface Word {
  id: string
  language: 'en' | 'zh'
  phonemeIds: string[]    // ordered phoneme sequence
  text: string            // "ship" | "爸爸"
  pinyin?: string         // Mandarin: "bà ba"
  audioFile: string       // full word pronunciation "en-ship.wav"
  imageAsset: string      // illustration shown after word formed (future phase)
  imageAnimations?: string[] // sprite sheet frames for animated illustration
}
```

### Level
```typescript
interface Level {
  id: string
  language: 'en' | 'zh'
  theme: string           // "farm", "ocean", "city"
  targetWords: string[]
  unlockedPhonemes: string[]
  difficulty: 1 | 2 | 3
}
```

---

## Future: Word Illustrations & Animations (Phase 4)

Inspired directly by BBC Alphablocks — after the word is formed and the star burst plays, the word comes to life:

**Sequence:**
1. Star burst completes
2. Scene transition: background shifts to match word meaning
3. **Illustrated image appears** — a friendly cartoon illustration of the word (e.g. "cat" → cartoon cat appears)
4. **Illustration animates** — the scene plays a short loop animation relevant to the word (cat meows and twitches tail, boat rocks on waves, etc.)
5. Word text stays visible below the scene
6. For Mandarin: Chinese character fades in large over the illustration, pinyin shown below

**Technical approach:**
- Illustrations: sprite sheets (animated) or Lottie JSON animations (vector, small file size)
- `lottie-web` npm package for playing Lottie animations in the browser
- Each word in the data model has an `imageAsset` (static) and optional `imageAnimations` (Lottie/spritesheet)
- Rendered in a PixiJS container above the background layer — slides in from right or fades in
- Duration: ~2–3 seconds, then returns to next word or level complete screen

**Asset strategy:**
- MVP: static illustrations (SVG/PNG) per word — fast to produce
- Phase 4: Lottie animations per word — commission or source from open libraries (LottieFiles marketplace has children's content)
- Mandarin words and English words can share some illustrations (a cat is a cat in both languages)

---

## MVP Definition

### Phase 1 — English Phonics Core
- [ ] SvelteKit + TypeScript + PixiJS + GSAP scaffold
- [ ] 6 letter block characters (C, A, T + B, E, D) with correct colour identities
- [ ] Frosted rounded-rect letter card on each character's chest
- [ ] Tap → character bounce (GSAP `back.out`) + isolated phoneme sound plays
- [ ] Web Audio phoneme playback (pre-buffered, <10ms latency)
- [ ] Sequential phoneme playback: each block says its sound left-to-right
- [ ] Characters slide together + hold hands → word strip merges
- [ ] Full word audio plays (blended pronunciation)
- [ ] Star burst particle celebration (PixiJS ParticleContainer, 6-colour, upward arc)
- [ ] Digraph support: two same-colour characters link as one (e.g. "oo")
- [ ] Svelte 5 `$state` stores (active word, phoneme sequence position, celebration state)
- [ ] Mobile-first portrait layout — illustrated background scene

### Phase 2 — Full English Alphabet + Levels
- [ ] All 26 letters + common digraphs (SH, CH, TH, etc.)
- [ ] 5 themed levels with 10 words each
- [ ] Progress tracking (localStorage)
- [ ] PixiJS character animations per letter block
- [ ] GLSL glow/bounce shaders
- [ ] Background scene per level theme

### Phase 4 — Word Illustrations & Animations
*(see "Future: Word Illustrations" section below)*

### Phase 5 — Native iOS App (Swift)
- Port game to SwiftUI + SpriteKit or SwiftUI + Metal
- Replace Google Cloud TTS with **AVSpeechSynthesizer** (on-device, Siri-quality voice, free, offline)
- App Store distribution — parents can install without browser
- Push notifications for daily learning streaks
- AVFoundation for audio (eliminates all iOS Web Audio API quirks entirely)
- Native haptics on letter block tap (UIImpactFeedbackGenerator)

### Phase 3 — Mandarin Integration
- [ ] Pinyin initial/final blocks (b, p, m, f, d, t, n, l... + an, en, in, un...)
- [ ] Tone indicator system (colour or diacritic)
- [ ] Tone audio recordings (4 per syllable)
- [ ] Simplified Chinese character display
- [ ] Language toggle (EN ↔ ZH) — state persisted
- [ ] 3 themed levels (numbers, colours, animals)

---

## Deployment

- **Frontend:** Cloudflare Pages (static, global CDN — same as Moneylasso pattern)
- **Assets:** Bundled with Pages deploy — audio files are 1.2 MB total, served via Pages CDN globally. R2 not needed at this scale.
- **Backend:** None for MVP — all client-side
- **CI:** GitHub Actions → Cloudflare Pages deploy on push to `main`

---

## Project Structure

```
src/
  ├── app.html                  # SvelteKit HTML shell
  ├── app.css                   # Global reset + font-face
  │
  ├── routes/
  │   └── +page.svelte          # Main game page
  │
  ├── lib/
  │   ├── components/
  │   │   ├── GameCanvas.svelte       # PixiJS canvas mount + lifecycle
  │   │   ├── LetterBlock.svelte      # Individual phoneme block (pixi sprite)
  │   │   ├── WordStage.svelte        # Word-building area
  │   │   ├── HUD.svelte              # Score, progress, language toggle (DOM)
  │   │   └── CelebrationOverlay.svelte # Star burst + GSAP win sequence
  │   │
  │   ├── stores/
  │   │   ├── game.svelte.ts          # $state — active level, phoneme sequence
  │   │   ├── progress.svelte.ts      # $state — mastery, session history
  │   │   └── settings.svelte.ts      # $state — language, volume, a11y
  │
  │   ├── audio/
  │   │   ├── phonemePlayer.ts        # AudioBuffer cache + playback
  │   │   └── uiSounds.ts             # Synthesised tap/click (Web Audio oscillators)
  │   │
  │   ├── data/
  │   │   ├── en/
  │   │   │   ├── phonemes.ts         # All 44 English phoneme definitions
  │   │   │   └── levels.ts           # Level configs + word lists
  │   │   └── zh/
  │   │       ├── phonemes.ts         # Mandarin initials + finals + tones
  │   │       └── levels.ts
  │   │
  │   ├── shaders/
  │   │   ├── glow.glsl               # Letter block glow on correct match
  │   │   └── ripple.glsl             # Tap ripple effect
  │   │
  │   └── utils/
  │       ├── phonemeUtils.ts         # Blend phonemes into words
  │       └── toneUtils.ts            # Mandarin tone parsing + display
  │
  └── static/
      └── audio/
          ├── en/                     # en-a-short.wav, en-sh.wav, en-cat.wav …
          └── zh/                     # zh-b.wav, zh-a-1.wav … zh-a-4.wav …
```

---

## Key Design Decisions

### Why Pixi.js over React Native or Unity?
- Runs in any browser — no app store friction for parents
- WebGL performance on mid-range Android/iOS without native build pipeline
- Same stack as Moneylasso — zero additional learning curve

### Why Zustand over Redux?
- No boilerplate, no Provider wrapping
- Works from both React hooks and PixiJS imperative callbacks
- 5KB bundle — important for children's apps on slow connections

### Why Web Audio API for phonemes?
- Sub-10ms latency — critical for phonics where sound must feel instant
- No Flash / plugin dependency
- Fallback to `<audio>` element if AudioContext unavailable

### Mandarin phoneme strategy
- Teach pinyin (romanisation) as the phoneme system — accessible to non-native parents
- Display Chinese characters as the "word reward" — motivating for heritage learners
- Tone colours: tone 1 = blue, tone 2 = green, tone 3 = orange, tone 4 = red (common mnemonic)

---

## Audio Caching Strategy

### Context & Growth Assumptions

The word list is expected to grow from isolated phonemes and CVC words into full sentences, and from two languages (English + Mandarin) to potentially four or more. This changes the caching problem significantly:

| Scale | Files | Est. Size | Key constraint |
|-------|-------|-----------|----------------|
| Now (words only) | ~130 | ~5 MB | Filenames must match phoneme IDs |
| Phase 2 (full word bank) | ~1,000 | ~40 MB | Cloudflare Pages free plan: 20K file limit |
| Sentences added | ~5,000+ | ~200 MB | SW install pre-cache takes minutes — browser kills it |
| Multi-language sentences | ~20,000+ | ~800 MB | Pages paid plan: 100K file limit; iOS Safari SW cache quota: ~50 MB |

The iOS Safari 50 MB SW cache quota is the most important ceiling. Each cross-origin audio response also carries a 7 MB opaque-response overhead in the SW Cache API regardless of actual file size — so keeping audio on the same origin (`/alphablocks/audio/`) is non-negotiable.

---

### Approach Comparison

#### 1. Static files in Cloudflare Pages + SW install-time pre-cache
**(Current implementation)**

Audio ships inside the Pages deployment. The Service Worker pre-warms the cache on install, downloading all curriculum audio before the user starts playing.

**Strengths:**
- Zero infrastructure — no R2, no Workers
- Instant playback on second visit (everything in cache)
- Works fully offline after first load

**Where it breaks:**
- Sentences cannot be fully pre-generated — the combinatorial space is too large ("The cat sat on the mat" × 3 languages × many phrasings). This approach only works for a fixed, known word list.
- At 1,000+ files, the SW install download takes minutes on slow connections; the browser will kill the SW if install exceeds ~3 minutes.
- At 5,000+ files, the SW manifest itself becomes a maintenance problem.

**Verdict:** Correct for the current word list. Does not scale to sentences.

---

#### 2. Cloudflare R2 + phase-aware SW caching
**(Recommended next step — target: 1,000+ files)**

Audio moves out of the Pages deployment into Cloudflare R2 (object storage), served via a Cloudflare Worker routed at `/alphablocks/audio/*`. The SW caches only the current phase and the next phase (~50–80 files) rather than the entire library.

**R2 pricing:**
- Storage: $0.015/GB/month (400 MB ≈ $6/month)
- Reads: 10 million/month free, then $0.36/million
- Egress: free (unlike AWS S3 or GCS — critical advantage)

**Why route R2 through a Worker:** R2 served from a different origin (`r2.yourdomain.com`) would be cross-origin, triggering the 7 MB SW opaque-response penalty per file. A Worker at `/alphablocks/audio/*` keeps it same-origin — no overhead.

**Phase-aware caching pattern:** When the user completes Phase 1, background-download Phase 2 audio. The user never waits; the next phase is ready before they reach it. `progress.svelte.ts` already tracks which phase the user is on.

**Deployment pattern:**
```
Generate audio → wrangler r2 object put (once, not every deploy)
SvelteKit build → wrangler pages deploy (no audio in bundle)
Worker rewrites /alphablocks/audio/* → R2 reads
```

**Verdict:** The right architecture for sentences. Sets up the infrastructure without over-engineering now.

---

#### 3. On-the-fly server-side TTS via Cloudflare Workers
**(Required for sentences — target: sentence mode)**

A Cloudflare Worker intercepts requests for audio that hasn't been pre-generated. It calls Google Cloud TTS, stores the result in R2, and returns the audio. Every subsequent request for that sentence hits R2 cache directly.

**This is the only viable strategy for sentences.** Pre-generating every possible sentence is impossible.

**Latency:**
- First request: 500 ms – 2,000 ms (Google TTS API round-trip)
- Cache hit (R2): < 100 ms

**The 500ms–2s first-request problem:** In a phonics game, a child taps a block and expects immediate sound. The fix is speculative prefetch — generate the next word or sentence's audio in the background while the current one is playing. By the time the child taps, it is already cached.

**Cost at scale (Google Cloud TTS):**
- Free tier: 4 million characters/month (standard voices), 1 million (Neural2/WaveNet)
- 20,000 unique sentences × 20 characters average = 400K characters per language
- Three languages = 1.2 million characters — still within the Neural2 free tier
- After generation: zero per-play cost — R2 serves the cached file indefinitely

**Verdict:** Essential when sentence mode is added. Not needed today, but the audio route architecture (`/alphablocks/audio/*` via Worker) should be in place before then.

---

#### 4. Workbox
**(Recommended addition alongside R2 move)**

Workbox is Google's Service Worker library. It adds automatic precache manifest generation (content-hash-based, only re-caches changed files), named caching strategies (`CacheFirst`, `StaleWhileRevalidate`), and built-in cache expiry.

**What it adds over raw SW code:**
- Manifest is auto-generated at build time — no manual `CACHE_VERSION` string bumping
- Only re-downloads files whose content has changed (hash-based)
- `maxEntries` and `maxAgeSeconds` keep the cache from growing unboundedly
- Integrates with Vite via `vite-plugin-pwa` + `@vite-pwa/sveltekit`

**Size overhead:** ~15–20 KB gzipped for core.

**Verdict:** Worth adding when the audio catalogue grows and changes frequently (new languages, updated recordings). Overkill for the current stable set. Revisit at Phase 2.

---

#### 5. IndexedDB for audio
**(Optional enhancement for resilience)**

Store raw audio bytes (ArrayBuffer/Blob) in IndexedDB rather than relying solely on the SW Cache API. IDB has the same storage quota as the Cache API but different eviction behaviour — browsers tend to evict Cache API storage before IDB under memory pressure, making IDB slightly more persistent.

**Key constraint:** `AudioBuffer` objects cannot be serialised to IDB. Store compressed bytes (the `.m4a` file content), decode to `AudioBuffer` on first play (~10–50 ms decode cost), then keep the decoded buffer in the in-memory `bufferCache` Map for the session.

**When it matters:** If users are on low-storage devices (older iPhones) where the browser aggressively evicts SW caches. IDB gives a second layer of persistence without requiring a network round-trip.

**Verdict:** A resilience improvement, not a primary caching strategy. Consider adding for the highest-frequency phonemes (Phase 1 sounds) after R2 + phase-aware caching is in place.

---

#### 6. HTMLAudioElement vs Web Audio API (caching implications)

The current implementation uses Web Audio API (`decodeAudioData` into `AudioBuffer`). The alternative is `HTMLAudioElement`.

| Aspect | HTMLAudioElement | Web Audio API (current) |
|--------|-----------------|------------------------|
| HTTP cache | Automatic — browser handles it | Manual — must fetch + decode |
| Range requests | Native (required by iOS for seeking) | Full file fetch only |
| SW interception | Works identically | Works identically |
| iOS unlock requirement | Not needed | Required (AudioContext gesture unlock) |
| Playback timing precision | Low (buffering jitter) | High (<5 ms) |
| Audio effects (pitch, mix) | Not available | Full control |

**For a phonics game, Web Audio API is correct** — precise timing is critical when phonemes must play in sequence with tight coordination. The synthesised celebration sounds also require Web Audio. The iOS unlock pattern is already implemented.

The one Safari trap: if audio is cross-origin and the SW returns an opaque response, Range requests cannot be satisfied from cache. Same-origin serving (via Worker proxy) resolves this.

---

### Recommended Roadmap

**Now — current state (~130 files)**
- Static files in Pages + SW install-time pre-cache
- Audio served at `/alphablocks/audio/*` (same origin — preserve this)
- Web Speech API fallback for any missing files

**Next — sentence groundwork (~1,000 files)**
1. Move audio to **Cloudflare R2**, proxied via a Worker at `/alphablocks/audio/*`
2. Switch SW from install-time pre-cache to **phase-aware pre-cache** (current + next phase, ~50–80 files)
3. Add **speculative prefetch** in `GameCanvas.svelte`: when a word starts playing, background-fetch the next word's audio
4. Keep `CACHE_VERSION` in the SW; migrate to Workbox when the catalogue becomes large enough to justify automatic manifest generation

**Sentences (~5,000+ files)**
5. Add **on-demand TTS Worker**: intercept audio requests for ungenerated sentences, call Google TTS, store result in R2
6. Add speculative sentence audio generation — generate the next sentence's audio while the current one plays
7. Add `navigator.storage.persist()` request so the browser treats the cache as persistent rather than best-effort

**Multi-language expansion**
8. Organise R2 by language prefix: `audio/en/`, `audio/zh/`, `audio/es/`, etc.
9. Phase-aware SW caches only the active language — switching language triggers background pre-fetch of that language's current phase
10. Workbox replaces hand-rolled SW for manifest management at this scale
