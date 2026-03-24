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
  { id: 'zh-huo3',  symbol: '火', ipa: 'huǒ',  colour: '#E53935', audioFile: 'zh-huo3.m4a',  meaning: 'fire',     emoji: '🔥' },
  { id: 'zh-shan1', symbol: '山', ipa: 'shān',  colour: '#2E7D32', audioFile: 'zh-shan1.m4a', meaning: 'mountain', emoji: '⛰️' },
  { id: 'zh-shui3', symbol: '水', ipa: 'shuǐ',  colour: '#1565C0', audioFile: 'zh-shui3.m4a', meaning: 'water',    emoji: '💧' },
  { id: 'zh-da4',   symbol: '大', ipa: 'dà',    colour: '#B71C1C', audioFile: 'zh-da4.m4a',   meaning: 'big',      emoji: '' },
  { id: 'zh-xiao3', symbol: '小', ipa: 'xiǎo',  colour: '#42A5F5', audioFile: 'zh-xiao3.m4a', meaning: 'small',    emoji: '' },
  { id: 'zh-ren2',  symbol: '人', ipa: 'rén',   colour: '#6D4C41', audioFile: 'zh-ren2.m4a',  meaning: 'person',   emoji: '🧑' },
  { id: 'zh-ri4',   symbol: '日', ipa: 'rì',    colour: '#F9A825', audioFile: 'zh-ri4.m4a',   meaning: 'sun',      emoji: '☀️' },
  { id: 'zh-yue4',  symbol: '月', ipa: 'yuè',   colour: '#78909C', audioFile: 'zh-yue4.m4a',  meaning: 'moon',     emoji: '🌙' },
  { id: 'zh-mu4',   symbol: '木', ipa: 'mù',    colour: '#558B2F', audioFile: 'zh-mu4.m4a',   meaning: 'tree',     emoji: '🌳' },
  { id: 'zh-guo3',  symbol: '果', ipa: 'guǒ',   colour: '#E91E63', audioFile: 'zh-guo3.m4a',  meaning: 'fruit',    emoji: '🍎' },
]

// Numbers 1-10
export const zhNumbers: Phoneme[] = [
  { id: 'zh-yi1',  symbol: '一', ipa: 'yī',   colour: '#1565C0', audioFile: 'zh-yi1.m4a',  meaning: 'one',   emoji: '1️⃣' },
  { id: 'zh-er4',  symbol: '二', ipa: 'èr',   colour: '#2E7D32', audioFile: 'zh-er4.m4a',  meaning: 'two',   emoji: '2️⃣' },
  { id: 'zh-san1', symbol: '三', ipa: 'sān',  colour: '#E65100', audioFile: 'zh-san1.m4a', meaning: 'three', emoji: '3️⃣' },
  { id: 'zh-si4',  symbol: '四', ipa: 'sì',   colour: '#B71C1C', audioFile: 'zh-si4.m4a',  meaning: 'four',  emoji: '4️⃣' },
  { id: 'zh-wu3',  symbol: '五', ipa: 'wǔ',   colour: '#6A1B9A', audioFile: 'zh-wu3.m4a',  meaning: 'five',  emoji: '5️⃣' },
  { id: 'zh-liu4', symbol: '六', ipa: 'liù',  colour: '#00695C', audioFile: 'zh-liu4.m4a', meaning: 'six',   emoji: '6️⃣' },
  { id: 'zh-qi1',  symbol: '七', ipa: 'qī',   colour: '#F57F17', audioFile: 'zh-qi1.m4a',  meaning: 'seven', emoji: '7️⃣' },
  { id: 'zh-ba1',  symbol: '八', ipa: 'bā',   colour: '#0277BD', audioFile: 'zh-ba1.m4a',  meaning: 'eight', emoji: '8️⃣' },
  { id: 'zh-jiu3', symbol: '九', ipa: 'jiǔ',  colour: '#AD1457', audioFile: 'zh-jiu3.m4a', meaning: 'nine',  emoji: '9️⃣' },
  { id: 'zh-shi2', symbol: '十', ipa: 'shí',  colour: '#4E342E', audioFile: 'zh-shi2.m4a', meaning: 'ten',   emoji: '🔟' },
]

// Animals
export const zhAnimals: Phoneme[] = [
  { id: 'zh-mao1',  symbol: '猫', ipa: 'māo',  colour: '#FF8F00', audioFile: 'zh-mao1.m4a',  meaning: 'cat',    emoji: '🐱' },
  { id: 'zh-gou3',  symbol: '狗', ipa: 'gǒu',  colour: '#6D4C41', audioFile: 'zh-gou3.m4a',  meaning: 'dog',    emoji: '🐕' },
  { id: 'zh-yu2',   symbol: '鱼', ipa: 'yú',   colour: '#0288D1', audioFile: 'zh-yu2.m4a',   meaning: 'fish',   emoji: '🐟' },
  { id: 'zh-niao3', symbol: '鸟', ipa: 'niǎo', colour: '#43A047', audioFile: 'zh-niao3.m4a', meaning: 'bird',   emoji: '🐦' },
  { id: 'zh-ma3',   symbol: '马', ipa: 'mǎ',   colour: '#5D4037', audioFile: 'zh-ma3.m4a',   meaning: 'horse',  emoji: '🐴' },
  { id: 'zh-niu2',  symbol: '牛', ipa: 'niú',  colour: '#3E2723', audioFile: 'zh-niu2.m4a',  meaning: 'cow',    emoji: '🐄' },
  { id: 'zh-zhu1',  symbol: '猪', ipa: 'zhū',  colour: '#F48FB1', audioFile: 'zh-zhu1.m4a',  meaning: 'pig',    emoji: '🐷' },
  { id: 'zh-yang2', symbol: '羊', ipa: 'yáng', colour: '#BDBDBD', audioFile: 'zh-yang2.m4a', meaning: 'sheep',  emoji: '🐑' },
  { id: 'zh-ji1',   symbol: '鸡', ipa: 'jī',   colour: '#E65100', audioFile: 'zh-ji1.m4a',   meaning: 'chicken', emoji: '🐔' },
  { id: 'zh-long2', symbol: '龙', ipa: 'lóng', colour: '#C62828', audioFile: 'zh-long2.m4a', meaning: 'dragon',   emoji: '🐉' },
  { id: 'zh-shi1', symbol: '狮', ipa: 'shī',  colour: '#E65100', audioFile: 'zh-shi1.m4a',  meaning: 'lion',     emoji: '🦁' },
  { id: 'zh-hou2', symbol: '猴', ipa: 'hóu',  colour: '#795548', audioFile: 'zh-hou2.m4a',  meaning: 'monkey',   emoji: '🐵' },
  { id: 'zh-xiong2',symbol: '熊', ipa: 'xióng',colour: '#4E342E', audioFile: 'zh-xiong2.m4a',meaning: 'bear',     emoji: '🐻' },
  { id: 'zh-tu4',  symbol: '兔', ipa: 'tù',   colour: '#F8BBD0', audioFile: 'zh-tu4.m4a',   meaning: 'rabbit',   emoji: '🐰' },
  { id: 'zh-she2', symbol: '蛇', ipa: 'shé',  colour: '#558B2F', audioFile: 'zh-she2.m4a',  meaning: 'snake',    emoji: '🐍' },
  { id: 'zh-hu3',  symbol: '虎', ipa: 'hǔ',   colour: '#E65100', audioFile: 'zh-hu3.m4a',   meaning: 'tiger',    emoji: '🐯' },
  { id: 'zh-xiang4',symbol: '象', ipa: 'xiàng',colour: '#78909C', audioFile: 'zh-xiang4.m4a',meaning: 'elephant', emoji: '🐘' },
  { id: 'zh-e2',   symbol: '鹅', ipa: 'é',    colour: '#EEEEEE', audioFile: 'zh-e2.m4a',    meaning: 'goose',    emoji: '🪿' },
  { id: 'zh-ya1',  symbol: '鸭', ipa: 'yā',   colour: '#43A047', audioFile: 'zh-ya1.m4a',   meaning: 'duck',     emoji: '🦆' },
  { id: 'zh-kong3',symbol: '恐', ipa: 'kǒng', colour: '#37474F', audioFile: 'zh-kong3.m4a', meaning: '',         emoji: '' },
]

// Colours
export const zhColours: Phoneme[] = [
  { id: 'zh-hong2', symbol: '红', ipa: 'hóng',  colour: '#E53935', audioFile: 'zh-hong2.m4a', meaning: 'red',    emoji: '🔴' },
  { id: 'zh-lan2',  symbol: '蓝', ipa: 'lán',   colour: '#1565C0', audioFile: 'zh-lan2.m4a',  meaning: 'blue',   emoji: '🔵' },
  { id: 'zh-lv4',   symbol: '绿', ipa: 'lǜ',    colour: '#2E7D32', audioFile: 'zh-lv4.m4a',   meaning: 'green',  emoji: '🟢' },
  { id: 'zh-huang2',symbol: '黄', ipa: 'huáng', colour: '#F9A825', audioFile: 'zh-huang2.m4a',meaning: 'yellow', emoji: '🟡' },
  { id: 'zh-bai2',  symbol: '白', ipa: 'bái',   colour: '#9E9E9E', audioFile: 'zh-bai2.m4a',  meaning: 'white',  emoji: '⬜' },
  { id: 'zh-hei1',  symbol: '黑', ipa: 'hēi',   colour: '#212121', audioFile: 'zh-hei1.m4a',  meaning: 'black',  emoji: '⬛' },
  { id: 'zh-fen3',  symbol: '粉', ipa: 'fěn',   colour: '#F06292', audioFile: 'zh-fen3.m4a',  meaning: 'pink',   emoji: '🩷' },
  { id: 'zh-zi3',   symbol: '紫', ipa: 'zǐ',    colour: '#7B1FA2', audioFile: 'zh-zi3.m4a',   meaning: 'purple', emoji: '🟣' },
  { id: 'zh-jin1',  symbol: '金', ipa: 'jīn',   colour: '#FFB300', audioFile: 'zh-jin1.m4a',  meaning: 'gold',   emoji: '🥇' },
]

export const zhAllPhonemes = [...zhCharacters, ...zhNumbers, ...zhAnimals, ...zhColours]
export const zhPhonemeMap = new Map(zhAllPhonemes.map(p => [p.id, p]))
