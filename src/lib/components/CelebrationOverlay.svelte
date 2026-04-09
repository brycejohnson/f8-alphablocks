<script lang="ts">
  import { onDestroy } from 'svelte'
  import { game, resetWord } from '$lib/stores/game.svelte'

  interface Props {
    onCelebrationEnd?: () => void
  }
  let { onCelebrationEnd }: Props = $props()

  const STAR_COLOURS = ['#FFD700', '#FF6B35', '#4CAF50', '#2196F3', '#E91E63', '#9C27B0', '#00BCD4', '#FF9800']

  interface Star {
    x: number; y: number
    vx: number; vy: number
    size: number; rotation: number; rotSpeed: number
    colour: string; life: number; maxLife: number; points: number
  }

  let stars: Star[] = []
  let canvas: HTMLCanvasElement | null = $state(null)
  let wrap: HTMLElement | null = $state(null)
  let animFrame = 0
  let running = false

  $effect(() => {
    if (game.celebrating && !running) {
      running = true
      spawnStars()
      runAnimation()
    }
  })

  function spawnStars() {
    if (!wrap) return
    const rect = wrap.getBoundingClientRect()
    const cx = rect.width / 2
    const count = 80

    // Radial burst — slowed 40% from original
    const cy = rect.height * 0.35
    stars = Array.from({ length: count }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = (3 + Math.random() * 9) * 0.6 // 40% slower
      return {
        x: cx + (Math.random() - 0.5) * 40,
        y: cy + (Math.random() - 0.5) * 30,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.8, // upward bias, reduced
        size: 12 + Math.random() * 22,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.15,
        colour: STAR_COLOURS[Math.floor(Math.random() * STAR_COLOURS.length)],
        life: 0,
        maxLife: 70 + Math.random() * 50, // longer life to match slower speed
        points: Math.random() > 0.3 ? 5 : 4,
      }
    })
  }

  function drawStar(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, points: number, rotation: number) {
    const inner = r * 0.4
    ctx.beginPath()
    for (let i = 0; i < points * 2; i++) {
      const angle = rotation + (i * Math.PI) / points
      const radius = i % 2 === 0 ? r : inner
      const sx = x + Math.cos(angle) * radius
      const sy = y + Math.sin(angle) * radius
      if (i === 0) ctx.moveTo(sx, sy)
      else ctx.lineTo(sx, sy)
    }
    ctx.closePath()
    ctx.fill()
  }

  function runAnimation() {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    function tick() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      let alive = false

      for (const s of stars) {
        s.life++
        s.x += s.vx
        s.y += s.vy
        s.vy += 0.08 // very light gravity — stars float more
        s.vx *= 0.985
        s.rotation += s.rotSpeed

        const progress = s.life / s.maxLife
        const alpha = Math.max(0, 1 - progress)
        const scale = progress < 0.15 ? progress / 0.15 : 1

        if (alpha > 0) {
          alive = true
          ctx.globalAlpha = alpha
          ctx.fillStyle = s.colour
          drawStar(ctx, s.x, s.y, s.size * scale, s.points, s.rotation)
        }
      }

      ctx.globalAlpha = 1
      if (alive) {
        animFrame = requestAnimationFrame(tick)
      } else {
        stars = []
        running = false
        game.celebrating = false
        if (onCelebrationEnd) {
          onCelebrationEnd()
        } else {
          setTimeout(() => resetWord(), 500)
        }
      }
    }
    animFrame = requestAnimationFrame(tick)
  }

  onDestroy(() => {
    if (animFrame) cancelAnimationFrame(animFrame)
  })
</script>

<div class="celebration-wrap" bind:this={wrap}>
  <canvas
    bind:this={canvas}
    class="celebration-canvas"
    width={wrap?.clientWidth ?? 400}
    height={wrap?.clientHeight ?? 600}
  ></canvas>
</div>

<style>
  .celebration-wrap {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 20;
  }

  .celebration-canvas {
    width: 100%;
    height: 100%;
  }
</style>
