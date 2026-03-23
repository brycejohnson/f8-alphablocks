export interface CurriculumWord {
  id: string           // 'en-cat' — matches audio file stem
  text: string         // 'cat'
  phonemeIds: string[] // ['en-c', 'en-a', 'en-t']
}

export interface CurriculumPhase {
  phase: number
  name: string
  newPhonemeIds: string[]  // phonemes introduced this phase
  words: CurriculumWord[]
}
