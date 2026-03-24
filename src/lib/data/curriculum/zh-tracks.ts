import { zhCurriculum } from './zh'
import { zhNumbersCurriculum } from './zh-numbers'
import { game } from '$lib/stores/game.svelte'
import type { CurriculumPhase } from './types'

/** Returns the curriculum phases for the currently active Chinese track */
export function getActiveZhCurriculum(): CurriculumPhase[] {
  return game.activeTrack === 'zh-numbers' ? zhNumbersCurriculum : zhCurriculum
}
