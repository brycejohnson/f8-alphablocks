import { zhCurriculum } from './zh'
import { zhNumbersCurriculum } from './zh-numbers'
import { zhAnimalsCurriculum } from './zh-animals'
import { zhColoursCurriculum } from './zh-colours'
import { zhNounsCurriculum } from './zh-nouns'
import { game } from '$lib/stores/game.svelte'
import type { CurriculumPhase } from './types'

const trackMap: Record<string, CurriculumPhase[]> = {
  'zh-characters': zhCurriculum,
  'zh-numbers': zhNumbersCurriculum,
  'zh-animals': zhAnimalsCurriculum,
  'zh-colours': zhColoursCurriculum,
  'zh-nouns': zhNounsCurriculum,
}

/** Returns the curriculum phases for the currently active Chinese track */
export function getActiveZhCurriculum(): CurriculumPhase[] {
  return trackMap[game.activeTrack] ?? zhCurriculum
}
