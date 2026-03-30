export interface CurriculumWord {
  id: string           // 'en-cat' or 'zh-huoshan' — matches audio file stem
  text: string         // 'cat' or '火山'
  phonemeIds: string[] // ['en-c', 'en-a', 'en-t'] or ['zh-huo3', 'zh-shan1']
  meaning?: string     // human-readable meaning: 'volcano'
  emoji?: string       // visual placeholder: '🌋'
  image?: string       // path to illustration: '/images/zh/animals/cat.jpg'
}

/** Game mode for Chinese phases */
export type ZhGameMode = 'reveal' | 'listen-match' | 'recall' | 'picture-match' | 'compound'

export interface CurriculumPhase {
  phase: number
  name: string
  newPhonemeIds: string[]  // phonemes introduced this phase
  words: CurriculumWord[]
  gameMode?: ZhGameMode   // Chinese-specific game mode (undefined = default sequential tap)
}

/** A curriculum track groups phases under a topic */
export interface CurriculumTrack {
  id: string              // 'zh-characters', 'zh-numbers'
  name: string            // '汉字 Characters'
  icon: string            // '🀄'
  phases: CurriculumPhase[]
}
