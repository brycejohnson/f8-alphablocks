import type { CurriculumPhase } from './types'

/**
 * Mandarin Animals curriculum — separate track
 * 20 animals, compound words reuse characters from other tracks
 */

export const zhAnimalsCurriculum: CurriculumPhase[] = [
  {
    phase: 1,
    name: '认识动物',  // Reveal & Learn Animals
    gameMode: 'reveal',
    newPhonemeIds: ['zh-mao1', 'zh-gou3', 'zh-yu2', 'zh-niao3', 'zh-ma3', 'zh-niu2', 'zh-zhu1', 'zh-yang2', 'zh-ji1', 'zh-long2'],
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
    phase: 2,
    name: '动物记忆',  // Recall — All Animals
    gameMode: 'recall',
    newPhonemeIds: [],
    words: [
      { id: 'zh-mao1',   text: '猫', phonemeIds: ['zh-mao1'],   meaning: 'cat',      emoji: '🐱' },
      { id: 'zh-gou3',   text: '狗', phonemeIds: ['zh-gou3'],   meaning: 'dog',      emoji: '🐕' },
      { id: 'zh-yu2',    text: '鱼', phonemeIds: ['zh-yu2'],    meaning: 'fish',     emoji: '🐟' },
      { id: 'zh-niao3',  text: '鸟', phonemeIds: ['zh-niao3'],  meaning: 'bird',     emoji: '🐦' },
      { id: 'zh-ma3',    text: '马', phonemeIds: ['zh-ma3'],    meaning: 'horse',    emoji: '🐴' },
      { id: 'zh-niu2',   text: '牛', phonemeIds: ['zh-niu2'],   meaning: 'cow',      emoji: '🐄' },
      { id: 'zh-hu3',    text: '虎', phonemeIds: ['zh-hu3'],    meaning: 'tiger',    emoji: '🐯' },
      { id: 'zh-shi1',   text: '狮', phonemeIds: ['zh-shi1'],   meaning: 'lion',     emoji: '🦁' },
      { id: 'zh-xiong2', text: '熊', phonemeIds: ['zh-xiong2'], meaning: 'bear',     emoji: '🐻' },
      { id: 'zh-long2',  text: '龙', phonemeIds: ['zh-long2'],  meaning: 'dragon',   emoji: '🐉' },
      { id: 'zh-tu4',    text: '兔', phonemeIds: ['zh-tu4'],    meaning: 'rabbit',   emoji: '🐰' },
      { id: 'zh-xiang4', text: '象', phonemeIds: ['zh-xiang4'], meaning: 'elephant', emoji: '🐘' },
    ],
  },
  {
    phase: 3,
    name: '看图识动物',  // Picture Match — All Animals
    gameMode: 'picture-match',
    newPhonemeIds: [],
    words: [
      { id: 'zh-mao1',   text: '猫', phonemeIds: ['zh-mao1'],   meaning: 'cat',      emoji: '🐱' },
      { id: 'zh-gou3',   text: '狗', phonemeIds: ['zh-gou3'],   meaning: 'dog',      emoji: '🐕' },
      { id: 'zh-yu2',    text: '鱼', phonemeIds: ['zh-yu2'],    meaning: 'fish',     emoji: '🐟' },
      { id: 'zh-ma3',    text: '马', phonemeIds: ['zh-ma3'],    meaning: 'horse',    emoji: '🐴' },
      { id: 'zh-zhu1',   text: '猪', phonemeIds: ['zh-zhu1'],   meaning: 'pig',      emoji: '🐷' },
      { id: 'zh-yang2',  text: '羊', phonemeIds: ['zh-yang2'],  meaning: 'sheep',    emoji: '🐑' },
      { id: 'zh-hu3',    text: '虎', phonemeIds: ['zh-hu3'],    meaning: 'tiger',    emoji: '🐯' },
      { id: 'zh-shi1',   text: '狮', phonemeIds: ['zh-shi1'],   meaning: 'lion',     emoji: '🦁' },
      { id: 'zh-hou2',   text: '猴', phonemeIds: ['zh-hou2'],   meaning: 'monkey',   emoji: '🐵' },
      { id: 'zh-she2',   text: '蛇', phonemeIds: ['zh-she2'],   meaning: 'snake',    emoji: '🐍' },
      { id: 'zh-xiang4', text: '象', phonemeIds: ['zh-xiang4'], meaning: 'elephant', emoji: '🐘' },
      { id: 'zh-ya1',    text: '鸭', phonemeIds: ['zh-ya1'],    meaning: 'duck',     emoji: '🦆' },
    ],
  },
  {
    phase: 4,
    name: '组合动物词',  // Compound Animal Words
    gameMode: 'compound',
    newPhonemeIds: [],
    words: [
      { id: 'zh-xiaogou',  text: '小狗', phonemeIds: ['zh-xiao3', 'zh-gou3'],   meaning: 'puppy',          emoji: '🐶' },
      { id: 'zh-xiaomao',  text: '小猫', phonemeIds: ['zh-xiao3', 'zh-mao1'],   meaning: 'kitten',         emoji: '🐱', image: '/images/zh-transparent/animals/kitten.png' },
      { id: 'zh-xiaoniao', text: '小鸟', phonemeIds: ['zh-xiao3', 'zh-niao3'],  meaning: 'little bird',    emoji: '🐤' },
      { id: 'zh-shuiniu',  text: '水牛', phonemeIds: ['zh-shui3', 'zh-niu2'],   meaning: 'water buffalo',  emoji: '🐃' },
      { id: 'zh-huolong',  text: '火龙', phonemeIds: ['zh-huo3', 'zh-long2'],   meaning: 'fire dragon',    emoji: '🐲' },
      { id: 'zh-daxiang',  text: '大象', phonemeIds: ['zh-da4', 'zh-xiang4'],   meaning: 'elephant',       emoji: '🐘' },
      { id: 'zh-xiongmao', text: '熊猫', phonemeIds: ['zh-xiong2', 'zh-mao1'],  meaning: 'panda',          emoji: '🐼', image: '/images/zh-transparent/animals/panda.png' },
      { id: 'zh-xiaotu',    text: '小兔', phonemeIds: ['zh-xiao3', 'zh-tu4'],   meaning: 'bunny',          emoji: '🐇' },
      { id: 'zh-konglong',  text: '恐龙', phonemeIds: ['zh-kong3', 'zh-long2'], meaning: 'dinosaur',       emoji: '🦕', image: '/images/zh-transparent/animals/dinosaur.png' },
    ],
  },
  {
    phase: 5,
    name: '更多动物',  // Listen & Match — More Animals
    gameMode: 'listen-match',
    newPhonemeIds: ['zh-shi1', 'zh-hou2', 'zh-xiong2', 'zh-tu4', 'zh-she2', 'zh-hu3', 'zh-xiang4', 'zh-e2', 'zh-ya1'],
    words: [
      { id: 'zh-shi1',   text: '狮', phonemeIds: ['zh-shi1'],   meaning: 'lion',     emoji: '🦁' },
      { id: 'zh-hou2',   text: '猴', phonemeIds: ['zh-hou2'],   meaning: 'monkey',   emoji: '🐵' },
      { id: 'zh-xiong2', text: '熊', phonemeIds: ['zh-xiong2'], meaning: 'bear',     emoji: '🐻' },
      { id: 'zh-tu4',    text: '兔', phonemeIds: ['zh-tu4'],    meaning: 'rabbit',   emoji: '🐰' },
      { id: 'zh-she2',   text: '蛇', phonemeIds: ['zh-she2'],   meaning: 'snake',    emoji: '🐍' },
      { id: 'zh-hu3',    text: '虎', phonemeIds: ['zh-hu3'],    meaning: 'tiger',    emoji: '🐯' },
      { id: 'zh-xiang4', text: '象', phonemeIds: ['zh-xiang4'], meaning: 'elephant', emoji: '🐘' },
      { id: 'zh-e2',     text: '鹅', phonemeIds: ['zh-e2'],     meaning: 'goose',    emoji: '🪿' },
      { id: 'zh-ya1',    text: '鸭', phonemeIds: ['zh-ya1'],    meaning: 'duck',     emoji: '🦆' },
    ],
  },
]
