<script lang="ts">
  import { zhCurriculum } from '$lib/data/curriculum/zh'
  import { selectPhase } from '$lib/stores/game.svelte'
  import type { ZhGameMode } from '$lib/data/curriculum/types'

  const phaseLabels: Record<string, string> = {
    'reveal': '认识汉字 — Reveal & Learn',
    'listen-match': '听音辨字 — Listen & Match',
    'recall': '记忆挑战 — Recall',
    'picture-match': '看图识字 — Picture Match',
    'compound': '组词造句 — Compound Words',
  }

  const phaseIcons: Record<string, string> = {
    'reveal': '👁️',
    'listen-match': '👂',
    'recall': '🧠',
    'picture-match': '🖼️',
    'compound': '🧩',
  }

  function handleSelect(phase: number, gameMode: ZhGameMode | undefined) {
    selectPhase(phase, gameMode ?? null)
  }
</script>

<div class="phase-select">
  <h1 class="title">选择游戏</h1>
  <p class="subtitle">Choose a game</p>

  <div class="phases">
    {#each zhCurriculum as phase, i}
      <button
        class="phase-btn"
        onclick={() => handleSelect(phase.phase, phase.gameMode)}
      >
        <span class="phase-icon">{phaseIcons[phase.gameMode ?? 'reveal']}</span>
        <span class="phase-info">
          <span class="phase-number">Phase {phase.phase}</span>
          <span class="phase-name">{phaseLabels[phase.gameMode ?? 'reveal']}</span>
        </span>
        <span class="phase-arrow">›</span>
      </button>
      {#if i < zhCurriculum.length - 1}
        <div class="connector"></div>
      {/if}
    {/each}
  </div>
</div>

<style>
  .phase-select {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 20px;
    overflow-y: auto;
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
    margin: 4px 0 32px;
  }

  .phases {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    width: 100%;
    max-width: 360px;
  }

  .phase-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 16px 18px;
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
    font-size: 1.8rem;
    flex-shrink: 0;
  }

  .phase-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  .phase-number {
    font-size: 0.75rem;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .phase-name {
    font-size: 1rem;
    font-weight: 700;
  }

  .phase-arrow {
    font-size: 1.5rem;
    color: rgba(255,255,255,0.4);
    flex-shrink: 0;
  }

  .connector {
    width: 2px;
    height: 16px;
    background: rgba(255,255,255,0.2);
  }
</style>
