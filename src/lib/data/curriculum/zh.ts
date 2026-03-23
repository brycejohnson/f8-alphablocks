import type { CurriculumPhase } from './types'

// Mandarin curriculum — initials introduced in groups, tones introduced progressively
// Phase 1: b p m f + tone 1 only (flat tone, easiest to hear)
// Phase 2: d t n l + tones 2 & 3
// Phase 3: g k h + tone 4 + compound finals

export const zhCurriculum: CurriculumPhase[] = [
  {
    phase: 1,
    name: '第一声',  // Tone 1 — flat
    newPhonemeIds: ['zh-b', 'zh-p', 'zh-m', 'zh-f', 'zh-a-1', 'zh-o-1', 'zh-ma-1'],
    words: [
      { id: 'zh-ma1',  text: '妈', phonemeIds: ['zh-m', 'zh-ma-1'] },  // mā — mother
      { id: 'zh-bo1',  text: '波', phonemeIds: ['zh-b', 'zh-o-1'] },   // bō — wave
      { id: 'zh-mo1',  text: '摸', phonemeIds: ['zh-m', 'zh-o-1'] },   // mō — touch
      { id: 'zh-fo1',  text: '佛', phonemeIds: ['zh-f', 'zh-o-1'] },   // fó (approx) — Buddha
      { id: 'zh-ba1',  text: '巴', phonemeIds: ['zh-b', 'zh-a-1'] },   // bā — eight / hope
      { id: 'zh-pa1',  text: '趴', phonemeIds: ['zh-p', 'zh-a-1'] },   // pā — lie face down
    ],
  },
  {
    phase: 2,
    name: '声调 2 & 3',  // Tones 2 & 3
    newPhonemeIds: ['zh-d', 'zh-t', 'zh-n', 'zh-l', 'zh-a-2', 'zh-a-3', 'zh-o-2', 'zh-o-3', 'zh-ni-3'],
    words: [
      { id: 'zh-ni3',  text: '你', phonemeIds: ['zh-n', 'zh-ni-3'] },  // nǐ — you
      { id: 'zh-da4',  text: '大', phonemeIds: ['zh-d', 'zh-a-4'] },   // dà — big (tone 4 preview)
      { id: 'zh-na2',  text: '拿', phonemeIds: ['zh-n', 'zh-a-2'] },   // ná — to hold
      { id: 'zh-la1',  text: '啦', phonemeIds: ['zh-l', 'zh-a-1'] },   // lā — (particle)
      { id: 'zh-ta1',  text: '他', phonemeIds: ['zh-t', 'zh-a-1'] },   // tā — he/she
      { id: 'zh-lo',   text: '咯', phonemeIds: ['zh-l', 'zh-o-3'] },   // lǒ — (particle)
    ],
  },
  {
    phase: 3,
    name: '声调 4 & 好',  // Tone 4 + compound finals
    newPhonemeIds: ['zh-g', 'zh-k', 'zh-h', 'zh-a-4', 'zh-o-4', 'zh-hao-3'],
    words: [
      { id: 'zh-hao3', text: '好', phonemeIds: ['zh-h', 'zh-hao-3'] }, // hǎo — good
      { id: 'zh-ba4',  text: '爸', phonemeIds: ['zh-b', 'zh-a-4'] },   // bà — father
      { id: 'zh-ma4',  text: '骂', phonemeIds: ['zh-m', 'zh-a-4'] },   // mà — scold
      { id: 'zh-ga1',  text: '噶', phonemeIds: ['zh-g', 'zh-a-1'] },   // gā
      { id: 'zh-ka3',  text: '卡', phonemeIds: ['zh-k', 'zh-a-3'] },   // kǎ — card
      { id: 'zh-ha1',  text: '哈', phonemeIds: ['zh-h', 'zh-a-1'] },   // hā — ha!
    ],
  },
]
