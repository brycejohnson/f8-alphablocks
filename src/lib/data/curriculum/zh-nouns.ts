import type { CurriculumPhase } from './types'

/**
 * Mandarin Nouns curriculum — People, Places, Things
 *
 * Phase order: reveal, recall, picture-match, compound, listen-match
 */

export const zhNounsCurriculum: CurriculumPhase[] = [
  {
    phase: 1,
    name: '认识名词',  // Reveal & Learn Nouns
    gameMode: 'reveal',
    newPhonemeIds: ['zh-nan2', 'zh-nv3', 'zh-hai2', 'zh-jia1', 'zh-che1', 'zh-fei1', 'zh-dian4', 'zh-hua1', 'zh-xing1', 'zh-tian1', 'zh-di4'],
    words: [
      { id: 'zh-nan2',  text: '男', phonemeIds: ['zh-nan2'],  meaning: 'male' },
      { id: 'zh-nv3',   text: '女', phonemeIds: ['zh-nv3'],   meaning: 'female' },
      { id: 'zh-hai2',  text: '孩', phonemeIds: ['zh-hai2'],  meaning: 'child' },
      { id: 'zh-jia1',  text: '家', phonemeIds: ['zh-jia1'],  meaning: 'home' },
      { id: 'zh-che1',  text: '车', phonemeIds: ['zh-che1'],  meaning: 'car' },
      { id: 'zh-fei1',  text: '飞', phonemeIds: ['zh-fei1'],  meaning: 'fly' },
      { id: 'zh-dian4', text: '电', phonemeIds: ['zh-dian4'], meaning: 'electric' },
      { id: 'zh-hua1',  text: '花', phonemeIds: ['zh-hua1'],  meaning: 'flower' },
      { id: 'zh-xing1', text: '星', phonemeIds: ['zh-xing1'], meaning: 'star' },
      { id: 'zh-tian1', text: '天', phonemeIds: ['zh-tian1'], meaning: 'sky' },
      { id: 'zh-di4',   text: '地', phonemeIds: ['zh-di4'],   meaning: 'ground' },
    ],
  },
  {
    phase: 2,
    name: '名词记忆',  // Recall Nouns
    gameMode: 'recall',
    newPhonemeIds: [],
    words: [
      { id: 'zh-nan2',  text: '男', phonemeIds: ['zh-nan2'],  meaning: 'male' },
      { id: 'zh-nv3',   text: '女', phonemeIds: ['zh-nv3'],   meaning: 'female' },
      { id: 'zh-hai2',  text: '孩', phonemeIds: ['zh-hai2'],  meaning: 'child' },
      { id: 'zh-jia1',  text: '家', phonemeIds: ['zh-jia1'],  meaning: 'home' },
      { id: 'zh-che1',  text: '车', phonemeIds: ['zh-che1'],  meaning: 'car' },
      { id: 'zh-fei1',  text: '飞', phonemeIds: ['zh-fei1'],  meaning: 'fly' },
      { id: 'zh-dian4', text: '电', phonemeIds: ['zh-dian4'], meaning: 'electric' },
      { id: 'zh-hua1',  text: '花', phonemeIds: ['zh-hua1'],  meaning: 'flower' },
      { id: 'zh-xing1', text: '星', phonemeIds: ['zh-xing1'], meaning: 'star' },
      { id: 'zh-tian1', text: '天', phonemeIds: ['zh-tian1'], meaning: 'sky' },
      { id: 'zh-di4',   text: '地', phonemeIds: ['zh-di4'],   meaning: 'ground' },
    ],
  },
  {
    phase: 3,
    name: '看图识词',  // Picture Match Nouns
    gameMode: 'picture-match',
    newPhonemeIds: [],
    words: [
      { id: 'zh-nan2',  text: '男', phonemeIds: ['zh-nan2'],  meaning: 'male' },
      { id: 'zh-nv3',   text: '女', phonemeIds: ['zh-nv3'],   meaning: 'female' },
      { id: 'zh-jia1',  text: '家', phonemeIds: ['zh-jia1'],  meaning: 'home' },
      { id: 'zh-che1',  text: '车', phonemeIds: ['zh-che1'],  meaning: 'car' },
      { id: 'zh-hua1',  text: '花', phonemeIds: ['zh-hua1'],  meaning: 'flower' },
      { id: 'zh-xing1', text: '星', phonemeIds: ['zh-xing1'], meaning: 'star' },
      { id: 'zh-tian1', text: '天', phonemeIds: ['zh-tian1'], meaning: 'sky' },
    ],
  },
  {
    phase: 4,
    name: '组合名词',  // Compound Nouns
    gameMode: 'compound',
    newPhonemeIds: ['zh-bao3', 'zh-xue2', 'zh-xiao4', 'zh-ji1n', 'zh-shi4', 'zh-jing3', 'zh-ba1n', 'zh-shi4n', 'zh-jiu4', 'zh-hu4', 'zh-xiao1', 'zh-fang2', 'zh-chu1', 'zh-zu1', 'zh-qi4'],
    words: [
      { id: 'zh-nanhai',  text: '男孩', phonemeIds: ['zh-nan2', 'zh-hai2'],  meaning: 'boy',        emoji: '👦' },
      { id: 'zh-nvhai',   text: '女孩', phonemeIds: ['zh-nv3', 'zh-hai2'],   meaning: 'girl',       emoji: '👧' },
      { id: 'zh-baobao',  text: '宝宝', phonemeIds: ['zh-bao3', 'zh-bao3'],  meaning: 'baby',       emoji: '👶' },
      { id: 'zh-xuexiao', text: '学校', phonemeIds: ['zh-xue2', 'zh-xiao4'], meaning: 'school',     emoji: '🏫', image: '/images/zh-transparent/objects/school.png' },
      { id: 'zh-feiji',   text: '飞机', phonemeIds: ['zh-fei1', 'zh-ji1n'],  meaning: 'airplane',   emoji: '✈️', image: '/images/zh-transparent/objects/plane.png' },
      { id: 'zh-dianshi', text: '电视', phonemeIds: ['zh-dian4', 'zh-shi4'], meaning: 'television', emoji: '📺', image: '/images/zh-transparent/objects/television.png' },
      { id: 'zh-huoche',  text: '火车', phonemeIds: ['zh-huo3', 'zh-che1'],  meaning: 'train',      emoji: '🚂' },
      { id: 'zh-xiaoche', text: '校车', phonemeIds: ['zh-xiao4', 'zh-che1'], meaning: 'school bus', emoji: '🚌', image: '/images/zh-transparent/objects/schoolbus.png' },
      { id: 'zh-jingche', text: '警车', phonemeIds: ['zh-jing3', 'zh-che1'], meaning: 'police car', emoji: '🚔', image: '/images/zh-transparent/objects/policecar.png' },
      { id: 'zh-bashi-bus',   text: '巴士', phonemeIds: ['zh-ba1n', 'zh-shi4n'], meaning: 'bus',        emoji: '🚌', image: '/images/zh-transparent/objects/bus.png' },
      // 3-character compound words
      { id: 'zh-jiuhuche',  text: '救护车', phonemeIds: ['zh-jiu4', 'zh-hu4', 'zh-che1'],   meaning: 'ambulance',   emoji: '🚑', image: '/images/zh-transparent/objects/ambulance.png' },
      { id: 'zh-xiaofangche', text: '消防车', phonemeIds: ['zh-xiao1', 'zh-fang2', 'zh-che1'], meaning: 'fire truck', emoji: '🚒', image: '/images/zh-transparent/objects/firetruck.png' },
      { id: 'zh-chuzuche', text: '出租车', phonemeIds: ['zh-chu1', 'zh-zu1', 'zh-che1'],    meaning: 'taxi',        emoji: '🚕' },
      { id: 'zh-daxue',   text: '大学', phonemeIds: ['zh-da4', 'zh-xue2'],   meaning: 'university', emoji: '🎓' },
      { id: 'zh-tiandi',  text: '天地', phonemeIds: ['zh-tian1', 'zh-di4'],  meaning: 'heaven & earth', emoji: '🌏' },
      { id: 'zh-huohua',  text: '火花', phonemeIds: ['zh-huo3', 'zh-hua1'],  meaning: 'spark',      emoji: '✨' },
      { id: 'zh-mingxing',text: '明星', phonemeIds: ['zh-ri4', 'zh-xing1'],  meaning: 'star/celebrity', emoji: '🌟' },
    ],
  },
  {
    phase: 5,
    name: '听词辨字',  // Listen & Match Nouns
    gameMode: 'listen-match',
    newPhonemeIds: [],
    words: [
      { id: 'zh-nan2',  text: '男', phonemeIds: ['zh-nan2'],  meaning: 'male' },
      { id: 'zh-nv3',   text: '女', phonemeIds: ['zh-nv3'],   meaning: 'female' },
      { id: 'zh-hai2',  text: '孩', phonemeIds: ['zh-hai2'],  meaning: 'child' },
      { id: 'zh-jia1',  text: '家', phonemeIds: ['zh-jia1'],  meaning: 'home' },
      { id: 'zh-che1',  text: '车', phonemeIds: ['zh-che1'],  meaning: 'car' },
      { id: 'zh-fei1',  text: '飞', phonemeIds: ['zh-fei1'],  meaning: 'fly' },
      { id: 'zh-dian4', text: '电', phonemeIds: ['zh-dian4'], meaning: 'electric' },
      { id: 'zh-hua1',  text: '花', phonemeIds: ['zh-hua1'],  meaning: 'flower' },
      { id: 'zh-xing1', text: '星', phonemeIds: ['zh-xing1'], meaning: 'star' },
    ],
  },
]
