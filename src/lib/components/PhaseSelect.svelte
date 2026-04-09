<script lang="ts">
  import SplashScreen from './SplashScreen.svelte'
  import { zhCurriculum } from '$lib/data/curriculum/zh'
  import { zhNumbersCurriculum } from '$lib/data/curriculum/zh-numbers'
  import { zhAnimalsCurriculum } from '$lib/data/curriculum/zh-animals'
  import { zhColoursCurriculum } from '$lib/data/curriculum/zh-colours'
  import { zhNounsCurriculum } from '$lib/data/curriculum/zh-nouns'
  import { zhConversationCurriculum } from '$lib/data/curriculum/zh-conversation'
  import { selectPhase } from '$lib/stores/game.svelte'
  import { ensureAudioContext } from '$lib/audio/phonemePlayer'
  import { base } from '$app/paths'
  import type { ZhGameMode, CurriculumTrack } from '$lib/data/curriculum/types'

  const tracks: (CurriculumTrack & { image?: string; disabled?: boolean })[] = [
    { id: 'zh-characters',   name: '汉字 Characters',           icon: '🀄', phases: zhCurriculum,             image: '/images/zh-transparent/objects/da-symbol.png' },
    { id: 'zh-numbers',      name: '数字 Numbers',              icon: '🔢', phases: zhNumbersCurriculum,      image: '/images/zh-transparent/numbers/1.png' },
    { id: 'zh-animals',      name: '动物 Animals',              icon: '🐻', phases: zhAnimalsCurriculum,      image: '/images/zh-transparent/animals/tiger.png' },
    { id: 'zh-colours',      name: '颜色形状 Colours & Shapes', icon: '🎨', phases: zhColoursCurriculum,      image: '/images/zh-transparent/objects/colors.png' },
    { id: 'zh-nouns',        name: '名词 Nouns',                icon: '🏠', phases: zhNounsCurriculum,        image: '/images/zh-transparent/objects/house.png' },
    { id: 'zh-conversation', name: '对话 Conversation',         icon: '💬', phases: zhConversationCurriculum, image: '/images/zh-transparent/objects/volcanofrog.png', disabled: true },
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

  let view: 'grid' | 'phases' = $state('grid')
  let selectedTrack: (CurriculumTrack & { image?: string }) | null = $state(null)

  function openTrack(track: CurriculumTrack & { image?: string }) {
    ensureAudioContext()
    selectedTrack = track
    view = 'phases'
  }

  function goBack() {
    view = 'grid'
    selectedTrack = null
  }

  function handleSelect(trackId: string, phase: number, gameMode: ZhGameMode | undefined) {
    ensureAudioContext()
    selectPhase(phase, gameMode ?? null, trackId)
  }
</script>

<div class="phase-select">
  {#if view === 'grid'}
    <div class="splash-area">
      <SplashScreen />
    </div>

    <div class="track-grid">
      {#each tracks as track}
        <button class="track-tile" class:disabled={track.disabled} onclick={() => !track.disabled && openTrack(track)}>
          {#if track.image}
            <img src="{base}{track.image}" alt="{track.name}" class="tile-img" />
          {:else}
            <span class="tile-emoji">{track.icon}</span>
          {/if}
          <span class="tile-name">{track.name}</span>
          {#if track.disabled}
            <span class="tile-count">Coming soon</span>
          {:else}
            <span class="tile-count">{track.phases.length} games</span>
          {/if}
        </button>
      {/each}
    </div>

  {:else if selectedTrack}
    <button class="back-btn" onclick={goBack}>
      ← 返回
    </button>

    <div class="track-header">
      {#if selectedTrack.image}
        <img src="{base}{selectedTrack.image}" alt="{selectedTrack.name}" class="header-img" />
      {/if}
      <h2 class="header-name">{selectedTrack.name}</h2>
    </div>

    <div class="phases">
      {#each selectedTrack.phases as phase, i}
        <button
          class="phase-btn"
          onclick={() => handleSelect(selectedTrack!.id, phase.phase, phase.gameMode)}
        >
          <span class="phase-icon">{modeIcons[phase.gameMode ?? 'reveal']}</span>
          <span class="phase-info">
            <span class="phase-number">Phase {phase.phase}</span>
            <span class="phase-name">{phase.name} — {modeLabels[phase.gameMode ?? 'reveal']}</span>
          </span>
          <span class="phase-arrow">›</span>
        </button>
        {#if i < selectedTrack.phases.length - 1}
          <div class="connector"></div>
        {/if}
      {/each}
    </div>
  {/if}
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

  .splash-area {
    width: 100%;
    height: 380px;
    display: flex;
    margin-bottom: 16px;
    flex-shrink: 0;
  }

  /* ── Grid View ── */

  .track-grid {
    width: 100%;
    max-width: 400px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .track-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    aspect-ratio: 1;
    border: 2px solid rgba(255,255,255,0.2);
    border-radius: 20px;
    background: rgba(255,255,255,0.08);
    color: #fff;
    cursor: pointer;
    padding: 16px 8px;
    gap: 6px;
    transition: background 0.2s, border-color 0.2s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }

  .track-tile:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.35);
  }

  .track-tile:active:not(.disabled) {
    transform: scale(0.96);
  }

  .track-tile.disabled {
    opacity: 0.35;
    cursor: default;
    border-color: rgba(255,255,255,0.1);
  }

  .tile-img {
    width: 70px;
    height: 70px;
    object-fit: contain;
  }

  .tile-emoji {
    font-size: 3rem;
  }

  .tile-name {
    font-size: 0.85rem;
    font-weight: 800;
    text-align: center;
    line-height: 1.2;
  }

  .tile-count {
    font-size: 0.7rem;
    font-weight: 600;
    color: rgba(255,255,255,0.45);
  }

  /* ── Phases View ── */

  .back-btn {
    align-self: flex-start;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 20px;
    border: none;
    border-radius: 14px;
    background: rgba(255,255,255,0.1);
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    margin-top: 20px;
    margin-bottom: 8px;
    -webkit-tap-highlight-color: transparent;
    transition: background 0.2s;
  }

  .back-btn:hover {
    background: rgba(255,255,255,0.18);
  }

  .back-btn:active {
    transform: scale(0.97);
  }

  .track-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
  }

  .header-img {
    width: 50px;
    height: 50px;
    object-fit: contain;
  }

  .header-name {
    font-size: 1.3rem;
    font-weight: 800;
    color: #fff;
    margin: 0;
  }

  .phases {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    width: 100%;
    max-width: 360px;
    animation: slide-in 0.2s ease;
  }

  @keyframes slide-in {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .phase-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    border: 2px solid rgba(255,255,255,0.15);
    border-radius: 14px;
    background: rgba(255,255,255,0.05);
    color: #fff;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }

  .phase-btn:hover {
    background: rgba(255,255,255,0.12);
  }

  .phase-btn:active {
    transform: scale(0.97);
  }

  .phase-icon {
    font-size: 1.4rem;
    flex-shrink: 0;
  }

  .phase-info {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
  }

  .phase-number {
    font-size: 0.65rem;
    font-weight: 600;
    color: rgba(255,255,255,0.45);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .phase-name {
    font-size: 0.85rem;
    font-weight: 700;
  }

  .phase-arrow {
    font-size: 1.3rem;
    color: rgba(255,255,255,0.35);
    flex-shrink: 0;
  }

  .connector {
    width: 2px;
    height: 10px;
    background: rgba(255,255,255,0.15);
  }
</style>
