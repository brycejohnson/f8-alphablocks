import type { CurriculumWord, ZhGameMode } from '$lib/data/curriculum/types'

export type GameScreen = 'phase-select' | 'playing'

export const game = $state({
  language: 'zh' as 'en' | 'zh',
  screen: 'phase-select' as GameScreen,
  currentLevel: 1,
  activePhase: 1,
  activeTrack: 'zh-characters' as string,  // which curriculum track
  zhGameMode: null as ZhGameMode | null,  // active Chinese game mode
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

export function selectPhase(phase: number, gameMode: ZhGameMode | null, trackId?: string) {
  game.activePhase = phase
  game.zhGameMode = gameMode
  if (trackId) game.activeTrack = trackId
  game.screen = 'playing'
  resetWord()
}

export function backToPhases() {
  game.screen = 'phase-select'
  game.zhGameMode = null
  resetWord()
}
