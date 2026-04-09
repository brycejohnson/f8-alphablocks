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
  { id: 'zh-huo3',  symbol: '火', ipa: 'huǒ',  colour: '#E53935', audioFile: 'zh-huo3.m4a',  meaning: 'fire',     emoji: '🔥', image: '/images/zh-transparent/objects/fire.png' },
  { id: 'zh-shan1', symbol: '山', ipa: 'shān',  colour: '#2E7D32', audioFile: 'zh-shan1.m4a', meaning: 'mountain', emoji: '⛰️', image: '/images/zh-transparent/objects/mountain.png' },
  { id: 'zh-shui3', symbol: '水', ipa: 'shuǐ',  colour: '#1565C0', audioFile: 'zh-shui3.m4a', meaning: 'water',    emoji: '💧', image: '/images/zh-transparent/objects/water.png' },
  { id: 'zh-da4',   symbol: '大', ipa: 'dà',    colour: '#B71C1C', audioFile: 'zh-da4.m4a',   meaning: 'big',      emoji: '' },
  { id: 'zh-xiao3', symbol: '小', ipa: 'xiǎo',  colour: '#42A5F5', audioFile: 'zh-xiao3.m4a', meaning: 'small',    emoji: '' },
  { id: 'zh-ren2',  symbol: '人', ipa: 'rén',   colour: '#6D4C41', audioFile: 'zh-ren2.m4a',  meaning: 'person',   emoji: '🧑', image: '/images/zh-transparent/objects/boy.png' },
  { id: 'zh-ri4',   symbol: '日', ipa: 'rì',    colour: '#F9A825', audioFile: 'zh-ri4.m4a',   meaning: 'sun',      emoji: '☀️', image: '/images/zh-transparent/objects/sun.png' },
  { id: 'zh-yue4',  symbol: '月', ipa: 'yuè',   colour: '#78909C', audioFile: 'zh-yue4.m4a',  meaning: 'moon',     emoji: '🌙', image: '/images/zh-transparent/objects/moon.png' },
  { id: 'zh-mu4',   symbol: '木', ipa: 'mù',    colour: '#558B2F', audioFile: 'zh-mu4.m4a',   meaning: 'tree',     emoji: '🌳', image: '/images/zh-transparent/objects/tree.png' },
  { id: 'zh-guo3',  symbol: '果', ipa: 'guǒ',   colour: '#E91E63', audioFile: 'zh-guo3.m4a',  meaning: 'fruit',    emoji: '🍎', image: '/images/zh-transparent/objects/fruit.png' },
]

// Numbers 1-10
export const zhNumbers: Phoneme[] = [
  { id: 'zh-yi1',  symbol: '一', ipa: 'yī',   colour: '#1565C0', audioFile: 'zh-yi1.m4a',  meaning: 'one',   emoji: '1️⃣', image: '/images/zh-transparent/numbers/1.png' },
  { id: 'zh-er4',  symbol: '二', ipa: 'èr',   colour: '#2E7D32', audioFile: 'zh-er4.m4a',  meaning: 'two',   emoji: '2️⃣', image: '/images/zh-transparent/numbers/2.png' },
  { id: 'zh-san1', symbol: '三', ipa: 'sān',  colour: '#E65100', audioFile: 'zh-san1.m4a', meaning: 'three', emoji: '3️⃣', image: '/images/zh-transparent/numbers/3.png' },
  { id: 'zh-si4',  symbol: '四', ipa: 'sì',   colour: '#B71C1C', audioFile: 'zh-si4.m4a',  meaning: 'four',  emoji: '4️⃣', image: '/images/zh-transparent/numbers/4.png' },
  { id: 'zh-wu3',  symbol: '五', ipa: 'wǔ',   colour: '#6A1B9A', audioFile: 'zh-wu3.m4a',  meaning: 'five',  emoji: '5️⃣', image: '/images/zh-transparent/numbers/5.png' },
  { id: 'zh-liu4', symbol: '六', ipa: 'liù',  colour: '#00695C', audioFile: 'zh-liu4.m4a', meaning: 'six',   emoji: '6️⃣', image: '/images/zh-transparent/numbers/6.png' },
  { id: 'zh-qi1',  symbol: '七', ipa: 'qī',   colour: '#F57F17', audioFile: 'zh-qi1.m4a',  meaning: 'seven', emoji: '7️⃣', image: '/images/zh-transparent/numbers/7.png' },
  { id: 'zh-ba1',  symbol: '八', ipa: 'bā',   colour: '#0277BD', audioFile: 'zh-ba1.m4a',  meaning: 'eight', emoji: '8️⃣', image: '/images/zh-transparent/numbers/8.png' },
  { id: 'zh-jiu3', symbol: '九', ipa: 'jiǔ',  colour: '#AD1457', audioFile: 'zh-jiu3.m4a', meaning: 'nine',  emoji: '9️⃣', image: '/images/zh-transparent/numbers/9.png' },
  { id: 'zh-shi2', symbol: '十', ipa: 'shí',  colour: '#4E342E', audioFile: 'zh-shi2.m4a', meaning: 'ten',   emoji: '🔟', image: '/images/zh-transparent/numbers/10.png' },
]

// Animals
export const zhAnimals: Phoneme[] = [
  { id: 'zh-mao1',  symbol: '猫', ipa: 'māo',  colour: '#FF8F00', audioFile: 'zh-mao1.m4a',  meaning: 'cat',     emoji: '🐱', image: '/images/zh-transparent/animals/cat.png' },
  { id: 'zh-gou3',  symbol: '狗', ipa: 'gǒu',  colour: '#6D4C41', audioFile: 'zh-gou3.m4a',  meaning: 'dog',     emoji: '🐕', image: '/images/zh-transparent/animals/dog.png' },
  { id: 'zh-yu2',   symbol: '鱼', ipa: 'yú',   colour: '#0288D1', audioFile: 'zh-yu2.m4a',   meaning: 'fish',    emoji: '🐟', image: '/images/zh-transparent/animals/fish.png' },
  { id: 'zh-niao3', symbol: '鸟', ipa: 'niǎo', colour: '#43A047', audioFile: 'zh-niao3.m4a', meaning: 'bird',    emoji: '🐦', image: '/images/zh-transparent/animals/bird.png' },
  { id: 'zh-ma3',   symbol: '马', ipa: 'mǎ',   colour: '#5D4037', audioFile: 'zh-ma3.m4a',   meaning: 'horse',   emoji: '🐴', image: '/images/zh-transparent/animals/horse.png' },
  { id: 'zh-niu2',  symbol: '牛', ipa: 'niú',  colour: '#3E2723', audioFile: 'zh-niu2.m4a',  meaning: 'cow',     emoji: '🐄', image: '/images/zh-transparent/animals/cow.png' },
  { id: 'zh-zhu1',  symbol: '猪', ipa: 'zhū',  colour: '#F48FB1', audioFile: 'zh-zhu1.m4a',  meaning: 'pig',     emoji: '🐷', image: '/images/zh-transparent/animals/pig.png' },
  { id: 'zh-yang2', symbol: '羊', ipa: 'yáng', colour: '#BDBDBD', audioFile: 'zh-yang2.m4a', meaning: 'sheep',   emoji: '🐑', image: '/images/zh-transparent/animals/sheep.png' },
  { id: 'zh-ji1',   symbol: '鸡', ipa: 'jī',   colour: '#E65100', audioFile: 'zh-ji1.m4a',   meaning: 'chicken', emoji: '🐔', image: '/images/zh-transparent/animals/chicken.png' },
  { id: 'zh-long2', symbol: '龙', ipa: 'lóng', colour: '#C62828', audioFile: 'zh-long2.m4a', meaning: 'dragon',   emoji: '🐉', image: '/images/zh-transparent/animals/dragon.png' },
  { id: 'zh-shi1', symbol: '狮', ipa: 'shī',  colour: '#E65100', audioFile: 'zh-shi1.m4a',  meaning: 'lion',     emoji: '🦁', image: '/images/zh-transparent/animals/lion.png' },
  { id: 'zh-hou2', symbol: '猴', ipa: 'hóu',  colour: '#795548', audioFile: 'zh-hou2.m4a',  meaning: 'monkey',   emoji: '🐵', image: '/images/zh-transparent/animals/monkey.png' },
  { id: 'zh-xiong2',symbol: '熊', ipa: 'xióng',colour: '#4E342E', audioFile: 'zh-xiong2.m4a',meaning: 'bear',     emoji: '🐻', image: '/images/zh-transparent/animals/bear.png' },
  { id: 'zh-tu4',  symbol: '兔', ipa: 'tù',   colour: '#F8BBD0', audioFile: 'zh-tu4.m4a',   meaning: 'rabbit',   emoji: '🐰', image: '/images/zh-transparent/animals/rabbit.png' },
  { id: 'zh-she2', symbol: '蛇', ipa: 'shé',  colour: '#558B2F', audioFile: 'zh-she2.m4a',  meaning: 'snake',    emoji: '🐍', image: '/images/zh-transparent/animals/snake.png' },
  { id: 'zh-hu3',  symbol: '虎', ipa: 'hǔ',   colour: '#E65100', audioFile: 'zh-hu3.m4a',   meaning: 'tiger',    emoji: '🐯', image: '/images/zh-transparent/animals/tiger.png' },
  { id: 'zh-xiang4',symbol: '象', ipa: 'xiàng',colour: '#78909C', audioFile: 'zh-xiang4.m4a',meaning: 'elephant', emoji: '🐘', image: '/images/zh-transparent/animals/elephant.png' },
  { id: 'zh-e2',   symbol: '鹅', ipa: 'é',    colour: '#EEEEEE', audioFile: 'zh-e2.m4a',    meaning: 'goose',    emoji: '🪿', image: '/images/zh-transparent/animals/goose.png' },
  { id: 'zh-ya1',  symbol: '鸭', ipa: 'yā',   colour: '#43A047', audioFile: 'zh-ya1.m4a',   meaning: 'duck',     emoji: '🦆', image: '/images/zh-transparent/animals/duck.png' },
  { id: 'zh-kong3',symbol: '恐', ipa: 'kǒng', colour: '#37474F', audioFile: 'zh-kong3.m4a', meaning: '',         emoji: '' },
]

// Colours
export const zhColours: Phoneme[] = [
  { id: 'zh-hong2', symbol: '红', ipa: 'hóng',  colour: '#E53935', audioFile: 'zh-hong2.m4a', meaning: 'red',    emoji: '🔴', image: '/images/zh-transparent/colours/red.png' },
  { id: 'zh-lan2',  symbol: '蓝', ipa: 'lán',   colour: '#1565C0', audioFile: 'zh-lan2.m4a',  meaning: 'blue',   emoji: '🔵', image: '/images/zh-transparent/colours/blue.png' },
  { id: 'zh-lv4',   symbol: '绿', ipa: 'lǜ',    colour: '#2E7D32', audioFile: 'zh-lv4.m4a',   meaning: 'green',  emoji: '🟢', image: '/images/zh-transparent/colours/green.png' },
  { id: 'zh-huang2',symbol: '黄', ipa: 'huáng', colour: '#F9A825', audioFile: 'zh-huang2.m4a',meaning: 'yellow', emoji: '🟡', image: '/images/zh-transparent/colours/yellow.png' },
  { id: 'zh-bai2',  symbol: '白', ipa: 'bái',   colour: '#9E9E9E', audioFile: 'zh-bai2.m4a',  meaning: 'white',  emoji: '⬜', image: '/images/zh-transparent/colours/white.png' },
  { id: 'zh-hei1',  symbol: '黑', ipa: 'hēi',   colour: '#212121', audioFile: 'zh-hei1.m4a',  meaning: 'black',  emoji: '⬛', image: '/images/zh-transparent/colours/black.png' },
  { id: 'zh-fen3',  symbol: '粉', ipa: 'fěn',   colour: '#F06292', audioFile: 'zh-fen3.m4a',  meaning: 'pink',   emoji: '🩷', image: '/images/zh-transparent/colours/pink.png' },
  { id: 'zh-zi3',   symbol: '紫', ipa: 'zǐ',    colour: '#7B1FA2', audioFile: 'zh-zi3.m4a',   meaning: 'purple', emoji: '🟣', image: '/images/zh-transparent/colours/purple.png' },
  { id: 'zh-jin1',  symbol: '金', ipa: 'jīn',   colour: '#FFB300', audioFile: 'zh-jin1.m4a',  meaning: 'gold',   emoji: '🥇', image: '/images/zh-transparent/colours/gold.png' },
]

// Nouns: People, Places, Things
export const zhNouns: Phoneme[] = [
  // People
  { id: 'zh-nan2',  symbol: '男', ipa: 'nán',  colour: '#1565C0', audioFile: 'zh-nan2.m4a',  meaning: 'male',      emoji: '', image: '/images/zh-transparent/objects/boy.png' },
  { id: 'zh-nv3',   symbol: '女', ipa: 'nǚ',   colour: '#E91E63', audioFile: 'zh-nv3.m4a',   meaning: 'female',    emoji: '', image: '/images/zh-transparent/objects/girl.png' },
  { id: 'zh-hai2',  symbol: '孩', ipa: 'hái',  colour: '#FF8F00', audioFile: 'zh-hai2.m4a',  meaning: 'child',     emoji: '' },
  { id: 'zh-bao3',  symbol: '宝', ipa: 'bǎo',  colour: '#FFD54F', audioFile: 'zh-bao3.m4a',  meaning: 'treasure',  emoji: '' },
  // Places
  { id: 'zh-jia1',  symbol: '家', ipa: 'jiā',  colour: '#795548', audioFile: 'zh-jia1.m4a',  meaning: 'house',      emoji: '', image: '/images/zh-transparent/objects/house.png' },
  { id: 'zh-xue2',  symbol: '学', ipa: 'xué',  colour: '#4CAF50', audioFile: 'zh-xue2.m4a',  meaning: 'study',     emoji: '' },
  { id: 'zh-xiao4', symbol: '校', ipa: 'xiào', colour: '#2E7D32', audioFile: 'zh-xiao4.m4a', meaning: 'school',    emoji: '', image: '/images/zh-transparent/objects/school.png' },
  { id: 'zh-tian1', symbol: '天', ipa: 'tiān', colour: '#42A5F5', audioFile: 'zh-tian1.m4a', meaning: 'sky',       emoji: '', image: '/images/zh-transparent/objects/sky.png' },
  { id: 'zh-di4',   symbol: '地', ipa: 'dì',   colour: '#6D4C41', audioFile: 'zh-di4.m4a',   meaning: 'earth',    emoji: '', image: '/images/zh-transparent/objects/planet-earth.png' },
  // Things
  { id: 'zh-che1',  symbol: '车', ipa: 'chē',  colour: '#F44336', audioFile: 'zh-che1.m4a',  meaning: 'car',       emoji: '', image: '/images/zh-transparent/objects/car.png' },
  { id: 'zh-fei1',  symbol: '飞', ipa: 'fēi',  colour: '#0288D1', audioFile: 'zh-fei1.m4a',  meaning: 'airplane',  emoji: '', image: '/images/zh-transparent/objects/plane.png' },
  { id: 'zh-ji1n',  symbol: '机', ipa: 'jī',   colour: '#78909C', audioFile: 'zh-ji1n.m4a',  meaning: 'machine',   emoji: '' },
  { id: 'zh-dian4', symbol: '电', ipa: 'diàn', colour: '#FFC107', audioFile: 'zh-dian4.m4a', meaning: 'lightning', emoji: '', image: '/images/zh-transparent/objects/lightning.png' },
  { id: 'zh-shi4',  symbol: '视', ipa: 'shì',  colour: '#607D8B', audioFile: 'zh-shi4.m4a',  meaning: 'vision',    emoji: '' },
  { id: 'zh-hua1',  symbol: '花', ipa: 'huā',  colour: '#E91E63', audioFile: 'zh-hua1.m4a',  meaning: 'flower',    emoji: '', image: '/images/zh-transparent/objects/flower.png' },
  { id: 'zh-xing1', symbol: '星', ipa: 'xīng', colour: '#FFD54F', audioFile: 'zh-xing1.m4a', meaning: 'star',      emoji: '', image: '/images/zh-transparent/objects/star.png' },
  { id: 'zh-jing3', symbol: '警', ipa: 'jǐng', colour: '#1A237E', audioFile: 'zh-jing3.m4a', meaning: 'police',    emoji: '' },
  { id: 'zh-ba1n',  symbol: '巴', ipa: 'bā',   colour: '#4CAF50', audioFile: 'zh-ba1n.m4a',  meaning: 'bus',       emoji: '' },
  { id: 'zh-shi4n', symbol: '士', ipa: 'shì',  colour: '#607D8B', audioFile: 'zh-shi4n.m4a', meaning: 'soldier',   emoji: '' },
  { id: 'zh-jiu4',  symbol: '救', ipa: 'jiù',  colour: '#D32F2F', audioFile: 'zh-jiu4.m4a',  meaning: 'rescue',    emoji: '' },
  { id: 'zh-hu4',   symbol: '护', ipa: 'hù',   colour: '#C62828', audioFile: 'zh-hu4.m4a',   meaning: 'protect',   emoji: '' },
  { id: 'zh-xiao1', symbol: '消', ipa: 'xiāo', colour: '#E65100', audioFile: 'zh-xiao1.m4a', meaning: 'extinguish',emoji: '' },
  { id: 'zh-fang2', symbol: '防', ipa: 'fáng', colour: '#BF360C', audioFile: 'zh-fang2.m4a', meaning: 'prevent',   emoji: '' },
  { id: 'zh-chu1',  symbol: '出', ipa: 'chū',  colour: '#0277BD', audioFile: 'zh-chu1.m4a',  meaning: 'go out',    emoji: '' },
  { id: 'zh-zu1',   symbol: '租', ipa: 'zū',   colour: '#F9A825', audioFile: 'zh-zu1.m4a',   meaning: 'rent',      emoji: '' },
  { id: 'zh-qi4',   symbol: '汽', ipa: 'qì',   colour: '#78909C', audioFile: 'zh-qi4.m4a',   meaning: 'steam',     emoji: '' },
  { id: 'zh-juan3', symbol: '卷', ipa: 'juǎn', colour: '#607D8B', audioFile: 'zh-juan3.m4a', meaning: 'roll',      emoji: '' },
  { id: 'zh-feng1', symbol: '风', ipa: 'fēng', colour: '#90A4AE', audioFile: 'zh-feng1.m4a', meaning: 'wind',      emoji: '' },
  { id: 'zh-xuan2', symbol: '漩', ipa: 'xuán', colour: '#0277BD', audioFile: 'zh-xuan2.m4a', meaning: 'swirl',     emoji: '' },
  { id: 'zh-wo1',   symbol: '涡', ipa: 'wō',   colour: '#01579B', audioFile: 'zh-wo1.m4a',   meaning: 'vortex',    emoji: '' },
]

export const zhAllPhonemes = [...zhCharacters, ...zhNumbers, ...zhAnimals, ...zhColours, ...zhNouns]
export const zhPhonemeMap = new Map(zhAllPhonemes.map(p => [p.id, p]))
