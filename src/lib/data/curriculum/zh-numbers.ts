import type { CurriculumPhase } from './types'

/**
 * Mandarin Numbers curriculum — separate track
 *
 * Numbers 1-10 as individual characters, then compound numbers.
 * Same 5-phase game mechanic progression as the main track.
 */

export const zhNumbersCurriculum: CurriculumPhase[] = [
  {
    phase: 1,
    name: '认识数字',  // Reveal & Learn Numbers
    gameMode: 'reveal',
    newPhonemeIds: ['zh-yi1', 'zh-er4', 'zh-san1', 'zh-si4', 'zh-wu3', 'zh-liu4', 'zh-qi1', 'zh-ba1', 'zh-jiu3', 'zh-shi2'],
    words: [
      { id: 'zh-yi1',  text: '一', phonemeIds: ['zh-yi1'],  meaning: 'one',   emoji: '1️⃣' },
      { id: 'zh-er4',  text: '二', phonemeIds: ['zh-er4'],  meaning: 'two',   emoji: '2️⃣' },
      { id: 'zh-san1', text: '三', phonemeIds: ['zh-san1'], meaning: 'three', emoji: '3️⃣' },
      { id: 'zh-si4',  text: '四', phonemeIds: ['zh-si4'],  meaning: 'four',  emoji: '4️⃣' },
      { id: 'zh-wu3',  text: '五', phonemeIds: ['zh-wu3'],  meaning: 'five',  emoji: '5️⃣' },
      { id: 'zh-liu4', text: '六', phonemeIds: ['zh-liu4'], meaning: 'six',   emoji: '6️⃣' },
      { id: 'zh-qi1',  text: '七', phonemeIds: ['zh-qi1'],  meaning: 'seven', emoji: '7️⃣' },
      { id: 'zh-ba1',  text: '八', phonemeIds: ['zh-ba1'],  meaning: 'eight', emoji: '8️⃣' },
      { id: 'zh-jiu3', text: '九', phonemeIds: ['zh-jiu3'], meaning: 'nine',  emoji: '9️⃣' },
      { id: 'zh-shi2', text: '十', phonemeIds: ['zh-shi2'], meaning: 'ten',   emoji: '🔟' },
    ],
  },
  {
    phase: 2,
    name: '数字记忆',  // Recall Numbers
    gameMode: 'recall',
    newPhonemeIds: [],
    words: [
      { id: 'zh-yi1',  text: '一', phonemeIds: ['zh-yi1'],  meaning: 'one',   emoji: '1️⃣' },
      { id: 'zh-er4',  text: '二', phonemeIds: ['zh-er4'],  meaning: 'two',   emoji: '2️⃣' },
      { id: 'zh-san1', text: '三', phonemeIds: ['zh-san1'], meaning: 'three', emoji: '3️⃣' },
      { id: 'zh-si4',  text: '四', phonemeIds: ['zh-si4'],  meaning: 'four',  emoji: '4️⃣' },
      { id: 'zh-wu3',  text: '五', phonemeIds: ['zh-wu3'],  meaning: 'five',  emoji: '5️⃣' },
      { id: 'zh-liu4', text: '六', phonemeIds: ['zh-liu4'], meaning: 'six',   emoji: '6️⃣' },
      { id: 'zh-qi1',  text: '七', phonemeIds: ['zh-qi1'],  meaning: 'seven', emoji: '7️⃣' },
      { id: 'zh-ba1',  text: '八', phonemeIds: ['zh-ba1'],  meaning: 'eight', emoji: '8️⃣' },
      { id: 'zh-jiu3', text: '九', phonemeIds: ['zh-jiu3'], meaning: 'nine',  emoji: '9️⃣' },
      { id: 'zh-shi2', text: '十', phonemeIds: ['zh-shi2'], meaning: 'ten',   emoji: '🔟' },
    ],
  },
  {
    phase: 3,
    name: '看数识字',  // Picture Match Numbers
    gameMode: 'picture-match',
    newPhonemeIds: [],
    words: [
      { id: 'zh-yi1',  text: '一', phonemeIds: ['zh-yi1'],  meaning: 'one',   emoji: '1️⃣' },
      { id: 'zh-er4',  text: '二', phonemeIds: ['zh-er4'],  meaning: 'two',   emoji: '2️⃣' },
      { id: 'zh-san1', text: '三', phonemeIds: ['zh-san1'], meaning: 'three', emoji: '3️⃣' },
      { id: 'zh-si4',  text: '四', phonemeIds: ['zh-si4'],  meaning: 'four',  emoji: '4️⃣' },
      { id: 'zh-wu3',  text: '五', phonemeIds: ['zh-wu3'],  meaning: 'five',  emoji: '5️⃣' },
      { id: 'zh-liu4', text: '六', phonemeIds: ['zh-liu4'], meaning: 'six',   emoji: '6️⃣' },
      { id: 'zh-qi1',  text: '七', phonemeIds: ['zh-qi1'],  meaning: 'seven', emoji: '7️⃣' },
      { id: 'zh-ba1',  text: '八', phonemeIds: ['zh-ba1'],  meaning: 'eight', emoji: '8️⃣' },
      { id: 'zh-jiu3', text: '九', phonemeIds: ['zh-jiu3'], meaning: 'nine',  emoji: '9️⃣' },
      { id: 'zh-shi2', text: '十', phonemeIds: ['zh-shi2'], meaning: 'ten',   emoji: '🔟' },
    ],
  },
  {
    phase: 4,
    name: '组合数字',  // Compound Numbers
    gameMode: 'compound',
    newPhonemeIds: [],
    words: [
      { id: 'zh-shiyi',  text: '十一', phonemeIds: ['zh-shi2', 'zh-yi1'],  meaning: 'eleven',   digits: [1, 1] },
      { id: 'zh-shier',  text: '十二', phonemeIds: ['zh-shi2', 'zh-er4'],  meaning: 'twelve',   digits: [1, 2] },
      { id: 'zh-shisan', text: '十三', phonemeIds: ['zh-shi2', 'zh-san1'], meaning: 'thirteen', digits: [1, 3] },
      { id: 'zh-shiwu',  text: '十五', phonemeIds: ['zh-shi2', 'zh-wu3'],  meaning: 'fifteen',  digits: [1, 5] },
      { id: 'zh-ershi',  text: '二十', phonemeIds: ['zh-er4', 'zh-shi2'],  meaning: 'twenty',   digits: [2, 0] },
      { id: 'zh-jiushi', text: '九十', phonemeIds: ['zh-jiu3', 'zh-shi2'], meaning: 'ninety',   digits: [9, 0] },
    ],
  },
  {
    phase: 5,
    name: '听数辨字',  // Listen & Match Numbers
    gameMode: 'listen-match',
    newPhonemeIds: ['zh-liu4', 'zh-qi1', 'zh-ba1', 'zh-jiu3', 'zh-shi2'],
    words: [
      { id: 'zh-liu4', text: '六', phonemeIds: ['zh-liu4'], meaning: 'six',   emoji: '6️⃣' },
      { id: 'zh-qi1',  text: '七', phonemeIds: ['zh-qi1'],  meaning: 'seven', emoji: '7️⃣' },
      { id: 'zh-ba1',  text: '八', phonemeIds: ['zh-ba1'],  meaning: 'eight', emoji: '8️⃣' },
      { id: 'zh-jiu3', text: '九', phonemeIds: ['zh-jiu3'], meaning: 'nine',  emoji: '9️⃣' },
      { id: 'zh-shi2', text: '十', phonemeIds: ['zh-shi2'], meaning: 'ten',   emoji: '🔟' },
    ],
  },
]
