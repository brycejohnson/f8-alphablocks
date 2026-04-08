import type { CurriculumPhase } from './types'

/**
 * Mandarin Colours curriculum — separate track
 */

export const zhColoursCurriculum: CurriculumPhase[] = [
  {
    phase: 1,
    name: '认识颜色',  // Reveal & Learn Colours
    gameMode: 'reveal',
    newPhonemeIds: ['zh-hong2', 'zh-lan2', 'zh-lv4', 'zh-huang2'],
    words: [
      { id: 'zh-hong2',  text: '红', phonemeIds: ['zh-hong2'],  meaning: 'red',    emoji: '🔴' },
      { id: 'zh-lan2',   text: '蓝', phonemeIds: ['zh-lan2'],   meaning: 'blue',   emoji: '🔵' },
      { id: 'zh-lv4',    text: '绿', phonemeIds: ['zh-lv4'],    meaning: 'green',  emoji: '🟢' },
      { id: 'zh-huang2', text: '黄', phonemeIds: ['zh-huang2'], meaning: 'yellow', emoji: '🟡' },
    ],
  },
  {
    phase: 2,
    name: '颜色记忆',  // Recall Colours
    gameMode: 'recall',
    newPhonemeIds: [],
    words: [
      { id: 'zh-hong2',  text: '红', phonemeIds: ['zh-hong2'],  meaning: 'red',    emoji: '🔴' },
      { id: 'zh-lan2',   text: '蓝', phonemeIds: ['zh-lan2'],   meaning: 'blue',   emoji: '🔵' },
      { id: 'zh-lv4',    text: '绿', phonemeIds: ['zh-lv4'],    meaning: 'green',  emoji: '🟢' },
      { id: 'zh-huang2', text: '黄', phonemeIds: ['zh-huang2'], meaning: 'yellow', emoji: '🟡' },
      { id: 'zh-bai2',   text: '白', phonemeIds: ['zh-bai2'],   meaning: 'white',  emoji: '⬜' },
      { id: 'zh-hei1',   text: '黑', phonemeIds: ['zh-hei1'],   meaning: 'black',  emoji: '⬛' },
      { id: 'zh-fen3',   text: '粉', phonemeIds: ['zh-fen3'],   meaning: 'pink',   emoji: '🩷' },
      { id: 'zh-zi3',    text: '紫', phonemeIds: ['zh-zi3'],    meaning: 'purple', emoji: '🟣' },
    ],
  },
  {
    phase: 3,
    name: '看图识颜色',  // Picture Match Colours
    gameMode: 'picture-match',
    newPhonemeIds: [],
    words: [
      { id: 'zh-hong2',  text: '红', phonemeIds: ['zh-hong2'],  meaning: 'red',    emoji: '🔴' },
      { id: 'zh-lan2',   text: '蓝', phonemeIds: ['zh-lan2'],   meaning: 'blue',   emoji: '🔵' },
      { id: 'zh-lv4',    text: '绿', phonemeIds: ['zh-lv4'],    meaning: 'green',  emoji: '🟢' },
      { id: 'zh-huang2', text: '黄', phonemeIds: ['zh-huang2'], meaning: 'yellow', emoji: '🟡' },
      { id: 'zh-bai2',   text: '白', phonemeIds: ['zh-bai2'],   meaning: 'white',  emoji: '⬜' },
      { id: 'zh-hei1',   text: '黑', phonemeIds: ['zh-hei1'],   meaning: 'black',  emoji: '⬛' },
      { id: 'zh-fen3',   text: '粉', phonemeIds: ['zh-fen3'],   meaning: 'pink',   emoji: '🩷' },
      { id: 'zh-zi3',    text: '紫', phonemeIds: ['zh-zi3'],    meaning: 'purple', emoji: '🟣' },
    ],
  },
  {
    phase: 4,
    name: '组合颜色词',  // Compound Colour Words
    gameMode: 'compound',
    newPhonemeIds: [],
    words: [
      { id: 'zh-lvshan',   text: '绿山', phonemeIds: ['zh-lv4', 'zh-shan1'],   meaning: 'green mountain', emoji: '🌄' },
      { id: 'zh-huangniu', text: '黄牛', phonemeIds: ['zh-huang2', 'zh-niu2'], meaning: 'yellow cow',    emoji: '' },
      { id: 'zh-baima',    text: '白马', phonemeIds: ['zh-bai2', 'zh-ma3'],    meaning: 'white horse',   emoji: '🦄', image: '/images/zh-transparent/animals/whitehorse.png' },
      { id: 'zh-jinyu',    text: '金鱼', phonemeIds: ['zh-jin1', 'zh-yu2'],    meaning: 'goldfish',      emoji: '🐠', image: '/images/zh-transparent/animals/goldfish.png' },
      { id: 'zh-honglong', text: '红龙', phonemeIds: ['zh-hong2', 'zh-long2'], meaning: 'red dragon',    emoji: '🐲', image: '/images/zh-transparent/animals/reddragon.png' },
    ],
  },
  {
    phase: 5,
    name: '听音辨颜色',  // Listen & Match Colours
    gameMode: 'listen-match',
    newPhonemeIds: ['zh-bai2', 'zh-hei1', 'zh-fen3', 'zh-zi3'],
    words: [
      { id: 'zh-bai2', text: '白', phonemeIds: ['zh-bai2'], meaning: 'white',  emoji: '⬜' },
      { id: 'zh-hei1', text: '黑', phonemeIds: ['zh-hei1'], meaning: 'black',  emoji: '⬛' },
      { id: 'zh-fen3', text: '粉', phonemeIds: ['zh-fen3'], meaning: 'pink',   emoji: '🩷' },
      { id: 'zh-zi3',  text: '紫', phonemeIds: ['zh-zi3'],  meaning: 'purple', emoji: '🟣' },
    ],
  },
]
