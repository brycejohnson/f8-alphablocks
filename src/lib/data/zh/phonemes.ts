import type { Phoneme } from '../types'

/**
 * Chinese phoneme data — CHARACTER-BASED approach
 *
 * Each Chinese character is ONE phoneme (one block, one tap, one sound).
 * No pinyin initial/final breakdown — characters are the atomic unit.
 *
 * Tone colours (for future pinyin display toggle):
 *   1=blue, 2=green, 3=orange, 4=red
 */

// Starter character set — 10 characters chosen for:
// visual simplicity, concrete meaning, compound word productivity
export const zhCharacters: Phoneme[] = [
  { id: 'zh-huo3',  symbol: '火', ipa: 'huǒ',  colour: '#E53935', audioFile: 'zh-huo3.m4a',  meaning: 'fire',     emoji: '🔥' },
  { id: 'zh-shan1', symbol: '山', ipa: 'shān',  colour: '#2E7D32', audioFile: 'zh-shan1.m4a', meaning: 'mountain', emoji: '⛰️' },
  { id: 'zh-shui3', symbol: '水', ipa: 'shuǐ',  colour: '#1565C0', audioFile: 'zh-shui3.m4a', meaning: 'water',    emoji: '💧' },
  { id: 'zh-da4',   symbol: '大', ipa: 'dà',    colour: '#B71C1C', audioFile: 'zh-da4.m4a',   meaning: 'big',      emoji: '🐘' },
  { id: 'zh-xiao3', symbol: '小', ipa: 'xiǎo',  colour: '#42A5F5', audioFile: 'zh-xiao3.m4a', meaning: 'small',    emoji: '🐜' },
  { id: 'zh-ren2',  symbol: '人', ipa: 'rén',   colour: '#6D4C41', audioFile: 'zh-ren2.m4a',  meaning: 'person',   emoji: '🧑' },
  { id: 'zh-ri4',   symbol: '日', ipa: 'rì',    colour: '#F9A825', audioFile: 'zh-ri4.m4a',   meaning: 'sun',      emoji: '☀️' },
  { id: 'zh-yue4',  symbol: '月', ipa: 'yuè',   colour: '#78909C', audioFile: 'zh-yue4.m4a',  meaning: 'moon',     emoji: '🌙' },
  { id: 'zh-mu4',   symbol: '木', ipa: 'mù',    colour: '#558B2F', audioFile: 'zh-mu4.m4a',   meaning: 'tree',     emoji: '🌳' },
  { id: 'zh-guo3',  symbol: '果', ipa: 'guǒ',   colour: '#E91E63', audioFile: 'zh-guo3.m4a',  meaning: 'fruit',    emoji: '🍎' },
]

export const zhAllPhonemes = zhCharacters
export const zhPhonemeMap = new Map(zhAllPhonemes.map(p => [p.id, p]))
