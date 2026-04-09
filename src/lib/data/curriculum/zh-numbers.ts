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
      { id: 'zh-yi1',  text: '一', phonemeIds: ['zh-yi1'],  meaning: 'one',   emoji: '' },
      { id: 'zh-er4',  text: '二', phonemeIds: ['zh-er4'],  meaning: 'two',   emoji: '' },
      { id: 'zh-san1', text: '三', phonemeIds: ['zh-san1'], meaning: 'three', emoji: '' },
      { id: 'zh-si4',  text: '四', phonemeIds: ['zh-si4'],  meaning: 'four',  emoji: '' },
      { id: 'zh-wu3',  text: '五', phonemeIds: ['zh-wu3'],  meaning: 'five',  emoji: '' },
      { id: 'zh-liu4', text: '六', phonemeIds: ['zh-liu4'], meaning: 'six',   emoji: '' },
      { id: 'zh-qi1',  text: '七', phonemeIds: ['zh-qi1'],  meaning: 'seven', emoji: '' },
      { id: 'zh-ba1',  text: '八', phonemeIds: ['zh-ba1'],  meaning: 'eight', emoji: '' },
      { id: 'zh-jiu3', text: '九', phonemeIds: ['zh-jiu3'], meaning: 'nine',  emoji: '' },
      { id: 'zh-shi2', text: '十', phonemeIds: ['zh-shi2'], meaning: 'ten',   emoji: '' },
    ],
  },
  {
    phase: 2,
    name: '数字记忆',  // Recall Numbers
    gameMode: 'recall',
    newPhonemeIds: [],
    words: [
      { id: 'zh-yi1',  text: '一', phonemeIds: ['zh-yi1'],  meaning: 'one',   emoji: '' },
      { id: 'zh-er4',  text: '二', phonemeIds: ['zh-er4'],  meaning: 'two',   emoji: '' },
      { id: 'zh-san1', text: '三', phonemeIds: ['zh-san1'], meaning: 'three', emoji: '' },
      { id: 'zh-si4',  text: '四', phonemeIds: ['zh-si4'],  meaning: 'four',  emoji: '' },
      { id: 'zh-wu3',  text: '五', phonemeIds: ['zh-wu3'],  meaning: 'five',  emoji: '' },
      { id: 'zh-liu4', text: '六', phonemeIds: ['zh-liu4'], meaning: 'six',   emoji: '' },
      { id: 'zh-qi1',  text: '七', phonemeIds: ['zh-qi1'],  meaning: 'seven', emoji: '' },
      { id: 'zh-ba1',  text: '八', phonemeIds: ['zh-ba1'],  meaning: 'eight', emoji: '' },
      { id: 'zh-jiu3', text: '九', phonemeIds: ['zh-jiu3'], meaning: 'nine',  emoji: '' },
      { id: 'zh-shi2', text: '十', phonemeIds: ['zh-shi2'], meaning: 'ten',   emoji: '' },
    ],
  },
  {
    phase: 3,
    name: '看数识字',  // Picture Match Numbers
    gameMode: 'picture-match',
    newPhonemeIds: [],
    words: [
      { id: 'zh-yi1',  text: '一', phonemeIds: ['zh-yi1'],  meaning: 'one',   emoji: '' },
      { id: 'zh-er4',  text: '二', phonemeIds: ['zh-er4'],  meaning: 'two',   emoji: '' },
      { id: 'zh-san1', text: '三', phonemeIds: ['zh-san1'], meaning: 'three', emoji: '' },
      { id: 'zh-si4',  text: '四', phonemeIds: ['zh-si4'],  meaning: 'four',  emoji: '' },
      { id: 'zh-wu3',  text: '五', phonemeIds: ['zh-wu3'],  meaning: 'five',  emoji: '' },
      { id: 'zh-liu4', text: '六', phonemeIds: ['zh-liu4'], meaning: 'six',   emoji: '' },
      { id: 'zh-qi1',  text: '七', phonemeIds: ['zh-qi1'],  meaning: 'seven', emoji: '' },
      { id: 'zh-ba1',  text: '八', phonemeIds: ['zh-ba1'],  meaning: 'eight', emoji: '' },
      { id: 'zh-jiu3', text: '九', phonemeIds: ['zh-jiu3'], meaning: 'nine',  emoji: '' },
      { id: 'zh-shi2', text: '十', phonemeIds: ['zh-shi2'], meaning: 'ten',   emoji: '' },
    ],
  },
  {
    phase: 4,
    name: '组合数字',  // Compound Numbers
    gameMode: 'compound',
    newPhonemeIds: [],
    words: [
      // 11-19
      { id: 'zh-shiyi',  text: '十一', phonemeIds: ['zh-shi2', 'zh-yi1'],  meaning: 'eleven',    digits: [1, 1] },
      { id: 'zh-shier',  text: '十二', phonemeIds: ['zh-shi2', 'zh-er4'],  meaning: 'twelve',    digits: [1, 2] },
      { id: 'zh-shisan', text: '十三', phonemeIds: ['zh-shi2', 'zh-san1'], meaning: 'thirteen',  digits: [1, 3] },
      { id: 'zh-shisi',  text: '十四', phonemeIds: ['zh-shi2', 'zh-si4'],  meaning: 'fourteen',  digits: [1, 4] },
      { id: 'zh-shiwu',  text: '十五', phonemeIds: ['zh-shi2', 'zh-wu3'],  meaning: 'fifteen',   digits: [1, 5] },
      { id: 'zh-shiliu', text: '十六', phonemeIds: ['zh-shi2', 'zh-liu4'], meaning: 'sixteen',   digits: [1, 6] },
      { id: 'zh-shiqi',  text: '十七', phonemeIds: ['zh-shi2', 'zh-qi1'],  meaning: 'seventeen', digits: [1, 7] },
      { id: 'zh-shiba',  text: '十八', phonemeIds: ['zh-shi2', 'zh-ba1'],  meaning: 'eighteen',  digits: [1, 8] },
      { id: 'zh-shijiu', text: '十九', phonemeIds: ['zh-shi2', 'zh-jiu3'], meaning: 'nineteen',  digits: [1, 9] },
      // Round tens 20-90
      { id: 'zh-ershi',  text: '二十', phonemeIds: ['zh-er4', 'zh-shi2'],  meaning: 'twenty',    digits: [2, 0] },
      { id: 'zh-sanshi', text: '三十', phonemeIds: ['zh-san1', 'zh-shi2'], meaning: 'thirty',    digits: [3, 0] },
      { id: 'zh-sishi',  text: '四十', phonemeIds: ['zh-si4', 'zh-shi2'],  meaning: 'forty',     digits: [4, 0] },
      { id: 'zh-wushi',  text: '五十', phonemeIds: ['zh-wu3', 'zh-shi2'],  meaning: 'fifty',     digits: [5, 0] },
      { id: 'zh-liushi', text: '六十', phonemeIds: ['zh-liu4', 'zh-shi2'], meaning: 'sixty',     digits: [6, 0] },
      { id: 'zh-qishi',  text: '七十', phonemeIds: ['zh-qi1', 'zh-shi2'],  meaning: 'seventy',   digits: [7, 0] },
      { id: 'zh-bashi',  text: '八十', phonemeIds: ['zh-ba1', 'zh-shi2'],  meaning: 'eighty',    digits: [8, 0] },
      { id: 'zh-jiushi', text: '九十', phonemeIds: ['zh-jiu3', 'zh-shi2'], meaning: 'ninety',    digits: [9, 0] },
      // 3-character compound numbers
      { id: 'zh-ershiyi',  text: '二十一', phonemeIds: ['zh-er4', 'zh-shi2', 'zh-yi1'],  meaning: 'twenty-one',   digits: [2, 1] },
      { id: 'zh-sanshiwu', text: '三十五', phonemeIds: ['zh-san1', 'zh-shi2', 'zh-wu3'], meaning: 'thirty-five',  digits: [3, 5] },
      { id: 'zh-wushiba',  text: '五十八', phonemeIds: ['zh-wu3', 'zh-shi2', 'zh-ba1'],  meaning: 'fifty-eight',  digits: [5, 8] },
      { id: 'zh-jiushijiu',text: '九十九', phonemeIds: ['zh-jiu3', 'zh-shi2', 'zh-jiu3'],meaning: 'ninety-nine',  digits: [9, 9] },
    ],
  },
  {
    phase: 5,
    name: '听数辨字',  // Listen & Match Numbers
    gameMode: 'listen-match',
    newPhonemeIds: ['zh-liu4', 'zh-qi1', 'zh-ba1', 'zh-jiu3', 'zh-shi2'],
    words: [
      { id: 'zh-liu4', text: '六', phonemeIds: ['zh-liu4'], meaning: 'six',   emoji: '' },
      { id: 'zh-qi1',  text: '七', phonemeIds: ['zh-qi1'],  meaning: 'seven', emoji: '' },
      { id: 'zh-ba1',  text: '八', phonemeIds: ['zh-ba1'],  meaning: 'eight', emoji: '' },
      { id: 'zh-jiu3', text: '九', phonemeIds: ['zh-jiu3'], meaning: 'nine',  emoji: '' },
      { id: 'zh-shi2', text: '十', phonemeIds: ['zh-shi2'], meaning: 'ten',   emoji: '' },
    ],
  },
]
