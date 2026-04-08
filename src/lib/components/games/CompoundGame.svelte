<script lang="ts">
  import { game, nextPhoneme, celebrate, resetWord } from '$lib/stores/game.svelte'
  import { playPhoneme, speakFallback, playCelebration, ensureAudioContext, playTapClick } from '$lib/audio/phonemePlayer'
  import { recordPhonemeTap, recordWordComplete } from '$lib/stores/progress.svelte'
  import { zhPhonemeMap } from '$lib/data/zh/phonemes'
  import { base } from '$app/paths'
  import CelebrationOverlay from '../CelebrationOverlay.svelte'
  import type { Phoneme } from '$lib/data/types'

  // Derived: phonemes for the active word (each is a whole character)
  let phonemes = $derived.by(() => {
    if (!game.activeWord) return []
    return game.activeWord.phonemeIds.map(id => zhPhonemeMap.get(id)).filter(Boolean) as Phoneme[]
  })

  let litUpTo = $derived(game.wordComplete ? phonemes.length : game.phonemeIndex)
  let showCompound = $state(false)
  let revealedEmojis: Set<number> = $state(new Set())

  // Reset state when word changes
  $effect(() => {
    if (game.activeWord) {
      showCompound = false
      revealedEmojis = new Set()
    }
  })

  // Handle word complete — play compound pronunciation, show compound image
  $effect(() => {
    if (game.wordComplete) {
      handleWordComplete()
    }
  })

  // Celebration handled by CelebrationOverlay component

  async function handleWordComplete() {
    // Pause to let the child see the characters slide together
    await delay(800)
    showCompound = true
    // Pause again to let the compound picture + meaning register visually
    await delay(600)
    if (game.activeWord) {
      recordWordComplete(game.activeWord.id)
      // Play the compound word audio
      const played = await playPhoneme(game.activeWord.id, 'zh')
      if (!played) speakFallback(game.activeWord.text, 'zh')
    }
    await delay(1800)
    celebrate()
    playCelebration()
  }

  async function handleBlockTap(index: number) {
    if (game.wordComplete) return
    ensureAudioContext()
    playTapClick()

    const p = phonemes[index]
    const played = await playPhoneme(p.id, 'zh')
    if (!played) console.warn('[audio] playPhoneme failed for', p.id)

    if (index !== game.phonemeIndex) return // out of order
    revealedEmojis = new Set([...revealedEmojis, index])
    recordPhonemeTap(p.id)
    nextPhoneme()
  }

  function delay(ms: number) {
    return new Promise<void>(r => setTimeout(r, ms))
  }
</script>

<div class="compound-stage" style="position:relative">

  {#if game.activeWord}
    <!-- Compound result — emoji above, component emojis to sides -->
    {#if showCompound}
      <div class="compound-reveal">
        {#if game.activeWord.image}
          <img src="{base}{game.activeWord.image}" alt="{game.activeWord.meaning}" class="compound-image" />
        {:else if game.activeWord.digits}
          <div class="component-emojis">
            {#each game.activeWord.digits as d}
              <img src="{base}/images/zh-transparent/numbers/{d}.png" alt="{String(d)}" class="component-image" />
            {/each}
          </div>
        {:else if game.activeWord.emoji}
          <div class="compound-emoji">{game.activeWord.emoji}</div>
        {/if}
        <div class="compound-meaning">{game.activeWord.meaning ?? ''}</div>
      </div>
    {/if}

    <!-- The combined word text -->
    <div class="word-label" class:complete={game.wordComplete}>
      {game.activeWord.text}
    </div>

    <!-- Character blocks — tap in sequence to combine -->
    <div class="blocks" class:joined={game.wordComplete}>
      {#each phonemes as phoneme, i}
        <div class="block-with-emoji">
          <div class="block-emoji" class:visible={revealedEmojis.has(i)}>
            {#if phoneme.image}
              <img src="{base}{phoneme.image}" alt="{phoneme.meaning}" class="block-image" />
            {:else}
              {phoneme.emoji ?? ''}
            {/if}
          </div>
          <button
            class="char-block"
            class:active={i === game.phonemeIndex && !game.wordComplete}
            class:complete={i < litUpTo}
            style="--colour: {phoneme.colour}"
            onclick={() => handleBlockTap(i)}
          >
            <span class="char">{phoneme.symbol}</span>
            {#if !game.wordComplete}
              <span class="char-meaning">{phoneme.meaning ?? ''}</span>
            {/if}
          </button>
        </div>
        {#if i < phonemes.length - 1 && !game.wordComplete}
          <div class="plus">+</div>
        {/if}
      {/each}
    </div>

    {#if !game.wordComplete}
      <p class="instruction">Tap each character in order!</p>
    {/if}
  {:else}
    <p class="prompt">Loading…</p>
  {/if}
  <CelebrationOverlay />
</div>

<style>
  .compound-stage {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    overflow: hidden;
    padding-top: 0;
  }

  .block-with-emoji {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .block-emoji {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) scale(0.3);
    font-size: 2.2rem;
    opacity: 0;
    transition: opacity 0.35s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  }

  .block-emoji.visible {
    opacity: 1;
    transform: translateX(-50%) scale(1);
  }

  .compound-reveal {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    animation: pop-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    z-index: 2;
  }

  .component-emojis {
    display: flex;
    gap: 8px;
  }

  .component-emoji {
    font-size: 2rem;
    opacity: 0.7;
  }

  .component-image {
    width: 120px;
    height: 120px;
    object-fit: contain;
    opacity: 0.8;
  }

  .block-image {
    width: 60px;
    height: 60px;
    object-fit: contain;
  }

  .compound-image {
    width: 140px;
    height: 140px;
    object-fit: contain;
  }

  .compound-emoji {
    font-size: 4rem;
  }

  .compound-meaning {
    font-size: 1.2rem;
    font-weight: 700;
    color: rgba(255,255,255,0.8);
    text-transform: capitalize;
  }

  .word-label {
    font-size: clamp(2rem, 8vw, 4rem);
    font-weight: 900;
    color: rgba(255,255,255,0.25);
    letter-spacing: 0.08em;
    transition: color 0.4s ease, transform 0.4s ease;
    z-index: 2;
    margin-top: 10px;
    margin-bottom: 80px;
  }

  .word-label.complete {
    color: #fff;
    transform: scale(1.15);
    text-shadow: 0 0 30px rgba(255,215,0,0.8);
  }

  .blocks {
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 2;
    transition: gap 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .blocks.joined {
    gap: 0;
  }

  .plus {
    font-size: 2rem;
    font-weight: 900;
    color: rgba(255,255,255,0.4);
  }

  .char-block {
    width: clamp(80px, 20vw, 130px);
    height: clamp(90px, 22vw, 150px);
    border-radius: 20px;
    border: 5px solid var(--colour);
    background: #fff;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    box-shadow: 0 6px 0 rgba(0,0,0,0.25), 0 2px 12px rgba(0,0,0,0.2);
    transition: transform 0.12s ease, box-shadow 0.12s ease;
    -webkit-tap-highlight-color: transparent;
    user-select: none;
  }

  .char-block:active {
    transform: scale(0.92) translateY(3px);
    box-shadow: 0 2px 0 rgba(0,0,0,0.25);
  }

  .char-block.active {
    box-shadow: 0 6px 0 rgba(0,0,0,0.25), 0 0 0 3px var(--colour), 0 0 16px var(--colour);
    animation: glow-pulse 1.2s ease-in-out infinite;
  }

  .char-block.complete {
    animation: pulse 0.4s ease;
  }

  .char {
    font-size: clamp(2.2rem, 8vw, 3.5rem);
    font-weight: 900;
    color: #1a1a1a;
    pointer-events: none;
  }

  .char-meaning {
    font-size: 0.7rem;
    font-weight: 600;
    color: rgba(0,0,0,0.4);
    pointer-events: none;
  }

  .instruction {
    color: rgba(255,255,255,0.5);
    font-size: 1rem;
    font-weight: 600;
    z-index: 2;
  }

  .prompt {
    color: rgba(255,255,255,0.6);
    font-size: 1.2rem;
    font-weight: 600;
  }

  @keyframes glow-pulse {
    0%, 100% { box-shadow: 0 6px 0 rgba(0,0,0,0.25), 0 0 0 3px var(--colour), 0 0 16px var(--colour); }
    50%       { box-shadow: 0 6px 0 rgba(0,0,0,0.25), 0 0 0 3px var(--colour), 0 0 28px var(--colour); }
  }

  @keyframes pulse {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.12); }
    100% { transform: scale(1); }
  }

  @keyframes pop-in {
    from { opacity: 0; transform: scale(0.5); }
    to   { opacity: 1; transform: scale(1); }
  }
</style>
