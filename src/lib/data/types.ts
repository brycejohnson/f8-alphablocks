export interface Phoneme {
  id: string          // e.g. 'en-sh', 'zh-huo3'
  symbol: string      // display character(s): 'sh', '火'
  ipa: string         // IPA for TTS: 'ʃ', 'huǒ'
  colour: string      // hex, unique per phoneme identity
  audioFile: string   // relative to /audio/{lang}/: 'en-sh.m4a'
  isDigraph?: boolean // two letters, one sound (English only)
  meaning?: string    // human-readable meaning (Chinese characters): 'fire', 'mountain'
  emoji?: string      // Noto Emoji / visual placeholder: '🔥', '⛰️'
}

export interface Word {
  id: string          // e.g. 'en-cat', 'zh-huoshan'
  text: string        // 'cat', '火山'
  phonemeIds: string[] // ordered: ['en-k', 'en-a', 'en-t'] or ['zh-huo3', 'zh-shan1']
  audioFile: string   // full word pronunciation
  meaning?: string    // compound word meaning: 'volcano'
  emoji?: string      // visual for compound: '🌋'
  imageHint?: string  // future: illustration keyword
}

export interface Level {
  id: number
  language: 'en' | 'zh'
  words: Word[]
}
