import type { Level } from '../types'

// Phase 1 — CVC words (consonant-vowel-consonant), simplest phonics
export const enLevels: Level[] = [
  {
    id: 1,
    language: 'en',
    words: [
      {
        id: 'en-cat',
        text: 'cat',
        phonemeIds: ['en-c', 'en-a', 'en-t'],
        audioFile: 'en-cat.mp3',
        imageHint: 'cat',
      },
      {
        id: 'en-sat',
        text: 'sat',
        phonemeIds: ['en-s', 'en-a', 'en-t'],
        audioFile: 'en-sat.mp3',
        imageHint: 'person sitting',
      },
      {
        id: 'en-pat',
        text: 'pat',
        phonemeIds: ['en-p', 'en-a', 'en-t'],
        audioFile: 'en-pat.mp3',
        imageHint: 'hand patting',
      },
      {
        id: 'en-tap',
        text: 'tap',
        phonemeIds: ['en-t', 'en-a', 'en-p'],
        audioFile: 'en-tap.mp3',
        imageHint: 'water tap',
      },
      {
        id: 'en-nap',
        text: 'nap',
        phonemeIds: ['en-n', 'en-a', 'en-p'],
        audioFile: 'en-nap.mp3',
        imageHint: 'sleeping',
      },
    ],
  },
  {
    id: 2,
    language: 'en',
    words: [
      {
        id: 'en-dog',
        text: 'dog',
        phonemeIds: ['en-d', 'en-o', 'en-g'],
        audioFile: 'en-dog.mp3',
        imageHint: 'dog',
      },
      {
        id: 'en-log',
        text: 'log',
        phonemeIds: ['en-l', 'en-o', 'en-g'],
        audioFile: 'en-log.mp3',
        imageHint: 'log',
      },
      {
        id: 'en-hot',
        text: 'hot',
        phonemeIds: ['en-h', 'en-o', 'en-t'],
        audioFile: 'en-hot.mp3',
        imageHint: 'hot sun',
      },
      {
        id: 'en-pot',
        text: 'pot',
        phonemeIds: ['en-p', 'en-o', 'en-t'],
        audioFile: 'en-pot.mp3',
        imageHint: 'cooking pot',
      },
      {
        id: 'en-top',
        text: 'top',
        phonemeIds: ['en-t', 'en-o', 'en-p'],
        audioFile: 'en-top.mp3',
        imageHint: 'spinning top',
      },
    ],
  },
  {
    id: 3,
    language: 'en',
    words: [
      {
        id: 'en-ship',
        text: 'ship',
        phonemeIds: ['en-sh', 'en-i', 'en-p'],
        audioFile: 'en-ship.mp3',
        imageHint: 'ship',
      },
      {
        id: 'en-chip',
        text: 'chip',
        phonemeIds: ['en-ch', 'en-i', 'en-p'],
        audioFile: 'en-chip.mp3',
        imageHint: 'potato chip',
      },
      {
        id: 'en-thin',
        text: 'thin',
        phonemeIds: ['en-th', 'en-i', 'en-n'],
        audioFile: 'en-thin.mp3',
        imageHint: 'thin line',
      },
      {
        id: 'en-ring',
        text: 'ring',
        phonemeIds: ['en-r', 'en-i', 'en-ng'],
        audioFile: 'en-ring.mp3',
        imageHint: 'ring',
      },
      {
        id: 'en-king',
        text: 'king',
        phonemeIds: ['en-k', 'en-i', 'en-ng'],
        audioFile: 'en-king.mp3',
        imageHint: 'king crown',
      },
    ],
  },
]
