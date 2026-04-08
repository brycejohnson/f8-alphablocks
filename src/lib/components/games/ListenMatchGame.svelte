<script lang="ts">
  import { game, celebrate, resetWord } from '$lib/stores/game.svelte'
  import { playPhoneme, speakFallback, playCelebration, ensureAudioContext, playTapClick, playWobble } from '$lib/audio/phonemePlayer'
  import { recordPhonemeTap, recordWordComplete } from '$lib/stores/progress.svelte'
  import { zhPhonemeMap } from '$lib/data/zh/phonemes'
  import { getActiveZhCurriculum } from '$lib/data/curriculum/zh-tracks'
  import CelebrationOverlay from '../CelebrationOverlay.svelte'

  let options: Array<{ id: string; text: string; phonemeId: string }> = $state([])
  let correctId = $state('')
  let wobbleId = $state('')
  let answered = $state(false)

  // Build options when word changes
  $effect(() => {
    if (game.activeWord) {
      buildOptions()
      answered = false
      wobbleId = ''
      // Auto-play the sound after a short delay
      setTimeout(() => playTarget(), 300)
    }
  })

  function buildOptions() {
    if (!game.activeWord) return
    const word = game.activeWord
    correctId = word.id

    // Get all words from this phase for distractors
    const phase = getActiveZhCurriculum().find(p => p.phase === game.activePhase)
    if (!phase) return

    const others = phase.words.filter(w => w.id !== word.id)
    // Shuffle and pick 1-2 distractors
    const shuffled = others.sort(() => Math.random() - 0.5)
    const distractors = shuffled.slice(0, 2)

    const all = [word, ...distractors].map(w => ({
      id: w.id,
      text: w.text,
      phonemeId: w.phonemeIds[0],
    }))

    // Shuffle final order
    options = all.sort(() => Math.random() - 0.5)
  }

  async function playTarget() {
    if (!game.activeWord) return
    const phonemeId = game.activeWord.phonemeIds[0]
    const played = await playPhoneme(phonemeId, 'zh')
    if (!played) speakFallback(game.activeWord.text, 'zh')
  }

  async function handleChoice(opt: { id: string; text: string; phonemeId: string }) {
    if (answered) return
    ensureAudioContext()
    playTapClick()

    if (opt.id === correctId) {
      // Correct!
      answered = true
      await playPhoneme(opt.phonemeId, 'zh')
      recordPhonemeTap(opt.phonemeId)
      recordWordComplete(opt.id)

      await delay(600)
      game.wordComplete = true
      celebrate()
      playCelebration()

      // CelebrationOverlay handles resetWord after stars finish
    } else {
      // Wrong — wobble + soft sound
      wobbleId = opt.id
      playWobble()
      setTimeout(() => { wobbleId = '' }, 500)
    }
  }

  function delay(ms: number) {
    return new Promise<void>(r => setTimeout(r, ms))
  }
</script>

<div class="listen-stage" style="position:relative">
  <!-- Replay button -->
  <button class="play-btn" onclick={playTarget}>
    🔊
    <span>Listen again</span>
  </button>

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

  <p class="instruction">Which character did you hear?</p>
  <CelebrationOverlay />
</div>

<style>
  .listen-stage {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
  }

  .play-btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.1);
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    width: 90px;
    height: 90px;
    font-size: 2.5rem;
    cursor: pointer;
    color: #fff;
    transition: background 0.2s, transform 0.1s;
    -webkit-tap-highlight-color: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .play-btn span {
    display: none;
  }

  .play-btn:active {
    transform: scale(0.93);
  }

  .play-btn:hover {
    background: rgba(255,255,255,0.2);
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

  @keyframes wobble {
    0%   { transform: translateX(0); }
    20%  { transform: translateX(-8px) rotate(-2deg); }
    40%  { transform: translateX(8px) rotate(2deg); }
    60%  { transform: translateX(-5px) rotate(-1deg); }
    80%  { transform: translateX(5px) rotate(1deg); }
    100% { transform: translateX(0); }
  }
</style>
