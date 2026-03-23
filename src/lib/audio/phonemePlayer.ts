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

// Stage 1: raw fetch bytes — populated by preloadPhonemes, no AudioContext needed
const rawCache = new Map<string, ArrayBuffer>()
// Stage 2: decoded AudioBuffer — populated on first play, reused forever
const bufferCache = new Map<string, AudioBuffer>()

function getCtx(): AudioContext {
  if (!ctx && AudioContextClass) ctx = new AudioContextClass()
  if (!ctx) throw new Error('AudioContext unavailable')
  return ctx
}

// Call synchronously inside every user-gesture handler (button onclick etc.).
// Creates the AudioContext inside the gesture → starts RUNNING (not suspended).
// On subsequent calls: resumes if somehow suspended, otherwise no-op.
export function ensureAudioContext(): void {
  if (!AudioContextClass) return
  if (!ctx) {
    ctx = new AudioContextClass() // Created in gesture → running state
  } else if (ctx.state === 'suspended') {
    ctx.resume() // fire-and-forget — kicks context back to running
  }
}

// Pre-fetch raw bytes for upcoming audio so first play has near-zero latency.
// Does NOT decode — no AudioContext required, works before first user gesture.
export async function preloadPhonemes(language: 'en' | 'zh', ids: string[]) {
  await Promise.all(ids.map(async (id) => {
    if (bufferCache.has(id) || rawCache.has(id)) return
    try {
      const res = await fetch(`${base}/audio/${language}/${id}.m4a?v=7`)
      if (!res.ok) return
      rawCache.set(id, await res.arrayBuffer())
    } catch { /* silent */ }
  }))
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

  try {
    const c = getCtx()
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
  const buffer = await getOrDecode(id, language ?? '')
  if (!buffer) return false
  try {
    const c = getCtx()
    // Await resume — context may have auto-suspended after 30s inactivity (second-tap silence fix)
    if (c.state === 'suspended') await c.resume()
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
export function playTapClick(): void {
  try {
    const c = getCtx()
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
