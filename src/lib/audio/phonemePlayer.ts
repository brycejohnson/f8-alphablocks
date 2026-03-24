/**
 * Audio system — AAC/M4A playback via Web Audio API
 * iOS/gesture design: AudioContext created ONLY on first user tap (avoids suspended state).
 * Pre-fetch stores raw ArrayBuffers without decoding (no AudioContext needed).
 * Decode happens at play-time, after context is running.
 * No WAV files (Moneylasso iOS glitch lesson).
 */
import { base } from '$app/paths'

const AudioContextClass = (typeof window !== 'undefined')
  ? (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)
  : null

let ctx: AudioContext | null = null

// Debug logging disabled — iOS audio confirmed working
function dbg(_msg: string) { /* no-op */ }

// Stage 1: raw fetch bytes — populated by preloadPhonemes, no AudioContext needed
const rawCache = new Map<string, ArrayBuffer>()
// Stage 2: decoded AudioBuffer — populated on first play, reused forever
const bufferCache = new Map<string, AudioBuffer>()

function getCtx(): AudioContext {
  if (!ctx) throw new Error('AudioContext not yet created — call ensureAudioContext() first')
  return ctx
}

// Call synchronously inside every user-gesture handler (button onclick etc.).
// Creates the AudioContext inside the gesture → starts RUNNING (not suspended).
// On subsequent calls: resumes if somehow suspended, otherwise no-op.
export function ensureAudioContext(): void {
  if (!AudioContextClass) { dbg('ensureAC: no AudioContextClass!'); return }
  if (!ctx) {
    ctx = new AudioContextClass()
    dbg(`ensureAC: CREATED ctx, state=${ctx.state}, sampleRate=${ctx.sampleRate}`)
  } else if (ctx.state === 'suspended') {
    dbg('ensureAC: resuming suspended ctx')
    ctx.resume()
  } else {
    dbg(`ensureAC: ctx already ${ctx.state}`)
  }
}

// Ensure context is running before any playback — awaits resume if needed.
// Used by playPhoneme which may be called outside a gesture (e.g. after a delay).
async function ensureRunning(): Promise<AudioContext | null> {
  if (!ctx) {
    // No context yet — can't create one outside a gesture on iOS.
    // Try anyway (works on desktop, Android).
    if (!AudioContextClass) return null
    ctx = new AudioContextClass()
  }
  if (ctx.state === 'suspended') {
    try { await ctx.resume() } catch { /* silent */ }
  }
  return ctx.state === 'running' ? ctx : null
}

// Pre-fetch raw bytes for upcoming audio so first play has near-zero latency.
// Does NOT decode — no AudioContext required, works before first user gesture.
export async function preloadPhonemes(language: 'en' | 'zh', ids: string[]) {
  dbg(`preload: ${ids.length} ids, lang=${language}, base="${base}"`)
  await Promise.all(ids.map(async (id) => {
    if (bufferCache.has(id) || rawCache.has(id)) return
    try {
      const url = `${base}/audio/${language}/${id}.m4a?v=7`
      dbg(`fetch: ${url}`)
      const res = await fetch(url)
      if (!res.ok) { dbg(`fetch FAIL: ${id} status=${res.status}`); return }
      const buf = await res.arrayBuffer()
      dbg(`fetched: ${id} size=${buf.byteLength}`)
      rawCache.set(id, buf)
    } catch (e) { dbg(`fetch ERR: ${id} ${e}`) }
  }))
  dbg(`preload done: raw=${rawCache.size} cached`)
}

// Decode raw bytes → AudioBuffer. Called at play-time when ctx is running.
async function getOrDecode(id: string, language: string): Promise<AudioBuffer | null> {
  const cached = bufferCache.get(id)
  if (cached) return cached

  let raw = rawCache.get(id)
  if (!raw) {
    // Not pre-fetched — fetch on-demand now
    if (!language) return null
    try {
      const url = `${base}/audio/${language}/${id}.m4a?v=7`
      const res = await fetch(url)
      if (!res.ok) { console.warn('[audio] fetch failed', id, res.status, url); return null }
      raw = await res.arrayBuffer()
    } catch (e) { console.warn('[audio] fetch error', id, e); return null }
  }

  const c = await ensureRunning()
  if (!c) return null

  try {
    // decodeAudioData detaches the ArrayBuffer — remove from rawCache first
    rawCache.delete(id)
    const buffer = await c.decodeAudioData(raw)
    bufferCache.set(id, buffer)
    return buffer
  } catch (e) { console.warn('[audio] decode failed', id, e); return null }
}

// Play a phoneme. Call after ensureAudioContext() has been called in the tap handler.
// Returns true if audio played, false on any failure (caller may use speakFallback).
export async function playPhoneme(id: string, language?: 'en' | 'zh'): Promise<boolean> {
  dbg(`playPhoneme: ${id}, raw=${rawCache.has(id)}, buf=${bufferCache.has(id)}`)
  const buffer = await getOrDecode(id, language ?? '')
  if (!buffer) { dbg(`playPhoneme: NO BUFFER for ${id}`); return false }
  try {
    const c = await ensureRunning()
    if (!c) { dbg('playPhoneme: ensureRunning returned null'); return false }
    dbg(`playPhoneme: playing ${id}, ctx.state=${c.state}`)
    const source = c.createBufferSource()
    source.buffer = buffer
    source.connect(c.destination)
    source.start(0)
    return true
  } catch { return false }
}

// Web Speech API fallback — used when audio files fail to load
export function speakFallback(text: string, lang: 'en' | 'zh'): void {
  if (typeof speechSynthesis === 'undefined') return
  speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  utt.lang = lang === 'zh' ? 'zh-CN' : 'en-GB'
  utt.rate = 0.8
  speechSynthesis.speak(utt)
}

// Synthesised tap click — zero files, zero latency
// Uses getCtx() — only called from gesture handlers where ensureAudioContext() was already called
export function playTapClick(): void {
  try {
    const c = getCtx()
    dbg(`tapClick: ctx.state=${c.state}`)
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.connect(gain)
    gain.connect(c.destination)
    osc.frequency.value = 900
    gain.gain.setValueAtTime(0.25, c.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.07)
    osc.start()
    osc.stop(c.currentTime + 0.07)
  } catch (_) { /* silent */ }
}

// Synthesised soft wobble/wrong-answer sound
export function playWobble(): void {
  try {
    const c = getCtx()
    const osc = c.createOscillator()
    const gain = c.createGain()
    osc.type = 'sine'
    osc.frequency.value = 250
    osc.connect(gain)
    gain.connect(c.destination)
    gain.gain.setValueAtTime(0.15, c.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.25)
    osc.start()
    osc.stop(c.currentTime + 0.25)
  } catch (_) { /* silent */ }
}

// Synthesised celebration chime
export function playCelebration(): void {
  try {
    const c = getCtx()
    const notes = [523, 659, 784, 1047] // C5 E5 G5 C6
    notes.forEach((freq, i) => {
      const osc = c.createOscillator()
      const gain = c.createGain()
      osc.type = 'sine'
      osc.frequency.value = freq
      osc.connect(gain)
      gain.connect(c.destination)
      const t = c.currentTime + i * 0.12
      gain.gain.setValueAtTime(0, t)
      gain.gain.linearRampToValueAtTime(0.3, t + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35)
      osc.start(t)
      osc.stop(t + 0.35)
    })
  } catch (_) { /* silent */ }
}
