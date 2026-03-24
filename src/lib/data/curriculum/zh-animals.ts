import type { CurriculumPhase } from './types'

/**
 * Mandarin Animals curriculum — separate track
 * Compound words reuse characters from the main characters track (大, 小, 水, 火)
 */

export const zhAnimalsCurriculum: CurriculumPhase[] = [
  {
    phase: 1,
    name: '认识动物',  // Reveal & Learn Animals
    gameMode: 'reveal',
    newPhonemeIds: ['zh-mao1', 'zh-gou3', 'zh-yu2', 'zh-niao3', 'zh-ma3'],
    words: [
      { id: 'zh-mao1',  text: '猫', phonemeIds: ['zh-mao1'],  meaning: 'cat',   emoji: '🐱' },
      { id: 'zh-gou3',  text: '狗', phonemeIds: ['zh-gou3'],  meaning: 'dog',   emoji: '🐕' },
      { id: 'zh-yu2',   text: '鱼', phonemeIds: ['zh-yu2'],   meaning: 'fish',  emoji: '🐟' },
      { id: 'zh-niao3', text: '鸟', phonemeIds: ['zh-niao3'], meaning: 'bird',  emoji: '🐦' },
      { id: 'zh-ma3',   text: '马', phonemeIds: ['zh-ma3'],   meaning: 'horse', emoji: '🐴' },
    ],
  },
  {
    phase: 2,
    name: '听音辨动物',  // Listen & Match Animals
    gameMode: 'listen-match',
    newPhonemeIds: ['zh-niu2', 'zh-zhu1', 'zh-yang2', 'zh-ji1', 'zh-long2'],
    words: [
      { id: 'zh-niu2',  text: '牛', phonemeIds: ['zh-niu2'],  meaning: 'cow',     emoji: '🐄' },
      { id: 'zh-zhu1',  text: '猪', phonemeIds: ['zh-zhu1'],  meaning: 'pig',     emoji: '🐷' },
      { id: 'zh-yang2', text: '羊', phonemeIds: ['zh-yang2'], meaning: 'sheep',   emoji: '🐑' },
      { id: 'zh-ji1',   text: '鸡', phonemeIds: ['zh-ji1'],   meaning: 'chicken', emoji: '🐔' },
      { id: 'zh-long2', text: '龙', phonemeIds: ['zh-long2'], meaning: 'dragon',  emoji: '🐉' },
    ],
  },
  {
    phase: 3,
    name: '动物记忆',  // Recall Animals
    gameMode: 'recall',
    newPhonemeIds: [],
    words: [
      { id: 'zh-mao1',  text: '猫', phonemeIds: ['zh-mao1'],  meaning: 'cat',     emoji: '🐱' },
      { id: 'zh-gou3',  text: '狗', phonemeIds: ['zh-gou3'],  meaning: 'dog',     emoji: '🐕' },
      { id: 'zh-yu2',   text: '鱼', phonemeIds: ['zh-yu2'],   meaning: 'fish',    emoji: '🐟' },
      { id: 'zh-niao3', text: '鸟', phonemeIds: ['zh-niao3'], meaning: 'bird',    emoji: '🐦' },
      { id: 'zh-ma3',   text: '马', phonemeIds: ['zh-ma3'],   meaning: 'horse',   emoji: '🐴' },
      { id: 'zh-niu2',  text: '牛', phonemeIds: ['zh-niu2'],  meaning: 'cow',     emoji: '🐄' },
      { id: 'zh-zhu1',  text: '猪', phonemeIds: ['zh-zhu1'],  meaning: 'pig',     emoji: '🐷' },
      { id: 'zh-yang2', text: '羊', phonemeIds: ['zh-yang2'], meaning: 'sheep',   emoji: '🐑' },
      { id: 'zh-ji1',   text: '鸡', phonemeIds: ['zh-ji1'],   meaning: 'chicken', emoji: '🐔' },
      { id: 'zh-long2', text: '龙', phonemeIds: ['zh-long2'], meaning: 'dragon',  emoji: '🐉' },
    ],
  },
  {
    phase: 4,
    name: '看图识动物',  // Picture Match Animals
    gameMode: 'picture-match',
    newPhonemeIds: [],
    words: [
      { id: 'zh-mao1',  text: '猫', phonemeIds: ['zh-mao1'],  meaning: 'cat',     emoji: '🐱' },
      { id: 'zh-gou3',  text: '狗', phonemeIds: ['zh-gou3'],  meaning: 'dog',     emoji: '🐕' },
      { id: 'zh-yu2',   text: '鱼', phonemeIds: ['zh-yu2'],   meaning: 'fish',    emoji: '🐟' },
      { id: 'zh-niao3', text: '鸟', phonemeIds: ['zh-niao3'], meaning: 'bird',    emoji: '🐦' },
      { id: 'zh-ma3',   text: '马', phonemeIds: ['zh-ma3'],   meaning: 'horse',   emoji: '🐴' },
      { id: 'zh-niu2',  text: '牛', phonemeIds: ['zh-niu2'],  meaning: 'cow',     emoji: '🐄' },
      { id: 'zh-zhu1',  text: '猪', phonemeIds: ['zh-zhu1'],  meaning: 'pig',     emoji: '🐷' },
      { id: 'zh-yang2', text: '羊', phonemeIds: ['zh-yang2'], meaning: 'sheep',   emoji: '🐑' },
      { id: 'zh-ji1',   text: '鸡', phonemeIds: ['zh-ji1'],   meaning: 'chicken', emoji: '🐔' },
      { id: 'zh-long2', text: '龙', phonemeIds: ['zh-long2'], meaning: 'dragon',  emoji: '🐉' },
    ],
  },
  {
    phase: 5,
    name: '组合动物词',  // Compound Animal Words
    gameMode: 'compound',
    newPhonemeIds: [],
    words: [
      { id: 'zh-xiaogou',  text: '小狗', phonemeIds: ['zh-xiao3', 'zh-gou3'],  meaning: 'puppy',          emoji: '🐶' },
      { id: 'zh-xiaomao',  text: '小猫', phonemeIds: ['zh-xiao3', 'zh-mao1'],  meaning: 'kitten',         emoji: '🐱' },
      { id: 'zh-xiaoniao', text: '小鸟', phonemeIds: ['zh-xiao3', 'zh-niao3'], meaning: 'little bird',    emoji: '🐤' },
      { id: 'zh-dama',     text: '大马', phonemeIds: ['zh-da4', 'zh-ma3'],     meaning: 'big horse',      emoji: '🐎' },
      { id: 'zh-shuiniu',  text: '水牛', phonemeIds: ['zh-shui3', 'zh-niu2'],  meaning: 'water buffalo',  emoji: '🐃' },
      { id: 'zh-huolong',  text: '火龙', phonemeIds: ['zh-huo3', 'zh-long2'],  meaning: 'fire dragon',    emoji: '🐲' },
    ],
  },
]
