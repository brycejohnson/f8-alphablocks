<script lang="ts">
  import { onDestroy } from 'svelte'
  import { game, nextPhoneme, celebrate, resetWord } from '$lib/stores/game.svelte'
  import { playPhoneme, speakFallback, playCelebration } from '$lib/audio/phonemePlayer'
  import { recordPhonemeTap, recordWordComplete } from '$lib/stores/progress.svelte'
  import LetterBlock from './LetterBlock.svelte'
  import { enPhonemeMap } from '$lib/data/en/phonemes'
  import { zhPhonemeMap } from '$lib/data/zh/phonemes'
  import type { Phoneme } from '$lib/data/types'

  // Particle system state — plain array, not $state (drawn to canvas, not rendered in template)
  let particles: Array<{
    x: number; y: number; vx: number; vy: number;
    colour: string; size: number; life: number; maxLife: number
  }> = []
  let canvas: HTMLCanvasElement | null = $state(null)
  let animFrame = 0
  let stageEl: HTMLElement | null = $state(null)

  const PARTICLE_COLOURS = ['#FFD700', '#FF6B35', '#4CAF50', '#2196F3', '#E91E63', '#9C27B0']

  // Derived: phonemes for the active word
  let phonemes = $derived.by(() => {
    if (!game.activeWord) return []
    const map = game.language === 'en' ? enPhonemeMap : zhPhonemeMap
    return game.activeWord.phonemeIds.map(id => map.get(id)).filter(Boolean) as Phoneme[]
  })

  // Derived: which phonemes are "lit" (tapped already in sequence)
  let litUpTo = $derived(game.wordComplete ? phonemes.length : game.phonemeIndex)

  // Auto-play sequence when wordComplete triggers
  $effect(() => {
    if (game.wordComplete) {
      handleWordComplete()
    }
  })

  // Trigger celebration particles when celebrating
  $effect(() => {
    if (game.celebrating) {
      spawnParticles()
      runParticles()
    }
  })

  async function handleWordComplete() {
    await delay(300)
    if (game.activeWord) {
      recordWordComplete(game.activeWord.id)
      const played = await playPhoneme(game.activeWord.id, game.language)
      if (!played) speakFallback(game.activeWord.text, game.language)
    }
    await delay(800)
    celebrate()
    playCelebration()
  }

  async function handleBlockTap(index: number) {
    if (game.wordComplete) return
    const p = phonemes[index]
    const lang = game.language
    // Always play the sound — lets the child explore any block
    const played = await playPhoneme(p.id, lang)
    if (!played) console.warn('[audio] playPhoneme failed for', p.id)
    if (index !== game.phonemeIndex) return // out of order — sound played, no game advance
    recordPhonemeTap(p.id)
    nextPhoneme()
  }

  function spawnParticles() {
    if (!stageEl) return
    const rect = stageEl.getBoundingClientRect()
    const cx = rect.width / 2
    const count = 80
    particles = Array.from({ length: count }, () => ({
      x: cx + (Math.random() - 0.5) * 60,
      y: rect.height * 0.3,
      vx: (Math.random() - 0.5) * 8,
      vy: -(Math.random() * 10 + 4),
      colour: PARTICLE_COLOURS[Math.floor(Math.random() * PARTICLE_COLOURS.length)],
      size: Math.random() * 10 + 6,
      life: 0,
      maxLife: 60 + Math.random() * 40,
    }))
  }

  function runParticles() {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function tick() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false
      for (const p of particles) {
        p.life++
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.35 // gravity
        p.vx *= 0.98
        const alpha = Math.max(0, 1 - p.life / p.maxLife)
        if (alpha > 0) {
          alive = true
          ctx.globalAlpha = alpha
          ctx.fillStyle = p.colour
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1
      if (alive) {
        animFrame = requestAnimationFrame(tick)
      } else {
        particles = []
        // Auto-advance after celebration
        setTimeout(() => resetWord(), 600)
      }
    }
    animFrame = requestAnimationFrame(tick)
  }

  function delay(ms: number) {
    return new Promise<void>(r => setTimeout(r, ms))
  }

  onDestroy(() => {
    if (animFrame) cancelAnimationFrame(animFrame)
  })
</script>

<div class="stage" bind:this={stageEl}>
  <!-- Particle canvas sits behind blocks -->
  <canvas
    bind:this={canvas}
    class="particles"
    width={stageEl?.clientWidth ?? 400}
    height={stageEl?.clientHeight ?? 300}
  ></canvas>

  {#if game.activeWord}
    <div class="word-label" class:complete={game.wordComplete}>
      {game.activeWord.text}
    </div>

    <div class="blocks" class:joined={game.wordComplete}>
      {#each phonemes as phoneme, i}
        <LetterBlock
          {phoneme}
          active={i === game.phonemeIndex && !game.wordComplete}
          complete={i < litUpTo}
          onTap={() => handleBlockTap(i)}
        />
        {#if i < phonemes.length - 1 && !game.wordComplete}
          <div class="gap"></div>
        {/if}
      {/each}
    </div>
  {:else}
    <p class="prompt">Tap a word to start!</p>
  {/if}
</div>

<style>
  .stage {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    overflow: hidden;
  }

  .particles {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 5;
  }

  .word-label {
    font-size: clamp(2rem, 8vw, 4rem);
    font-weight: 900;
    color: rgba(255,255,255,0.25);
    letter-spacing: 0.08em;
    transition: color 0.4s ease, transform 0.4s ease;
    z-index: 2;
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

  .gap {
    width: 8px;
  }

  .prompt {
    color: rgba(255,255,255,0.6);
    font-size: 1.2rem;
    font-weight: 600;
  }
</style>
