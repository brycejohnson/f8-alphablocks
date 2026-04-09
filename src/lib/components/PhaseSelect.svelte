<script lang="ts">
  import SplashScreen from './SplashScreen.svelte'
  import { zhCurriculum } from '$lib/data/curriculum/zh'
  import { zhNumbersCurriculum } from '$lib/data/curriculum/zh-numbers'
  import { zhAnimalsCurriculum } from '$lib/data/curriculum/zh-animals'
  import { zhColoursCurriculum } from '$lib/data/curriculum/zh-colours'
  import { zhNounsCurriculum } from '$lib/data/curriculum/zh-nouns'
  import { selectPhase } from '$lib/stores/game.svelte'
  import { ensureAudioContext } from '$lib/audio/phonemePlayer'
  import { base } from '$app/paths'
  import type { ZhGameMode, CurriculumTrack } from '$lib/data/curriculum/types'

  const tracks: (CurriculumTrack & { image?: string })[] = [
    { id: 'zh-characters', name: '汉字 Characters', icon: '🀄', phases: zhCurriculum,          image: '/images/zh-transparent/objects/da-symbol.png' },
    { id: 'zh-numbers',    name: '数字 Numbers',    icon: '🔢', phases: zhNumbersCurriculum,    image: '/images/zh-transparent/numbers/1.png' },
    { id: 'zh-animals',    name: '动物 Animals',    icon: '🐻', phases: zhAnimalsCurriculum,    image: '/images/zh-transparent/animals/tiger.png' },
    { id: 'zh-colours',    name: '颜色形状 Colours & Shapes', icon: '🎨', phases: zhColoursCurriculum, image: '/images/zh-transparent/objects/colors.png' },
    { id: 'zh-nouns',      name: '名词 Nouns',      icon: '🏠', phases: zhNounsCurriculum,     image: '/images/zh-transparent/objects/house.png' },
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

  let openTrackId: string | null = $state(null)

  function toggleTrack(trackId: string) {
    ensureAudioContext()
    openTrackId = openTrackId === trackId ? null : trackId
  }

  function handleSelect(trackId: string, phase: number, gameMode: ZhGameMode | undefined) {
    ensureAudioContext()
    selectPhase(phase, gameMode ?? null, trackId)
  }
</script>

<div class="phase-select">
  <div class="splash-area">
    <SplashScreen />
  </div>

  <div class="pathways">
    {#each tracks as track}
      <button
        class="pathway-card"
        class:open={openTrackId === track.id}
        onclick={() => toggleTrack(track.id)}
      >
        <span class="pathway-icon">
          {#if track.image}
            <img src="{base}{track.image}" alt="{track.name}" class="pathway-img" />
          {:else}
            {track.icon}
          {/if}
        </span>
        <span class="pathway-info">
          <span class="pathway-name">{track.name}</span>
          <span class="pathway-count">{track.phases.length} games</span>
        </span>
        <span class="pathway-chevron" class:open={openTrackId === track.id}>▸</span>
      </button>

      {#if openTrackId === track.id}
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

  .section-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: rgba(255,255,255,0.6);
    margin: 0 0 12px;
  }

  .pathways {
    width: 100%;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .pathway-card {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 18px 20px;
    border: 2px solid rgba(255,255,255,0.2);
    border-radius: 20px;
    background: rgba(255,255,255,0.08);
    color: #fff;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s, border-color 0.2s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
  }

  .pathway-card:hover {
    background: rgba(255,255,255,0.12);
    border-color: rgba(255,255,255,0.35);
  }

  .pathway-card:active {
    transform: scale(0.98);
  }

  .pathway-card.open {
    background: rgba(255,255,255,0.15);
    border-color: rgba(255,255,255,0.4);
  }

  .pathway-icon {
    font-size: 2.2rem;
    flex-shrink: 0;
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .pathway-img {
    width: 56px;
    height: 56px;
    object-fit: contain;
  }

  .pathway-info {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .pathway-name {
    font-size: 1.15rem;
    font-weight: 800;
  }

  .pathway-count {
    font-size: 0.8rem;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
  }

  .pathway-chevron {
    font-size: 1.3rem;
    color: rgba(255,255,255,0.4);
    transition: transform 0.25s ease;
    flex-shrink: 0;
  }

  .pathway-chevron.open {
    transform: rotate(90deg);
  }

  .phases {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
    width: 100%;
    padding: 4px 0 8px 28px;
    animation: slide-down 0.25s ease;
  }

  @keyframes slide-down {
    from { opacity: 0; transform: translateY(-8px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .phase-btn {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 14px;
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
