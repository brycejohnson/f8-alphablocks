<script lang="ts">
  import { game, celebrate, resetWord } from '$lib/stores/game.svelte'
  import { playPhoneme, playCelebration, ensureAudioContext, playTapClick, playWobble } from '$lib/audio/phonemePlayer'
  import { recordPhonemeTap, recordWordComplete } from '$lib/stores/progress.svelte'
  import { zhPhonemeMap } from '$lib/data/zh/phonemes'
  import { base } from '$app/paths'
  import { getActiveZhCurriculum } from '$lib/data/curriculum/zh-tracks'
  import CelebrationOverlay from '../CelebrationOverlay.svelte'

  let options: Array<{ id: string; text: string; phonemeId: string }> = $state([])
  let correctId = $state('')
  let wobbleId = $state('')
  let answered = $state(false)
  let targetEmoji = $state('')
  let targetPhoneme = $derived(game.activeWord ? zhPhonemeMap.get(game.activeWord.phonemeIds[0]) : undefined)

  // Build options when word changes
  $effect(() => {
    if (game.activeWord) {
      buildOptions()
      answered = false
      wobbleId = ''
    }
  })

  function buildOptions() {
    if (!game.activeWord) return
    const word = game.activeWord
    correctId = word.id
    const phoneme = zhPhonemeMap.get(word.phonemeIds[0])
    targetEmoji = word.emoji ?? phoneme?.emoji ?? '❓'

    const phase = getActiveZhCurriculum().find(p => p.phase === game.activePhase)
    if (!phase) return

    const others = phase.words.filter(w => w.id !== word.id)
    const shuffled = others.sort(() => Math.random() - 0.5)
    const distractors = shuffled.slice(0, 2)

    const all = [word, ...distractors].map(w => ({
      id: w.id,
      text: w.text,
      phonemeId: w.phonemeIds[0],
    }))

    options = all.sort(() => Math.random() - 0.5)
  }

  async function handleChoice(opt: { id: string; text: string; phonemeId: string }) {
    if (answered) return
    ensureAudioContext()
    playTapClick()

    if (opt.id === correctId) {
      answered = true
      await playPhoneme(opt.phonemeId, 'zh')
      recordPhonemeTap(opt.phonemeId)
      recordWordComplete(opt.id)

      await delay(600)
      game.wordComplete = true
      celebrate()
      playCelebration()

      await delay(1500)
      resetWord()
    } else {
      wobbleId = opt.id
      playWobble()
      setTimeout(() => { wobbleId = '' }, 500)
    }
  }

  function delay(ms: number) {
    return new Promise<void>(r => setTimeout(r, ms))
  }
</script>

<div class="picture-stage" style="position:relative">
  <!-- Show the picture/emoji -->
  <div class="picture-card">
    {#if targetPhoneme?.image}
      <img src="{base}{targetPhoneme.image}" alt="{targetPhoneme.meaning}" class="picture-image" />
    {:else}
      <span class="emoji">{targetEmoji}</span>
    {/if}
  </div>

  <p class="instruction">Which character matches?</p>

  <!-- Character options -->
  <div class="options">
    {#each options as opt}
      {@const phoneme = zhPhonemeMap.get(opt.phonemeId)}
      <button
        class="option-block"
        class:correct={answered && opt.id === correctId}
        class:wobble={wobbleId === opt.id}
        style="--colour: {phoneme?.colour ?? '#fff'}"
        onclick={() => handleChoice(opt)}
        disabled={answered}
      >
        <span class="char">{opt.text}</span>
      </button>
    {/each}
  </div>
  <CelebrationOverlay />
</div>

<style>
  .picture-stage {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 28px;
  }

  .picture-card {
    width: clamp(120px, 28vw, 180px);
    height: clamp(120px, 28vw, 180px);
    border-radius: 24px;
    background: rgba(255,255,255,0.1);
    border: 3px solid rgba(255,255,255,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .emoji {
    font-size: clamp(3.5rem, 12vw, 6rem);
  }

  .picture-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 20px;
  }

  .instruction {
    color: rgba(255,255,255,0.6);
    font-size: 1rem;
    font-weight: 600;
  }

  .options {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
  }

  .option-block {
    width: clamp(80px, 22vw, 130px);
    height: clamp(80px, 22vw, 130px);
    border-radius: 20px;
    border: 5px solid var(--colour);
    background: #fff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 6px 0 rgba(0,0,0,0.25);
    transition: transform 0.12s ease, box-shadow 0.12s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .option-block:active {
    transform: scale(0.93) translateY(3px);
    box-shadow: 0 2px 0 rgba(0,0,0,0.25);
  }

  .option-block.correct {
    box-shadow: 0 0 0 4px var(--colour), 0 0 24px var(--colour);
    transform: scale(1.08);
  }

  .option-block.wobble {
    animation: wobble 0.4s ease;
  }

  .option-block:disabled {
    cursor: default;
  }

  .char {
    font-size: clamp(2.2rem, 8vw, 4rem);
    font-weight: 900;
    color: #1a1a1a;
    pointer-events: none;
  }

  @keyframes wobble {
    0%   { transform: translateX(0); }
    20%  { transform: translateX(-8px) rotate(-2deg); }
    40%  { transform: translateX(8px) rotate(2deg); }
    60%  { transform: translateX(-5px) rotate(-1deg); }
    80%  { transform: translateX(5px) rotate(1deg); }
    100% { transform: translateX(0); }
  }
</style>
