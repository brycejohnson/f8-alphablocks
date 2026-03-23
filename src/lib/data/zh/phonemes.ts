import type { Phoneme } from '../types'

// Tone colours: 1=blue, 2=green, 3=orange, 4=red, neutral/0=grey
// Each initial also has a base colour identity
const TONE_ACCENT = ['#9E9E9E', '#2196F3', '#4CAF50', '#FF9800', '#F44336']

// Helper: build a tonal phoneme entry
function tonal(base: string, syllable: string, ipa: string, baseColour: string, tone: number): Phoneme {
  const toneMark = ['', '1', '2', '3', '4'][tone]
  const id = tone === 0 ? `zh-${base}` : `zh-${syllable}-${tone}`
  return {
    id,
    symbol: syllable,
    ipa,
    colour: tone === 0 ? baseColour : TONE_ACCENT[tone],
    audioFile: `${id}.mp3`,
  }
}

// === INITIALS (consonants — no tone) ===
export const zhInitials: Phoneme[] = [
  { id: 'zh-b',  symbol: 'b',  ipa: 'p',   colour: '#1565C0', audioFile: 'zh-b.mp3' },
  { id: 'zh-p',  symbol: 'p',  ipa: 'pʰ',  colour: '#1976D2', audioFile: 'zh-p.mp3' },
  { id: 'zh-m',  symbol: 'm',  ipa: 'm',   colour: '#0288D1', audioFile: 'zh-m.mp3' },
  { id: 'zh-f',  symbol: 'f',  ipa: 'f',   colour: '#0097A7', audioFile: 'zh-f.mp3' },
  { id: 'zh-d',  symbol: 'd',  ipa: 't',   colour: '#7B1FA2', audioFile: 'zh-d.mp3' },
  { id: 'zh-t',  symbol: 't',  ipa: 'tʰ',  colour: '#8E24AA', audioFile: 'zh-t.mp3' },
  { id: 'zh-n',  symbol: 'n',  ipa: 'n',   colour: '#00695C', audioFile: 'zh-n.mp3' },
  { id: 'zh-l',  symbol: 'l',  ipa: 'l',   colour: '#00796B', audioFile: 'zh-l.mp3' },
  { id: 'zh-g',  symbol: 'g',  ipa: 'k',   colour: '#2E7D32', audioFile: 'zh-g.mp3' },
  { id: 'zh-k',  symbol: 'k',  ipa: 'kʰ',  colour: '#388E3C', audioFile: 'zh-k.mp3' },
  { id: 'zh-h',  symbol: 'h',  ipa: 'x',   colour: '#558B2F', audioFile: 'zh-h.mp3' },
  { id: 'zh-j',  symbol: 'j',  ipa: 'tɕ',  colour: '#F57F17', audioFile: 'zh-j.mp3' },
  { id: 'zh-q',  symbol: 'q',  ipa: 'tɕʰ', colour: '#E65100', audioFile: 'zh-q.mp3' },
  { id: 'zh-x',  symbol: 'x',  ipa: 'ɕ',   colour: '#BF360C', audioFile: 'zh-x.mp3' },
  { id: 'zh-zh', symbol: 'zh', ipa: 'tʂ',  colour: '#4A148C', audioFile: 'zh-zh.mp3' },
  { id: 'zh-ch', symbol: 'ch', ipa: 'tʂʰ', colour: '#6A1B9A', audioFile: 'zh-ch.mp3' },
  { id: 'zh-sh', symbol: 'sh', ipa: 'ʂ',   colour: '#880E4F', audioFile: 'zh-sh.mp3' },
  { id: 'zh-r',  symbol: 'r',  ipa: 'ʐ',   colour: '#B71C1C', audioFile: 'zh-r.mp3' },
  { id: 'zh-z',  symbol: 'z',  ipa: 'ts',  colour: '#1A237E', audioFile: 'zh-z.mp3' },
  { id: 'zh-c',  symbol: 'c',  ipa: 'tsʰ', colour: '#283593', audioFile: 'zh-c.mp3' },
  { id: 'zh-s',  symbol: 's',  ipa: 's',   colour: '#004D40', audioFile: 'zh-s.mp3' },
]

// === FINALS WITH TONES (1–4) — most common finals ===
// Each final appears 4× with tone colours
export const zhFinals: Phoneme[] = [
  // -a
  tonal('a', 'a', 'a', '#E53935', 1),
  tonal('a', 'a', 'á', '#E53935', 2),
  tonal('a', 'a', 'ǎ', '#E53935', 3),
  tonal('a', 'a', 'à', '#E53935', 4),
  // -o
  tonal('o', 'o', 'o', '#FB8C00', 1),
  tonal('o', 'o', 'ó', '#FB8C00', 2),
  tonal('o', 'o', 'ǒ', '#FB8C00', 3),
  tonal('o', 'o', 'ò', '#FB8C00', 4),
  // -e
  tonal('e', 'e', 'ə', '#FDD835', 1),
  tonal('e', 'e', 'é', '#FDD835', 2),
  tonal('e', 'e', 'ě', '#FDD835', 3),
  tonal('e', 'e', 'è', '#FDD835', 4),
  // -i
  tonal('i', 'i', 'i', '#43A047', 1),
  tonal('i', 'i', 'í', '#43A047', 2),
  tonal('i', 'i', 'ǐ', '#43A047', 3),
  tonal('i', 'i', 'ì', '#43A047', 4),
  // -u
  tonal('u', 'u', 'u', '#1E88E5', 1),
  tonal('u', 'u', 'ú', '#1E88E5', 2),
  tonal('u', 'u', 'ǔ', '#1E88E5', 3),
  tonal('u', 'u', 'ù', '#1E88E5', 4),
  // -ü
  tonal('v', 'ü', 'y', '#8E24AA', 1),
  tonal('v', 'ü', 'ǘ', '#8E24AA', 2),
  tonal('v', 'ü', 'ǚ', '#8E24AA', 3),
  tonal('v', 'ü', 'ǜ', '#8E24AA', 4),
  // -ma
  tonal('ma', 'ma', 'mā', '#0288D1', 1),
  tonal('ma', 'ma', 'má', '#0288D1', 2),
  tonal('ma', 'ma', 'mǎ', '#0288D1', 3),
  tonal('ma', 'ma', 'mà', '#0288D1', 4),
  // -ni
  tonal('ni', 'ni', 'nī', '#00695C', 1),
  tonal('ni', 'ni', 'ní', '#00695C', 2),
  tonal('ni', 'ni', 'nǐ', '#00695C', 3),
  tonal('ni', 'ni', 'nì', '#00695C', 4),
  // -hao
  tonal('hao', 'hao', 'hāo', '#558B2F', 1),
  tonal('hao', 'hao', 'háo', '#558B2F', 2),
  tonal('hao', 'hao', 'hǎo', '#558B2F', 3),
  tonal('hao', 'hao', 'hào', '#558B2F', 4),
]

export const zhAllPhonemes = [...zhInitials, ...zhFinals]
export const zhPhonemeMap = new Map(zhAllPhonemes.map(p => [p.id, p]))
