import type { CurriculumPhase } from './types'

/**
 * Mandarin curriculum — CHARACTER-BASED approach
 *
 * Characters are the atomic unit. No pinyin initial/final breakdown.
 * 5 phases with different game mechanics, shown in linear progression:
 *
 * Phase 1 (Reveal & Learn):    Tap to reveal character + hear pronunciation + see picture
 * Phase 2 (Recall):            Character shown briefly, find it among others from memory
 * Phase 3 (Picture Match):     See a picture, pick the correct character
 * Phase 4 (Compound Words):    Combine known characters into compound words
 * Phase 5 (Listen & Match):    Hear audio, pick the matching character from 2-3 options
 */

export const zhCurriculum: CurriculumPhase[] = [
  {
    phase: 1,
    name: '认识汉字',  // Reveal & Learn
    gameMode: 'reveal',
    newPhonemeIds: ['zh-huo3', 'zh-shan1', 'zh-shui3', 'zh-ren2', 'zh-da4'],
    words: [
      { id: 'zh-huo3',  text: '火', phonemeIds: ['zh-huo3'],  meaning: 'fire',     emoji: '🔥' },
      { id: 'zh-shan1', text: '山', phonemeIds: ['zh-shan1'], meaning: 'mountain', emoji: '⛰️' },
      { id: 'zh-shui3', text: '水', phonemeIds: ['zh-shui3'], meaning: 'water',    emoji: '💧' },
      { id: 'zh-ren2',  text: '人', phonemeIds: ['zh-ren2'],  meaning: 'person',   emoji: '🧑' },
      { id: 'zh-da4',   text: '大', phonemeIds: ['zh-da4'],   meaning: 'big',      emoji: '' },
    ],
  },
  {
    phase: 2,
    name: '记忆挑战',  // Recall
    gameMode: 'recall',
    newPhonemeIds: ['zh-xiao3', 'zh-ri4', 'zh-yue4', 'zh-mu4', 'zh-guo3'],
    words: [
      // New characters
      { id: 'zh-xiao3', text: '小', phonemeIds: ['zh-xiao3'], meaning: 'small', emoji: '' },
      { id: 'zh-ri4',   text: '日', phonemeIds: ['zh-ri4'],   meaning: 'sun',   emoji: '☀️' },
      { id: 'zh-yue4',  text: '月', phonemeIds: ['zh-yue4'],  meaning: 'moon',  emoji: '🌙' },
      { id: 'zh-mu4',   text: '木', phonemeIds: ['zh-mu4'],   meaning: 'tree',  emoji: '🌳' },
      { id: 'zh-guo3',  text: '果', phonemeIds: ['zh-guo3'],  meaning: 'fruit', emoji: '🍎' },
      // Review from phase 1
      { id: 'zh-huo3',  text: '火', phonemeIds: ['zh-huo3'],  meaning: 'fire',     emoji: '🔥' },
      { id: 'zh-shan1', text: '山', phonemeIds: ['zh-shan1'], meaning: 'mountain', emoji: '⛰️' },
      { id: 'zh-shui3', text: '水', phonemeIds: ['zh-shui3'], meaning: 'water',    emoji: '💧' },
      { id: 'zh-ren2',  text: '人', phonemeIds: ['zh-ren2'],  meaning: 'person',   emoji: '🧑' },
      { id: 'zh-da4',   text: '大', phonemeIds: ['zh-da4'],   meaning: 'big',      emoji: '' },
    ],
  },
  {
    phase: 3,
    name: '看图识字',  // Picture Match
    gameMode: 'picture-match',
    newPhonemeIds: [],  // no new characters — reinforcing all 10
    words: [
      { id: 'zh-huo3',  text: '火', phonemeIds: ['zh-huo3'],  meaning: 'fire',     emoji: '🔥' },
      { id: 'zh-shan1', text: '山', phonemeIds: ['zh-shan1'], meaning: 'mountain', emoji: '⛰️' },
      { id: 'zh-shui3', text: '水', phonemeIds: ['zh-shui3'], meaning: 'water',    emoji: '💧' },
      { id: 'zh-ren2',  text: '人', phonemeIds: ['zh-ren2'],  meaning: 'person',   emoji: '🧑' },
      { id: 'zh-da4',   text: '大', phonemeIds: ['zh-da4'],   meaning: 'big',      emoji: '' },
      { id: 'zh-xiao3', text: '小', phonemeIds: ['zh-xiao3'], meaning: 'small',    emoji: '' },
      { id: 'zh-ri4',   text: '日', phonemeIds: ['zh-ri4'],   meaning: 'sun',      emoji: '☀️' },
      { id: 'zh-yue4',  text: '月', phonemeIds: ['zh-yue4'],  meaning: 'moon',     emoji: '🌙' },
      { id: 'zh-mu4',   text: '木', phonemeIds: ['zh-mu4'],   meaning: 'tree',     emoji: '🌳' },
      { id: 'zh-guo3',  text: '果', phonemeIds: ['zh-guo3'],  meaning: 'fruit',    emoji: '🍎' },
    ],
  },
  {
    phase: 4,
    name: '组词造句',  // Compound Word Building
    gameMode: 'compound',
    newPhonemeIds: [],  // no new characters — combining known ones
    words: [
      { id: 'zh-huoshan',  text: '火山', phonemeIds: ['zh-huo3', 'zh-shan1'], meaning: 'volcano',      emoji: '🌋', image: '/images/zh-transparent/objects/volcano.png' },

      { id: 'zh-shuiguo',  text: '水果', phonemeIds: ['zh-shui3', 'zh-guo3'],  meaning: 'fruit',        emoji: '🍉', image: '/images/zh-transparent/objects/fruit.png' },
      { id: 'zh-daren',    text: '大人', phonemeIds: ['zh-da4', 'zh-ren2'],    meaning: 'adult',        emoji: '🧑‍🦰', image: '/images/zh-transparent/objects/adult.png' },
      { id: 'zh-dashan',   text: '大山', phonemeIds: ['zh-da4', 'zh-shan1'],   meaning: 'big mountain', emoji: '🏔️', image: '/images/zh-transparent/objects/mountain.png' },
    ],
  },
  {
    phase: 5,
    name: '听音辨字',  // Listen & Match
    gameMode: 'listen-match',
    newPhonemeIds: [],  // no new characters — reinforcing phase 1
    words: [
      { id: 'zh-huo3',  text: '火', phonemeIds: ['zh-huo3'],  meaning: 'fire',     emoji: '🔥' },
      { id: 'zh-shan1', text: '山', phonemeIds: ['zh-shan1'], meaning: 'mountain', emoji: '⛰️' },
      { id: 'zh-shui3', text: '水', phonemeIds: ['zh-shui3'], meaning: 'water',    emoji: '💧' },
      { id: 'zh-ren2',  text: '人', phonemeIds: ['zh-ren2'],  meaning: 'person',   emoji: '🧑' },
      { id: 'zh-da4',   text: '大', phonemeIds: ['zh-da4'],   meaning: 'big',      emoji: '' },
    ],
  },
]
