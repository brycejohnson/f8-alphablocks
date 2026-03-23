import type { CurriculumWord } from '$lib/data/curriculum/types'

export const game = $state({
  language: 'en' as 'en' | 'zh',
  currentLevel: 1,
  activeWord: null as CurriculumWord | null,
  phonemeIndex: 0,        // which block is currently "speaking" (-1 = none)
  wordComplete: false,    // true when all phonemes played + word pronounced
  celebrating: false,     // star burst active
  score: 0
})

export function nextPhoneme() {
  if (!game.activeWord) return
  if (game.phonemeIndex < game.activeWord.phonemeIds.length - 1) {
    game.phonemeIndex++
  } else {
    game.phonemeIndex = -1
    game.wordComplete = true
  }
}

export function startWord(word: CurriculumWord) {
  game.activeWord = word
  game.phonemeIndex = 0
  game.wordComplete = false
  game.celebrating = false
}

export function celebrate() {
  game.celebrating = true
  game.score++
}

export function resetWord() {
  game.activeWord = null
  game.phonemeIndex = 0
  game.wordComplete = false
  game.celebrating = false
}
