<script lang="ts">
  import { zhCurriculum } from '$lib/data/curriculum/zh'
  import { zhNumbersCurriculum } from '$lib/data/curriculum/zh-numbers'
  import { selectPhase } from '$lib/stores/game.svelte'
  import { ensureAudioContext } from '$lib/audio/phonemePlayer'
  import type { ZhGameMode, CurriculumTrack } from '$lib/data/curriculum/types'

  const tracks: CurriculumTrack[] = [
    { id: 'zh-characters', name: '汉字 Characters', icon: '🀄', phases: zhCurriculum },
    { id: 'zh-numbers',    name: '数字 Numbers',    icon: '🔢', phases: zhNumbersCurriculum },
  ]

  const modeIcons: Record<string, string> = {
    'reveal': '👁️',
    'listen-match': '👂',
    'recall': '🧠',
    'picture-match': '🖼️',
    'compound': '🧩',
  }

  const modeLabels: Record<string, string> = {
    'reveal': 'Reveal & Learn',
    'listen-match': 'Listen & Match',
    'recall': 'Recall',
    'picture-match': 'Picture Match',
    'compound': 'Compound Words',
  }

  function handleSelect(trackId: string, phase: number, gameMode: ZhGameMode | undefined) {
    ensureAudioContext() // Unlock AudioContext on first user tap (critical for iOS)
    selectPhase(phase, gameMode ?? null, trackId)
  }
</script>

<div class="phase-select">
  <h1 class="title">选择游戏</h1>
  <p class="subtitle">Choose a game</p>

  {#each tracks as track}
    <div class="track">
      <h2 class="track-title">{track.icon} {track.name}</h2>

      <div class="phases">
        {#each track.phases as phase, i}
          <button
            class="phase-btn"
            onclick={() => handleSelect(track.id, phase.phase, phase.gameMode)}
          >
            <span class="phase-icon">{modeIcons[phase.gameMode ?? 'reveal']}</span>
            <span class="phase-info">
              <span class="phase-number">Phase {phase.phase}</span>
              <span class="phase-name">{phase.name} — {modeLabels[phase.gameMode ?? 'reveal']}</span>
            </span>
            <span class="phase-arrow">›</span>
          </button>
          {#if i < track.phases.length - 1}
            <div class="connector"></div>
          {/if}
        {/each}
      </div>
    </div>
  {/each}
</div>

<style>
  .phase-select {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px 60px;
    overflow-y: auto;
    gap: 8px;
  }

  .title {
    font-size: 2rem;
    font-weight: 900;
    color: #fff;
    margin: 0;
  }

  .subtitle {
    font-size: 1rem;
    color: rgba(255,255,255,0.6);
    margin: 4px 0 16px;
  }

  .track {
    width: 100%;
    max-width: 360px;
    margin-bottom: 24px;
  }

  .track-title {
    font-size: 1.2rem;
    font-weight: 800;
    color: rgba(255,255,255,0.9);
    margin: 0 0 12px;
    padding-bottom: 8px;
    border-bottom: 2px solid rgba(255,255,255,0.15);
  }

  .phases {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    width: 100%;
  }

  .phase-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    border: 2px solid rgba(255,255,255,0.2);
    border-radius: 16px;
    background: rgba(255,255,255,0.08);
    color: #fff;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s, border-color 0.2s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }

  .phase-btn:hover {
    background: rgba(255,255,255,0.15);
    border-color: rgba(255,255,255,0.4);
  }

  .phase-btn:active {
    transform: scale(0.97);
  }

  .phase-icon {
    font-size: 1.6rem;
    flex-shrink: 0;
  }

  .phase-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  .phase-number {
    font-size: 0.7rem;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .phase-name {
    font-size: 0.9rem;
    font-weight: 700;
  }

  .phase-arrow {
    font-size: 1.5rem;
    color: rgba(255,255,255,0.4);
    flex-shrink: 0;
  }

  .connector {
    width: 2px;
    height: 12px;
    background: rgba(255,255,255,0.2);
  }
</style>
