import type { Phoneme } from '../types'

// Colour palette: each phoneme has a unique identity colour
// Consonants: cool blues/purples; Vowels: warm reds/oranges/yellows
export const enPhonemes: Phoneme[] = [
  // === SHORT VOWELS ===
  { id: 'en-a',  symbol: 'a',  ipa: 'æ',  colour: '#E74C3C', audioFile: 'en-a.mp3' },
  { id: 'en-e',  symbol: 'e',  ipa: 'ɛ',  colour: '#E67E22', audioFile: 'en-e.mp3' },
  { id: 'en-i',  symbol: 'i',  ipa: 'ɪ',  colour: '#F39C12', audioFile: 'en-i.mp3' },
  { id: 'en-o',  symbol: 'o',  ipa: 'ɒ',  colour: '#FF6B35', audioFile: 'en-o.mp3' },
  { id: 'en-u',  symbol: 'u',  ipa: 'ʌ',  colour: '#E91E63', audioFile: 'en-u.mp3' },

  // === LONG VOWELS ===
  { id: 'en-ay', symbol: 'ay', ipa: 'eɪ', colour: '#C0392B', audioFile: 'en-ay.mp3', isDigraph: true },
  { id: 'en-ee', symbol: 'ee', ipa: 'iː', colour: '#D35400', audioFile: 'en-ee.mp3', isDigraph: true },
  { id: 'en-igh',symbol: 'igh',ipa: 'aɪ', colour: '#E74C8B', audioFile: 'en-igh.mp3', isDigraph: true },
  { id: 'en-oa', symbol: 'oa', ipa: 'oʊ', colour: '#FF5722', audioFile: 'en-oa.mp3', isDigraph: true },
  { id: 'en-oo', symbol: 'oo', ipa: 'uː', colour: '#AD1457', audioFile: 'en-oo.mp3', isDigraph: true },

  // === CONSONANTS ===
  { id: 'en-b',  symbol: 'b',  ipa: 'b',  colour: '#3498DB', audioFile: 'en-b.mp3' },
  { id: 'en-c',  symbol: 'c',  ipa: 'k',  colour: '#2980B9', audioFile: 'en-c.mp3' },
  { id: 'en-d',  symbol: 'd',  ipa: 'd',  colour: '#8E44AD', audioFile: 'en-d.mp3' },
  { id: 'en-f',  symbol: 'f',  ipa: 'f',  colour: '#27AE60', audioFile: 'en-f.mp3' },
  { id: 'en-g',  symbol: 'g',  ipa: 'ɡ',  colour: '#16A085', audioFile: 'en-g.mp3' },
  { id: 'en-h',  symbol: 'h',  ipa: 'h',  colour: '#1ABC9C', audioFile: 'en-h.mp3' },
  { id: 'en-j',  symbol: 'j',  ipa: 'dʒ', colour: '#2ECC71', audioFile: 'en-j.mp3' },
  { id: 'en-k',  symbol: 'k',  ipa: 'k',  colour: '#1565C0', audioFile: 'en-k.mp3' },
  { id: 'en-l',  symbol: 'l',  ipa: 'l',  colour: '#6C3483', audioFile: 'en-l.mp3' },
  { id: 'en-m',  symbol: 'm',  ipa: 'm',  colour: '#117A65', audioFile: 'en-m.mp3' },
  { id: 'en-n',  symbol: 'n',  ipa: 'n',  colour: '#0E6655', audioFile: 'en-n.mp3' },
  { id: 'en-p',  symbol: 'p',  ipa: 'p',  colour: '#1A5276', audioFile: 'en-p.mp3' },
  { id: 'en-r',  symbol: 'r',  ipa: 'r',  colour: '#4A235A', audioFile: 'en-r.mp3' },
  { id: 'en-s',  symbol: 's',  ipa: 's',  colour: '#0B5345', audioFile: 'en-s.mp3' },
  { id: 'en-t',  symbol: 't',  ipa: 't',  colour: '#154360', audioFile: 'en-t.mp3' },
  { id: 'en-v',  symbol: 'v',  ipa: 'v',  colour: '#512E5F', audioFile: 'en-v.mp3' },
  { id: 'en-w',  symbol: 'w',  ipa: 'w',  colour: '#145A32', audioFile: 'en-w.mp3' },
  { id: 'en-x',  symbol: 'x',  ipa: 'ks', colour: '#0D47A1', audioFile: 'en-x.mp3' },
  { id: 'en-y',  symbol: 'y',  ipa: 'j',  colour: '#4527A0', audioFile: 'en-y.mp3' },
  { id: 'en-z',  symbol: 'z',  ipa: 'z',  colour: '#006064', audioFile: 'en-z.mp3' },

  // === DIGRAPHS ===
  { id: 'en-ch', symbol: 'ch', ipa: 'tʃ', colour: '#558B2F', audioFile: 'en-ch.mp3', isDigraph: true },
  { id: 'en-sh', symbol: 'sh', ipa: 'ʃ',  colour: '#827717', audioFile: 'en-sh.mp3', isDigraph: true },
  { id: 'en-th', symbol: 'th', ipa: 'θ',  colour: '#4E342E', audioFile: 'en-th.mp3', isDigraph: true },
  { id: 'en-ng', symbol: 'ng', ipa: 'ŋ',  colour: '#37474F', audioFile: 'en-ng.mp3', isDigraph: true },
  { id: 'en-qu', symbol: 'qu', ipa: 'kw', colour: '#1B5E20', audioFile: 'en-qu.mp3', isDigraph: true },
  { id: 'en-ck', symbol: 'ck', ipa: 'k',  colour: '#263238', audioFile: 'en-ck.mp3', isDigraph: true },
  { id: 'en-ll', symbol: 'll', ipa: 'l',  colour: '#4A148C', audioFile: 'en-ll.mp3', isDigraph: true },
  { id: 'en-ss', symbol: 'ss', ipa: 's',  colour: '#1A237E', audioFile: 'en-ss.mp3', isDigraph: true },
  { id: 'en-ff', symbol: 'ff', ipa: 'f',  colour: '#311B92', audioFile: 'en-ff.mp3', isDigraph: true },
]

export const enPhonemeMap = new Map(enPhonemes.map(p => [p.id, p]))
