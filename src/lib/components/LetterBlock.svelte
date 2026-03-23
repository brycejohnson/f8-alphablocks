<script lang="ts">
  import type { Phoneme } from '$lib/data/types'
  import { playTapClick, ensureAudioContext } from '$lib/audio/phonemePlayer'

  let {
    phoneme,
    active = false,
    complete = false,
    onTap,
  }: {
    phoneme: Phoneme
    active?: boolean
    complete?: boolean
    onTap?: () => void
  } = $props()

  function handleTap() {
    ensureAudioContext() // sync, inside user gesture → context created/resumed before any async work
    playTapClick()
    onTap?.()
  }
</script>

<button
  class="block"
  class:active
  class:complete
  style="--colour: {phoneme.colour}"
  onclick={handleTap}
  aria-label={phoneme.symbol}
>
  <span class="symbol">{phoneme.symbol}</span>
  {#if phoneme.isDigraph}
    <div class="hands-indicator"></div>
  {/if}
</button>

<style>
  .block {
    position: relative;
    width: clamp(64px, 14vw, 110px);
    height: clamp(64px, 14vw, 110px);
    border-radius: 16px;
    background: #ffffff;
    border: 5px solid var(--colour);
    box-shadow: 0 6px 0 rgba(0,0,0,0.25), 0 2px 12px rgba(0,0,0,0.2);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.12s ease, box-shadow 0.12s ease;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  /* Press feedback — only on actual tap/click */
  .block:active {
    transform: scale(0.92) translateY(3px);
    box-shadow: 0 2px 0 rgba(0,0,0,0.25), 0 1px 6px rgba(0,0,0,0.2);
  }

  /* "Next to tap" highlight — glow, not shrink */
  .block.active {
    box-shadow: 0 6px 0 rgba(0,0,0,0.25), 0 0 0 3px var(--colour), 0 0 16px var(--colour);
    animation: glow-pulse 1.2s ease-in-out infinite;
  }

  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 6px 0 rgba(0,0,0,0.25), 0 0 0 3px var(--colour), 0 0 16px var(--colour); }
    50%       { box-shadow: 0 6px 0 rgba(0,0,0,0.25), 0 0 0 3px var(--colour), 0 0 28px var(--colour); }
  }

  .block.complete {
    animation: pulse 0.4s ease;
  }

  .symbol {
    font-size: clamp(2.1rem, 7.5vw, 3.9rem);
    font-weight: 900;
    color: #1a1a1a;
    text-shadow: none;
    pointer-events: none;
  }

  /* Digraph: tiny "hand-holding" dot indicator at bottom corners */
  .hands-indicator {
    position: absolute;
    bottom: 6px;
    left: 50%;
    transform: translateX(-50%);
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--colour);
  }

  @keyframes pulse {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.12); }
    100% { transform: scale(1); }
  }
</style>
