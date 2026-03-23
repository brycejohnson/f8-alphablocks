<script lang="ts">
  import { game } from '$lib/stores/game.svelte'
  import { settings, toggleLanguage } from '$lib/stores/settings.svelte'
</script>

<div class="hud">
  <div class="score">⭐ {game.score}</div>
  <button class="lang-toggle" onclick={toggleLanguage}>
    {settings.language === 'en' ? '中文' : 'English'}
  </button>
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

  .score {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    text-shadow: 0 2px 4px rgba(0,0,0,0.4);
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
