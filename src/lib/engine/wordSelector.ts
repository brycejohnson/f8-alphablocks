import type { CurriculumPhase, CurriculumWord } from '$lib/data/curriculum/types'

export const MASTERY_THRESHOLD = 3  // correct taps per phoneme to master it

// All phoneme IDs unlocked up to and including the given phase
export function unlockedPhonemes(phases: CurriculumPhase[], phase: number): Set<string> {
  return new Set(
    phases.filter(p => p.phase <= phase).flatMap(p => p.newPhonemeIds)
  )
}

// Whether every phoneme in the current phase has been tapped enough times
export function isPhaseComplete(
  phases: CurriculumPhase[],
  currentPhase: number,
  phonemeTaps: Record<string, number>
): boolean {
  const phase = phases.find(p => p.phase === currentPhase)
  if (!phase) return false
  return phase.newPhonemeIds.every(id => (phonemeTaps[id] ?? 0) >= MASTERY_THRESHOLD)
}

// Returns next phase number, or null if already at max
export function nextPhase(phases: CurriculumPhase[], currentPhase: number): number | null {
  const max = Math.max(...phases.map(p => p.phase))
  return currentPhase < max ? currentPhase + 1 : null
}

// Select a queue of words for the current session
// Priority: words from current phase not yet completed, then older uncompleted, then reviews
export function selectWords(
  phases: CurriculumPhase[],
  currentPhase: number,
  completedWords: string[],
  count = 5
): CurriculumWord[] {
  const unlocked = unlockedPhonemes(phases, currentPhase)
  const completed = new Set(completedWords)

  // Only words whose phonemes are all unlocked
  const eligible = phases
    .filter(p => p.phase <= currentPhase)
    .flatMap(p => p.words.map(w => ({ word: w, phase: p.phase })))
    .filter(({ word }) => word.phonemeIds.every(id => unlocked.has(id)))

  // Score: current phase + not yet completed scores highest
  const scored = eligible.map(({ word, phase }) => ({
    word,
    score:
      (phase === currentPhase ? 100 : 0) +
      (!completed.has(word.id) ? 50 : 0) +
      Math.random() * 10,  // small shuffle within tiers
  }))

  scored.sort((a, b) => b.score - a.score)

  return scored.slice(0, count).map(s => s.word)
}
