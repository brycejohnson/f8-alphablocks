import type { Level } from '../types'

// Phase 1 — common characters, each broken into initial + tonal final
// phonemeIds reference: zh-{initial} + zh-{syllable}-{tone}
export const zhLevels: Level[] = [
  {
    id: 1,
    language: 'zh',
    words: [
      {
        id: 'zh-ma',
        text: '妈',
        phonemeIds: ['zh-m', 'zh-ma-1'],
        audioFile: 'zh-ma.mp3',
        imageHint: 'mother',
      },
      {
        id: 'zh-ba',
        text: '爸',
        phonemeIds: ['zh-b', 'zh-a-4'],
        audioFile: 'zh-ba.mp3',
        imageHint: 'father',
      },
      {
        id: 'zh-ni',
        text: '你',
        phonemeIds: ['zh-n', 'zh-ni-3'],
        audioFile: 'zh-ni.mp3',
        imageHint: 'you pointing',
      },
      {
        id: 'zh-da',
        text: '大',
        phonemeIds: ['zh-d', 'zh-a-4'],
        audioFile: 'zh-da.mp3',
        imageHint: 'big',
      },
      {
        id: 'zh-hao',
        text: '好',
        phonemeIds: ['zh-h', 'zh-hao-3'],
        audioFile: 'zh-hao.mp3',
        imageHint: 'thumbs up',
      },
    ],
  },
  {
    id: 2,
    language: 'zh',
    words: [
      {
        id: 'zh-mao',
        text: '猫',
        phonemeIds: ['zh-m', 'zh-a-1'],
        audioFile: 'zh-mao.mp3',
        imageHint: 'cat',
      },
      {
        id: 'zh-gou',
        text: '狗',
        phonemeIds: ['zh-g', 'zh-o-3'],
        audioFile: 'zh-gou.mp3',
        imageHint: 'dog',
      },
      {
        id: 'zh-yu',
        text: '鱼',
        phonemeIds: ['zh-v-2'],
        audioFile: 'zh-yu.mp3',
        imageHint: 'fish',
      },
      {
        id: 'zh-niu',
        text: '牛',
        phonemeIds: ['zh-n', 'zh-i-2'],
        audioFile: 'zh-niu.mp3',
        imageHint: 'cow',
      },
      {
        id: 'zh-yang',
        text: '羊',
        phonemeIds: ['zh-a-2'],
        audioFile: 'zh-yang.mp3',
        imageHint: 'sheep',
      },
    ],
  },
]
