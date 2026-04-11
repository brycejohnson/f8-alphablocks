<script lang="ts">
  import { game, backToPhases } from '$lib/stores/game.svelte'
  import { settings, toggleLanguage } from '$lib/stores/settings.svelte'

  let showBack = $derived(settings.language === 'zh' && game.screen === 'playing')
</script>

<div class="hud">
  <div class="hud-left">
    {#if showBack}
      <button class="back-btn" onclick={backToPhases}>
        <span class="back-arrow">◀</span>
        <span class="back-text">
          <span>Back</span>
          <span class="back-zh">返回</span>
        </span>
      </button>
    {/if}
    <div class="score">⭐ {game.score}</div>
  </div>
  <!-- Language toggle disabled — Chinese mode is primary, English is secondary/future -->
  <!-- <button class="lang-toggle" onclick={toggleLanguage}>
    {settings.language === 'en' ? '中文' : 'English'}
  </button> -->
</div>

<style>
  .hud {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;
    z-index: 10;
    pointer-events: none;
  }

  .hud-left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .score {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0,0,0,0.4);
  }

  .back-btn {
    pointer-events: all;
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(255,255,255,0.15);
    border: 2px solid rgba(255,255,255,0.4);
    border-radius: 20px;
    color: #fff;
    font-size: 0.9rem;
    font-weight: 700;
    padding: 6px 14px;
    cursor: pointer;
    backdrop-filter: blur(4px);
    transition: background 0.2s;
    -webkit-tap-highlight-color: transparent;
  }

  .back-arrow {
    color: #4CAF50;
    font-size: 1.1rem;
  }

  .back-text {
    display: flex;
    flex-direction: column;
    align-items: center;
    line-height: 1.1;
  }

  .back-zh {
    font-size: 0.55rem;
    color: rgba(255,255,255,0.6);
    font-weight: 600;
  }

  .back-btn:hover {
    background: rgba(255,255,255,0.25);
  }

  .lang-toggle {
    pointer-events: all;
    background: rgba(255,255,255,0.2);
    border: 2px solid rgba(255,255,255,0.6);
    border-radius: 24px;
    color: #fff;
    font-size: 1rem;
    font-weight: 700;
    padding: 6px 18px;
    cursor: pointer;
    backdrop-filter: blur(4px);
    transition: background 0.2s;
  }

  .lang-toggle:hover {
    background: rgba(255,255,255,0.35);
  }
</style>
