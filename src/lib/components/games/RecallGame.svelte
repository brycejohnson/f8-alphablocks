<script lang="ts">
  import { game, celebrate, resetWord } from '$lib/stores/game.svelte'
  import { playPhoneme, speakFallback, playCelebration, ensureAudioContext, playTapClick, playWobble } from '$lib/audio/phonemePlayer'
  import { recordPhonemeTap, recordWordComplete } from '$lib/stores/progress.svelte'
  import { zhPhonemeMap } from '$lib/data/zh/phonemes'
  import { getActiveZhCurriculum } from '$lib/data/curriculum/zh-tracks'
  import CelebrationOverlay from '../CelebrationOverlay.svelte'

  let showPhase: 'showing' | 'hidden' | 'found' = $state('showing')
  let options: Array<{ id: string; text: string; phonemeId: string }> = $state([])
  let correctId = $state('')
  let wobbleId = $state('')

  // Build options and show target when word changes
  $effect(() => {
    if (game.activeWord) {
      buildOptions()
      showPhase = 'showing'
      wobbleId = ''

      // Show character briefly, then hide
      setTimeout(async () => {
        // Play pronunciation while showing
        const phonemeId = game.activeWord!.phonemeIds[0]
        await playPhoneme(phonemeId, 'zh')
      }, 200)

      setTimeout(() => {
        showPhase = 'hidden'
      }, 2000)
    }
  })

  function buildOptions() {
    if (!game.activeWord) return
    const word = game.activeWord
    correctId = word.id

    // Get all words available up to this phase
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
    if (showPhase !== 'hidden') return
    ensureAudioContext()
    playTapClick()

    if (opt.id === correctId) {
      showPhase = 'found'
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

<div class="recall-stage" style="position:relative">
  {#if game.activeWord}
    <!-- Target character — shown briefly then hidden -->
    {#if showPhase === 'showing'}
      <div class="target-card">
        <span class="target-char">{game.activeWord.text}</span>
        <span class="target-hint">Remember this!</span>
      </div>
    {:else}
      <div class="question-mark">?</div>
      <p class="instruction">Find the character you just saw</p>

      <div class="options">
        {#each options as opt}
          {@const phoneme = zhPhonemeMap.get(opt.phonemeId)}
          <button
            class="option-block"
            class:correct={showPhase === 'found' && opt.id === correctId}
            class:wobble={wobbleId === opt.id}
            style="--colour: {phoneme?.colour ?? '#fff'}"
            onclick={() => handleChoice(opt)}
            disabled={showPhase === 'found'}
          >
            <span class="char">{opt.text}</span>
          </button>
        {/each}
      </div>
    {/if}
  {:else}
    <p class="prompt">Loading…</p>
  {/if}
  <CelebrationOverlay />
</div>

<style>
  .recall-stage {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 28px;
  }

  .target-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    animation: fade-in 0.3s ease;
  }

  .target-char {
    font-size: clamp(5rem, 18vw, 8rem);
    font-weight: 900;
    color: #fff;
    text-shadow: 0 0 30px rgba(255,255,255,0.4);
  }

  .target-hint {
    font-size: 1.1rem;
    font-weight: 600;
    color: rgba(255,255,255,0.6);
    animation: pulse-hint 1.5s ease-in-out infinite;
  }

  .question-mark {
    font-size: 4rem;
    font-weight: 900;
    color: rgba(255,255,255,0.3);
    animation: fade-in 0.3s ease;
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

  .instruction {
    color: rgba(255,255,255,0.6);
    font-size: 1rem;
    font-weight: 600;
  }

  .prompt {
    color: rgba(255,255,255,0.6);
    font-size: 1.2rem;
    font-weight: 600;
  }

  @keyframes fade-in {
    from { opacity: 0; transform: scale(0.9); }
    to   { opacity: 1; transform: scale(1); }
  }

  @keyframes pulse-hint {
    0%, 100% { opacity: 0.6; }
    50% { opacity: 1; }
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
