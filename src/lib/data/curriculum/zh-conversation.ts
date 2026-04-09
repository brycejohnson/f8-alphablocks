import type { CurriculumPhase } from './types'

/**
 * Mandarin Conversation curriculum — basic phrases
 *
 * Phase order: reveal, recall, picture-match, compound, listen-match
 */

export const zhConversationCurriculum: CurriculumPhase[] = [
  {
    phase: 1,
    name: '认识对话',  // Reveal & Learn Conversation
    gameMode: 'reveal',
    newPhonemeIds: ['zh-ni3', 'zh-hao3', 'zh-zai4', 'zh-jian4', 'zh-xie4', 'zh-qing3'],
    words: [
      { id: 'zh-ni3',   text: '你', phonemeIds: ['zh-ni3'],   meaning: 'you' },
      { id: 'zh-hao3',  text: '好', phonemeIds: ['zh-hao3'],  meaning: 'good' },
      { id: 'zh-zai4',  text: '再', phonemeIds: ['zh-zai4'],  meaning: 'again' },
      { id: 'zh-jian4', text: '见', phonemeIds: ['zh-jian4'], meaning: 'see' },
      { id: 'zh-xie4',  text: '谢', phonemeIds: ['zh-xie4'],  meaning: 'thanks' },
      { id: 'zh-qing3', text: '请', phonemeIds: ['zh-qing3'], meaning: 'please' },
    ],
  },
  {
    phase: 2,
    name: '对话记忆',  // Recall Conversation
    gameMode: 'recall',
    newPhonemeIds: ['zh-wo3', 'zh-yao4', 'zh-jiao4b', 'zh-bu4'],
    words: [
      { id: 'zh-ni3',    text: '你', phonemeIds: ['zh-ni3'],    meaning: 'you' },
      { id: 'zh-hao3',   text: '好', phonemeIds: ['zh-hao3'],   meaning: 'good' },
      { id: 'zh-zai4',   text: '再', phonemeIds: ['zh-zai4'],   meaning: 'again' },
      { id: 'zh-jian4',  text: '见', phonemeIds: ['zh-jian4'],  meaning: 'see' },
      { id: 'zh-xie4',   text: '谢', phonemeIds: ['zh-xie4'],   meaning: 'thanks' },
      { id: 'zh-qing3',  text: '请', phonemeIds: ['zh-qing3'],  meaning: 'please' },
      { id: 'zh-wo3',    text: '我', phonemeIds: ['zh-wo3'],    meaning: 'I' },
      { id: 'zh-yao4',   text: '要', phonemeIds: ['zh-yao4'],   meaning: 'want' },
      { id: 'zh-jiao4b', text: '叫', phonemeIds: ['zh-jiao4b'], meaning: 'called' },
      { id: 'zh-bu4',    text: '不', phonemeIds: ['zh-bu4'],    meaning: 'no' },
    ],
  },
  {
    phase: 3,
    name: '看图识对话',  // Picture Match Conversation
    gameMode: 'picture-match',
    newPhonemeIds: [],
    words: [
      { id: 'zh-ni3',    text: '你', phonemeIds: ['zh-ni3'],    meaning: 'you' },
      { id: 'zh-hao3',   text: '好', phonemeIds: ['zh-hao3'],   meaning: 'good' },
      { id: 'zh-xie4',   text: '谢', phonemeIds: ['zh-xie4'],   meaning: 'thanks' },
      { id: 'zh-qing3',  text: '请', phonemeIds: ['zh-qing3'],  meaning: 'please' },
      { id: 'zh-wo3',    text: '我', phonemeIds: ['zh-wo3'],    meaning: 'I' },
      { id: 'zh-bu4',    text: '不', phonemeIds: ['zh-bu4'],    meaning: 'no' },
    ],
  },
  {
    phase: 4,
    name: '组合对话',  // Compound Conversation
    gameMode: 'compound',
    newPhonemeIds: ['zh-ma0', 'zh-dui4', 'zh-qi3', 'zh-mei2', 'zh-guan1', 'zh-ke4', 'zh-ai4'],
    words: [
      { id: 'zh-nihao',     text: '你好',   phonemeIds: ['zh-ni3', 'zh-hao3'],              meaning: 'hello',            emoji: '👋' },
      { id: 'zh-zaijian',   text: '再见',   phonemeIds: ['zh-zai4', 'zh-jian4'],            meaning: 'goodbye',          emoji: '👋' },
      { id: 'zh-xiexie',    text: '谢谢',   phonemeIds: ['zh-xie4', 'zh-xie4'],             meaning: 'thank you',        emoji: '🙏' },
      { id: 'zh-woyao',     text: '我要',   phonemeIds: ['zh-wo3', 'zh-yao4'],              meaning: 'I want',           emoji: '🙋' },
      { id: 'zh-wojiao',    text: '我叫',   phonemeIds: ['zh-wo3', 'zh-jiao4b'],            meaning: 'my name is',       emoji: '😊' },
      { id: 'zh-bushi',     text: '不是',   phonemeIds: ['zh-bu4', 'zh-shi4'],              meaning: 'no',               emoji: '🙅' },
      { id: 'zh-nihaoma',   text: '你好吗', phonemeIds: ['zh-ni3', 'zh-hao3', 'zh-ma0'],    meaning: 'how are you?',     emoji: '😀' },
      { id: 'zh-duibuqi',   text: '对不起', phonemeIds: ['zh-dui4', 'zh-bu4', 'zh-qi3'],    meaning: 'sorry',            emoji: '😔' },
      { id: 'zh-meiguanxi', text: '没关系', phonemeIds: ['zh-mei2', 'zh-guan1', 'zh-xi4'],  meaning: "it's okay",        emoji: '😊' },
      { id: 'zh-bukeqi',    text: '不客气', phonemeIds: ['zh-bu4', 'zh-ke4', 'zh-qi4'],     meaning: "you're welcome",   emoji: '😄' },
      { id: 'zh-woaini',    text: '我爱你', phonemeIds: ['zh-wo3', 'zh-ai4', 'zh-ni3'],     meaning: 'I love you',       emoji: '❤️' },
    ],
  },
  {
    phase: 5,
    name: '听音辨对话',  // Listen & Match Conversation
    gameMode: 'listen-match',
    newPhonemeIds: [],
    words: [
      { id: 'zh-ni3',    text: '你', phonemeIds: ['zh-ni3'],    meaning: 'you' },
      { id: 'zh-hao3',   text: '好', phonemeIds: ['zh-hao3'],   meaning: 'good' },
      { id: 'zh-wo3',    text: '我', phonemeIds: ['zh-wo3'],    meaning: 'I' },
      { id: 'zh-xie4',   text: '谢', phonemeIds: ['zh-xie4'],   meaning: 'thanks' },
      { id: 'zh-qing3',  text: '请', phonemeIds: ['zh-qing3'],  meaning: 'please' },
      { id: 'zh-bu4',    text: '不', phonemeIds: ['zh-bu4'],    meaning: 'no' },
    ],
  },
]
