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
      { id: 'zh-nan2',  text: '男', phonemeIds: ['zh-nan2'],  meaning: 'boy' },
      { id: 'zh-nv3',   text: '女', phonemeIds: ['zh-nv3'],   meaning: 'girl' },
      { id: 'zh-hai2',  text: '孩', phonemeIds: ['zh-hai2'],  meaning: 'child', image: '/images/zh-transparent/objects/baby.png' },
      { id: 'zh-jia1',  text: '家', phonemeIds: ['zh-jia1'],  meaning: 'house' },
      { id: 'zh-che1',  text: '车', phonemeIds: ['zh-che1'],  meaning: 'car' },
      { id: 'zh-fei1',  text: '飞', phonemeIds: ['zh-fei1'],  meaning: 'airplane' },
      { id: 'zh-dian4', text: '电', phonemeIds: ['zh-dian4'], meaning: 'lightning' },
      { id: 'zh-hua1',  text: '花', phonemeIds: ['zh-hua1'],  meaning: 'flower' },
      { id: 'zh-xing1', text: '星', phonemeIds: ['zh-xing1'], meaning: 'star' },
      { id: 'zh-tian1', text: '天', phonemeIds: ['zh-tian1'], meaning: 'sky' },
      { id: 'zh-di4',   text: '地', phonemeIds: ['zh-di4'],   meaning: 'earth' },
    ],
  },
  {
    phase: 2,
    name: '名词记忆',  // Recall Nouns
    gameMode: 'recall',
    newPhonemeIds: [],
    words: [
      { id: 'zh-nan2',  text: '男', phonemeIds: ['zh-nan2'],  meaning: 'boy' },
      { id: 'zh-nv3',   text: '女', phonemeIds: ['zh-nv3'],   meaning: 'girl' },
      { id: 'zh-hai2',  text: '孩', phonemeIds: ['zh-hai2'],  meaning: 'child', image: '/images/zh-transparent/objects/baby.png' },
      { id: 'zh-jia1',  text: '家', phonemeIds: ['zh-jia1'],  meaning: 'house' },
      { id: 'zh-che1',  text: '车', phonemeIds: ['zh-che1'],  meaning: 'car' },
      { id: 'zh-fei1',  text: '飞', phonemeIds: ['zh-fei1'],  meaning: 'airplane' },
      { id: 'zh-dian4', text: '电', phonemeIds: ['zh-dian4'], meaning: 'lightning' },
      { id: 'zh-hua1',  text: '花', phonemeIds: ['zh-hua1'],  meaning: 'flower' },
      { id: 'zh-xing1', text: '星', phonemeIds: ['zh-xing1'], meaning: 'star' },
      { id: 'zh-tian1', text: '天', phonemeIds: ['zh-tian1'], meaning: 'sky' },
      { id: 'zh-di4',   text: '地', phonemeIds: ['zh-di4'],   meaning: 'earth' },
    ],
  },
  {
    phase: 3,
    name: '看图识词',  // Picture Match Nouns
    gameMode: 'picture-match',
    newPhonemeIds: [],
    words: [
      { id: 'zh-nan2',  text: '男', phonemeIds: ['zh-nan2'],  meaning: 'boy' },
      { id: 'zh-nv3',   text: '女', phonemeIds: ['zh-nv3'],   meaning: 'girl' },
      { id: 'zh-jia1',  text: '家', phonemeIds: ['zh-jia1'],  meaning: 'house' },
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
    newPhonemeIds: ['zh-bao3', 'zh-xue2', 'zh-xiao4', 'zh-ji1n', 'zh-shi4', 'zh-jing3', 'zh-ba1n', 'zh-shi4n', 'zh-jiu4', 'zh-hu4', 'zh-xiao1', 'zh-fang2', 'zh-ji4', 'zh-cheng2', 'zh-qi4', 'zh-juan3', 'zh-feng1', 'zh-xuan2', 'zh-wo1', 'zh-zu2', 'zh-qiu2', 'zh-tai4', 'zh-yang2n', 'zh-xi4', 'zh-lun2', 'zh-chuan2', 'zh-dan4', 'zh-gao1', 'zh-bo1', 'zh-luo2', 'zh-xi1', 'zh-gua1', 'zh-nan2b', 'zh-xiang1', 'zh-jiao1', 'zh-shu1', 'zh-cai4', 'zh-qie2', 'zh-zi3b'],
    words: [
      { id: 'zh-nanhai',  text: '男孩', phonemeIds: ['zh-nan2', 'zh-hai2'],  meaning: 'boy',        emoji: '👦', image: '/images/zh-transparent/objects/boy.png' },
      { id: 'zh-nvhai',   text: '女孩', phonemeIds: ['zh-nv3', 'zh-hai2'],   meaning: 'girl',       emoji: '👧', image: '/images/zh-transparent/objects/girl.png' },
      { id: 'zh-baobao',  text: '宝宝', phonemeIds: ['zh-bao3', 'zh-bao3'],  meaning: 'baby',       emoji: '👶', image: '/images/zh-transparent/objects/baby.png' },
      { id: 'zh-xuexiao', text: '学校', phonemeIds: ['zh-xue2', 'zh-xiao4'], meaning: 'school',     emoji: '🏫', image: '/images/zh-transparent/objects/school.png' },
      { id: 'zh-feiji',   text: '飞机', phonemeIds: ['zh-fei1', 'zh-ji1n'],  meaning: 'airplane',   emoji: '✈️', image: '/images/zh-transparent/objects/plane.png' },
      { id: 'zh-dianshi', text: '电视', phonemeIds: ['zh-dian4', 'zh-shi4'], meaning: 'television', emoji: '📺', image: '/images/zh-transparent/objects/television.png' },
      { id: 'zh-huoche',  text: '火车', phonemeIds: ['zh-huo3', 'zh-che1'],  meaning: 'train',      emoji: '🚂', image: '/images/zh-transparent/objects/train.png' },
      { id: 'zh-xiaoche', text: '校车', phonemeIds: ['zh-xiao4', 'zh-che1'], meaning: 'school bus', emoji: '🚌', image: '/images/zh-transparent/objects/schoolbus.png' },
      { id: 'zh-jingche', text: '警车', phonemeIds: ['zh-jing3', 'zh-che1'], meaning: 'police car', emoji: '🚔', image: '/images/zh-transparent/objects/policecar.png' },
      { id: 'zh-bashi-bus',   text: '巴士', phonemeIds: ['zh-ba1n', 'zh-shi4n'], meaning: 'bus',        emoji: '🚌', image: '/images/zh-transparent/objects/bus.png' },
      // 3-character compound words
      { id: 'zh-jiuhuche',  text: '救护车', phonemeIds: ['zh-jiu4', 'zh-hu4', 'zh-che1'],   meaning: 'ambulance',   emoji: '🚑', image: '/images/zh-transparent/objects/ambulance.png' },
      { id: 'zh-xiaofangche', text: '消防车', phonemeIds: ['zh-xiao1', 'zh-fang2', 'zh-che1'], meaning: 'fire truck', emoji: '🚒', image: '/images/zh-transparent/objects/firetruck.png' },
      { id: 'zh-jichengche', text: '计程车', phonemeIds: ['zh-ji4', 'zh-cheng2', 'zh-che1'],  meaning: 'taxi',        emoji: '🚕', image: '/images/zh-transparent/objects/taxi.png' },
      { id: 'zh-longjuanfeng', text: '龙卷风', phonemeIds: ['zh-long2', 'zh-juan3', 'zh-feng1'], meaning: 'tornado',   emoji: '🌪️', image: '/images/zh-transparent/objects/tornado.png' },
      { id: 'zh-xuanwo',  text: '漩涡', phonemeIds: ['zh-xuan2', 'zh-wo1'],  meaning: 'whirlpool', emoji: '🌀', image: '/images/zh-transparent/objects/whirlpool.png' },
      { id: 'zh-zuqiu',  text: '足球', phonemeIds: ['zh-zu2', 'zh-qiu2'],  meaning: 'soccer ball', emoji: '⚽', image: '/images/zh-transparent/objects/soccerball.png' },
      { id: 'zh-taiyangxi', text: '太阳系', phonemeIds: ['zh-tai4', 'zh-yang2n', 'zh-xi4'], meaning: 'solar system', emoji: '🪐', image: '/images/zh-transparent/objects/solarsystem.png' },
      { id: 'zh-lunchuan', text: '轮船', phonemeIds: ['zh-lun2', 'zh-chuan2'], meaning: 'ship',        emoji: '🚢', image: '/images/zh-transparent/objects/ship.png' },
      { id: 'zh-dangao',   text: '蛋糕', phonemeIds: ['zh-dan4', 'zh-gao1'],   meaning: 'cake',        emoji: '🎂', image: '/images/zh-transparent/objects/cake.png' },
      { id: 'zh-boluo',    text: '菠萝', phonemeIds: ['zh-bo1', 'zh-luo2'],   meaning: 'pineapple',   emoji: '🍍', image: '/images/zh-transparent/objects/pineapple.png' },
      { id: 'zh-xigua',    text: '西瓜', phonemeIds: ['zh-xi1', 'zh-gua1'],   meaning: 'watermelon',  emoji: '🍉', image: '/images/zh-transparent/objects/watermelon.png' },
      { id: 'zh-nangua',   text: '南瓜', phonemeIds: ['zh-nan2b', 'zh-gua1'], meaning: 'pumpkin',     emoji: '🎃', image: '/images/zh-transparent/objects/pumpkin.png' },
      { id: 'zh-xiangjiao', text: '香蕉', phonemeIds: ['zh-xiang1', 'zh-jiao1'], meaning: 'banana',    emoji: '🍌', image: '/images/zh-transparent/objects/bananas.png' },
      { id: 'zh-shucai',  text: '蔬菜', phonemeIds: ['zh-shu1', 'zh-cai4'],  meaning: 'vegetables',  emoji: '🥬', image: '/images/zh-transparent/objects/vegetables.png' },
      { id: 'zh-qiezi',   text: '茄子', phonemeIds: ['zh-qie2', 'zh-zi3b'], meaning: 'eggplant',    emoji: '🍆', image: '/images/zh-transparent/objects/eggplant.png' },
    ],
  },
  {
    phase: 5,
    name: '听词辨字',  // Listen & Match Nouns
    gameMode: 'listen-match',
    newPhonemeIds: [],
    words: [
      { id: 'zh-nan2',  text: '男', phonemeIds: ['zh-nan2'],  meaning: 'boy' },
      { id: 'zh-nv3',   text: '女', phonemeIds: ['zh-nv3'],   meaning: 'girl' },
      { id: 'zh-hai2',  text: '孩', phonemeIds: ['zh-hai2'],  meaning: 'child', image: '/images/zh-transparent/objects/baby.png' },
      { id: 'zh-jia1',  text: '家', phonemeIds: ['zh-jia1'],  meaning: 'house' },
      { id: 'zh-che1',  text: '车', phonemeIds: ['zh-che1'],  meaning: 'car' },
      { id: 'zh-fei1',  text: '飞', phonemeIds: ['zh-fei1'],  meaning: 'airplane' },
      { id: 'zh-dian4', text: '电', phonemeIds: ['zh-dian4'], meaning: 'lightning' },
      { id: 'zh-hua1',  text: '花', phonemeIds: ['zh-hua1'],  meaning: 'flower' },
      { id: 'zh-xing1', text: '星', phonemeIds: ['zh-xing1'], meaning: 'star' },
    ],
  },
]
