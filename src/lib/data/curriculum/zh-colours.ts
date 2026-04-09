import type { CurriculumPhase } from './types'

/**
 * Mandarin Colours & Shapes curriculum — separate track
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
    name: '组合颜色形状',  // Compound Colour & Shape Words
    gameMode: 'compound',
    newPhonemeIds: ['zh-yuan2', 'zh-xing2', 'zh-zheng4', 'zh-fang1', 'zh-jiao3', 'zh-chang2', 'zh-bian1', 'zh-ling2', 'zh-xin1'],
    words: [
      // Colour compounds
      { id: 'zh-baima',    text: '白马', phonemeIds: ['zh-bai2', 'zh-ma3'],    meaning: 'white horse',   emoji: '🦄', image: '/images/zh-transparent/animals/whitehorse.png' },
      { id: 'zh-jinyu',    text: '金鱼', phonemeIds: ['zh-jin1', 'zh-yu2'],    meaning: 'goldfish',      emoji: '🐠', image: '/images/zh-transparent/animals/goldfish.png' },
      { id: 'zh-honglong', text: '红龙', phonemeIds: ['zh-hong2', 'zh-long2'], meaning: 'red dragon',    emoji: '🐲', image: '/images/zh-transparent/animals/reddragon.png' },
      // Shape compounds
      { id: 'zh-yuanxing',     text: '圆形',   phonemeIds: ['zh-yuan2', 'zh-xing2'],                meaning: 'circle',    emoji: '⭕', image: '/images/zh-transparent/objects/circle.png' },
      { id: 'zh-zhengfangxing',text: '正方形', phonemeIds: ['zh-zheng4', 'zh-fang1', 'zh-xing2'],   meaning: 'square',    emoji: '🟧', image: '/images/zh-transparent/objects/square.png' },
      { id: 'zh-sanjiaoxing',  text: '三角形', phonemeIds: ['zh-san1', 'zh-jiao3', 'zh-xing2'],     meaning: 'triangle',  emoji: '🔺', image: '/images/zh-transparent/objects/triangle.png' },
      { id: 'zh-changfangxing',text: '长方形', phonemeIds: ['zh-chang2', 'zh-fang1', 'zh-xing2'],   meaning: 'rectangle', emoji: '🟦', image: '/images/zh-transparent/objects/rectangle.png' },
      { id: 'zh-wubianxing',   text: '五边形', phonemeIds: ['zh-wu3', 'zh-bian1', 'zh-xing2'],      meaning: 'pentagon',  emoji: '⬠', image: '/images/zh-transparent/objects/pentagon.png' },
      { id: 'zh-liubianxing',  text: '六边形', phonemeIds: ['zh-liu4', 'zh-bian1', 'zh-xing2'],     meaning: 'hexagon',   emoji: '⬡', image: '/images/zh-transparent/objects/hexagon.png' },
      { id: 'zh-lingxing',     text: '菱形',   phonemeIds: ['zh-ling2', 'zh-xing2'],                meaning: 'diamond',   emoji: '💎', image: '/images/zh-transparent/objects/diamond.png' },
      { id: 'zh-xinxing',      text: '心形',   phonemeIds: ['zh-xin1', 'zh-xing2'],                 meaning: 'heart',     emoji: '❤️', image: '/images/zh-transparent/objects/heart.png' },
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
