const STORAGE_KEY = 'volcanofrog_progress_v1'

interface ProgressData {
  unlockedPhase: Record<string, number>
  phonemeTaps: Record<string, number>
  completedWords: string[]
}

function loadProgress(): ProgressData {
  if (typeof localStorage === 'undefined') return defaultProgress()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return defaultProgress()
}

function defaultProgress(): ProgressData {
  return {
    unlockedPhase: { en: 1, zh: 1 },
    phonemeTaps: {},
    completedWords: [],
  }
}

export const progress = $state<ProgressData>(loadProgress())

export function saveProgress() {
  if (typeof localStorage === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    unlockedPhase: progress.unlockedPhase,
    phonemeTaps: progress.phonemeTaps,
    completedWords: progress.completedWords,
  }))
}

export function recordPhonemeTap(phonemeId: string) {
  progress.phonemeTaps[phonemeId] = (progress.phonemeTaps[phonemeId] ?? 0) + 1
  saveProgress()
}

export function recordWordComplete(wordId: string) {
  if (!progress.completedWords.includes(wordId)) {
    progress.completedWords.push(wordId)
  }
  saveProgress()
}

export function advancePhase(lang: 'en' | 'zh') {
  progress.unlockedPhase[lang] = (progress.unlockedPhase[lang] ?? 1) + 1
  saveProgress()
}

export function resetProgress() {
  const fresh = defaultProgress()
  progress.unlockedPhase = fresh.unlockedPhase
  progress.phonemeTaps = fresh.phonemeTaps
  progress.completedWords = fresh.completedWords
  saveProgress()
}
