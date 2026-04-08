<script lang="ts">
  import { game, nextPhoneme, celebrate, resetWord } from '$lib/stores/game.svelte'
  import { playPhoneme, speakFallback, playCelebration, ensureAudioContext, playTapClick } from '$lib/audio/phonemePlayer'
  import { recordPhonemeTap, recordWordComplete } from '$lib/stores/progress.svelte'
  import { zhPhonemeMap } from '$lib/data/zh/phonemes'
  import { base } from '$app/paths'
  import CelebrationOverlay from '../CelebrationOverlay.svelte'

  let revealed = $state(false)
  let showEmoji = $state(false)

  // Reset state when word changes
  $effect(() => {
    if (game.activeWord) {
      revealed = false
      showEmoji = false
    }
  })

  async function handleTap() {
    if (!game.activeWord || revealed) return
    ensureAudioContext()
    playTapClick()

    // Reveal the character
    revealed = true

    // Play pronunciation
    const phonemeId = game.activeWord.phonemeIds[0]
    const played = await playPhoneme(phonemeId, 'zh')
    if (!played) speakFallback(game.activeWord.text, 'zh')

    // Show emoji after a beat
    await delay(400)
    showEmoji = true

    // Record progress
    recordPhonemeTap(phonemeId)
    recordWordComplete(game.activeWord.id)

    // Celebrate after viewing
    await delay(1200)
    nextPhoneme() // marks wordComplete since there's only 1 phoneme
    game.wordComplete = true
    celebrate()
    playCelebration()

    // CelebrationOverlay handles resetWord after stars finish
    // Don't reset revealed/showEmoji here — let the content stay visible during celebration
  }

  function delay(ms: number) {
    return new Promise<void>(r => setTimeout(r, ms))
  }
</script>

<div class="reveal-stage" style="position:relative">
  {#if game.activeWord}
    {@const word = game.activeWord}
    {@const phoneme = zhPhonemeMap.get(word.phonemeIds[0])}

    <!-- Image/emoji appears above after reveal -->
    <div class="emoji-area" class:visible={showEmoji}>
      {#if phoneme?.image}
        <img src="{base}{phoneme.image}" alt="{phoneme.meaning}" class="char-image" />
      {:else}
        {word.emoji ?? phoneme?.emoji ?? ''}
      {/if}
    </div>

    <!-- The character block — silhouette until tapped -->
    <button
      class="char-block"
      class:revealed
      style="--colour: {phoneme?.colour ?? '#fff'}"
      onclick={handleTap}
    >
      <span class="char">{word.text}</span>
    </button>

    <!-- Meaning label after reveal -->
    <div class="meaning" class:visible={showEmoji}>
      {word.meaning ?? phoneme?.meaning ?? ''}
    </div>

    {#if !revealed}
      <p class="hint">Tap to reveal!</p>
    {/if}
  {:else}
    <p class="prompt"></p>
  {/if}
  <CelebrationOverlay />
</div>

<style>
  .reveal-stage {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 24px;
  }

  .emoji-area {
    font-size: 4rem;
    opacity: 0;
    transform: scale(0.5);
    transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
    min-height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .emoji-area.visible {
    opacity: 1;
    transform: scale(1);
  }

  .char-image {
    width: clamp(100px, 25vw, 160px);
    height: clamp(100px, 25vw, 160px);
    object-fit: contain;
  }

  .char-block {
    width: clamp(120px, 30vw, 200px);
    height: clamp(120px, 30vw, 200px);
    border-radius: 24px;
    border: 6px solid var(--colour);
    background: #1a1a2e;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.4s ease, transform 0.15s ease, box-shadow 0.4s ease;
    box-shadow: 0 8px 0 rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.3);
    -webkit-tap-highlight-color: transparent;
  }

  .char-block:active {
    transform: scale(0.94) translateY(4px);
    box-shadow: 0 2px 0 rgba(0,0,0,0.3), 0 2px 8px rgba(0,0,0,0.3);
  }

  .char-block.revealed {
    background: #fff;
    box-shadow: 0 8px 0 rgba(0,0,0,0.2), 0 0 30px var(--colour);
  }

  .char {
    font-size: clamp(3.5rem, 12vw, 6rem);
    font-weight: 900;
    color: transparent;
    transition: color 0.4s ease;
    pointer-events: none;
  }

  .char-block.revealed .char {
    color: #1a1a1a;
  }

  .meaning {
    font-size: 1.3rem;
    font-weight: 700;
    color: rgba(255,255,255,0.8);
    opacity: 0;
    transition: opacity 0.4s ease;
    text-transform: capitalize;
  }

  .meaning.visible {
    opacity: 1;
  }

  .hint {
    color: rgba(255,255,255,0.5);
    font-size: 1rem;
    font-weight: 600;
    animation: pulse-hint 2s ease-in-out infinite;
  }

  @keyframes pulse-hint {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  .prompt {
    color: rgba(255,255,255,0.6);
    font-size: 1.2rem;
    font-weight: 600;
  }
</style>
