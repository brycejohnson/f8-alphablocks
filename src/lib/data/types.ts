export interface Phoneme {
  id: string          // e.g. 'en-sh', 'zh-ma-2'
  symbol: string      // display character(s): 'sh', '妈'
  ipa: string         // IPA for TTS: 'ʃ', 'mā'
  colour: string      // hex, unique per phoneme identity
  audioFile: string   // relative to /audio/{lang}/: 'en-sh.mp3'
  isDigraph?: boolean // two letters, one sound
}

export interface Word {
  id: string          // e.g. 'en-cat', 'zh-mao'
  text: string        // 'cat', '猫'
  phonemeIds: string[] // ordered: ['en-k', 'en-a', 'en-t']
  audioFile: string   // full word pronunciation
  imageHint?: string  // future: illustration keyword
}

export interface Level {
  id: number
  language: 'en' | 'zh'
  words: Word[]
}
