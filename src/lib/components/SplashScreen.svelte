<script lang="ts">
  /**
   * Splash screen — volcano erupting character blocks
   */
  import { base } from '$app/paths'

  const eruptingChars = ['火', '山', '水', '人', '大']
  const charColours = ['#E53935', '#2E7D32', '#1565C0', '#6D4C41', '#B71C1C']

  // Blocks that spill to the sides
  const spillChars = ['小', '日', '月', '木', '果', '一', '二', '三']
  const spillColours = ['#42A5F5', '#F9A825', '#78909C', '#558B2F', '#E91E63', '#1565C0', '#2E7D32', '#E65100']

  // Title characters in blocks
  const titleChars = [
    { char: '火', colour: '#E53935' },
    { char: '山', colour: '#2E7D32' },
    { char: '蛙', colour: '#B7D019' },
  ]
</script>

<div class="splash">
  <!-- Erupting character blocks from volcano top -->
  <div class="eruption-area">
    {#each eruptingChars as char, i}
      <div
        class="erupting-block"
        style="
          --colour: {charColours[i]};
          --delay: {i * 0.3}s;
          --drift: {(i % 2 === 0 ? -1 : 1) * (15 + Math.random() * 30)}px;
          --height: {60 + Math.random() * 80}px;
        "
      >
        {char}
      </div>
    {/each}
  </div>

  <!-- Blocks spilling to the sides -->
  <div class="spill-area">
    {#each spillChars as char, i}
      {@const delay = 0.5 + i * 0.35}
      {@const drift = (i % 2 === 0 ? -1 : 1) * (80 + Math.random() * 70)}
      {@const rise = 40 + Math.random() * 50}
      <div
        class="spill-block"
        style="
          --colour: {spillColours[i]};
          --delay: {delay}s;
          --drift: {drift}px;
          --rise: {rise}px;
        "
      >
        {char}
      </div>
      <!-- Fragment pieces that appear when block lands -->
      {#each Array(8) as _, f}
        <div
          class="fragment"
          style="
            --colour: {spillColours[i]};
            --delay: {delay}s;
            --drift: {drift}px;
            --rise: {rise}px;
            --frag-x: {(Math.random() - 0.5) * 50}px;
            --frag-y: {-5 + Math.random() * 35}px;
            --frag-size: {2 + Math.random() * 4}px;
          "
        ></div>
      {/each}
    {/each}
  </div>

  <!-- Smoke puffs from volcano top -->
  <div class="smoke-area">
    <!-- Rising smoke cluster -->
    {#each Array(24) as _, i}
      <div
        class="smoke-puff"
        style="
          --delay: {i * 0.3}s;
          --drift: {(Math.random() - 0.5) * 50}px;
          --size: {25 + Math.random() * 40}px;
        "
      ></div>
    {/each}
    <!-- Spilling smoke that arcs to sides -->
    {#each Array(14) as _, i}
      <div
        class="smoke-spill"
        style="
          --delay: {i * 0.7}s;
          --drift: {(i % 2 === 0 ? -1 : 1) * (100 + Math.random() * 100)}px;
          --size: {18 + Math.random() * 20}px;
          --rise: {50 + Math.random() * 40}px;
        "
      ></div>
    {/each}
  </div>

  <!-- Clay title -->
  <img src="{base}/images/zh-transparent/objects/vf-title.png" alt="Volcano Frog" class="vf-title" />

  <!-- Claymation volcano + frog -->
  <div class="volcano-scene">
    <img src="{base}/images/zh-transparent/objects/volcano.png" alt="Volcano" class="volcano-img" />
    <img src="{base}/images/zh-transparent/objects/volcanofrog.png" alt="Volcano Frog" class="frog-img" />
  </div>
  <p class="tagline">Mandarin Learning Game</p>
</div>

<style>
  .splash {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
    gap: 2px;
  }

  .smoke-area {
    position: absolute;
    top: calc(50% - 20px);
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 120px;
    pointer-events: none;
    z-index: 0;
  }

  .smoke-puff {
    position: absolute;
    bottom: 0;
    left: calc(50% - var(--size) / 2);
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: rgba(200, 200, 210, 0.4);
    filter: blur(3px);
    animation: smoke-rise 4s ease-out infinite;
    animation-delay: var(--delay);
    opacity: 0;
  }

  @keyframes smoke-rise {
    0% {
      opacity: 0;
      transform: translateY(0) translateX(0) scale(0.3);
    }
    8% {
      opacity: 0.65;
      transform: translateY(-15px) translateX(calc(var(--drift) * 0.1)) scale(0.8);
    }
    25% {
      opacity: 0.55;
      transform: translateY(-40px) translateX(calc(var(--drift) * 0.4)) scale(1.3);
    }
    55% {
      opacity: 0.35;
      transform: translateY(-80px) translateX(calc(var(--drift) * 0.8)) scale(1.8);
    }
    100% {
      opacity: 0;
      transform: translateY(-130px) translateX(var(--drift)) scale(2);
    }
  }

  .smoke-spill {
    position: absolute;
    bottom: 0;
    left: calc(50% - var(--size) / 2);
    width: var(--size);
    height: var(--size);
    border-radius: 50%;
    background: rgba(200, 200, 210, 0.3);
    filter: blur(4px);
    animation: smoke-spill 5s ease-out infinite;
    animation-delay: var(--delay);
    opacity: 0;
  }

  @keyframes smoke-spill {
    0% {
      opacity: 0;
      transform: translateY(0) translateX(0) scale(0.3);
    }
    8% {
      opacity: 0.35;
      transform: translateY(calc(-1 * var(--rise))) translateX(calc(var(--drift) * 0.1)) scale(0.8);
    }
    30% {
      opacity: 0.3;
      transform: translateY(calc(-1 * var(--rise) + 5px)) translateX(calc(var(--drift) * 0.5)) scale(1.2);
    }
    60% {
      opacity: 0.18;
      transform: translateY(calc(-1 * var(--rise) + 10px)) translateX(calc(var(--drift) * 0.9)) scale(1.6);
    }
    85% {
      opacity: 0.08;
      transform: translateY(calc(-1 * var(--rise) + 12px)) translateX(calc(var(--drift) * 1.2)) scale(1.9);
    }
    100% {
      opacity: 0;
      transform: translateY(calc(-1 * var(--rise) + 12px)) translateX(calc(var(--drift) * 1.3)) scale(2);
    }
  }

  .volcano-scene {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .volcano-img {
    width: 220px;
    height: 220px;
    object-fit: contain;
  }

  .frog-img {
    width: 90px;
    height: 90px;
    object-fit: contain;
    position: absolute;
    bottom: 20px;
    right: 10px;
  }

  .vf-title {
    width: clamp(150px, 42vw, 220px);
    height: auto;
    object-fit: contain;
    z-index: 4;
    margin-top: 20px;
    margin-bottom: 0;
  }

  /* Erupting blocks shoot up from volcano top */
  .eruption-area {
    position: absolute;
    top: calc(50% + 10px);
    left: 50%;
    transform: translate(-50%, -100%);
    z-index: 3;
    width: 200px;
    height: 160px;
    pointer-events: none;
  }

  .erupting-block {
    position: absolute;
    bottom: 0;
    left: calc(50% - 14px);
    width: 28px;
    height: 28px;
    border-radius: 7px;
    background: #fff;
    border: 2px solid var(--colour);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    font-weight: 900;
    color: #1a1a1a;
    box-shadow: 0 3px 0 rgba(0,0,0,0.2);
    animation: erupt 3s ease-out infinite;
    animation-delay: var(--delay);
    opacity: 0;
  }

  @keyframes erupt {
    0% {
      opacity: 0;
      transform: translateY(0) translateX(0) rotate(0deg) scale(0.5);
    }
    10% {
      opacity: 1;
      transform: translateY(0) translateX(0) rotate(0deg) scale(1);
    }
    70% {
      opacity: 1;
      transform: translateY(calc(-1 * var(--height))) translateX(var(--drift)) rotate(20deg) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(calc(-1 * var(--height) - 20px)) translateX(var(--drift)) rotate(30deg) scale(0.7);
    }
  }

  .tagline {
    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    margin: 10px 0 4px;
    z-index: 4;
    letter-spacing: 0.05em;
  }

  /* Blocks spilling to sides */
  .spill-area {
    position: absolute;
    top: calc(50% + 10px);
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    width: 300px;
    height: 100px;
    pointer-events: none;
  }

  .spill-block {
    position: absolute;
    top: 0;
    left: calc(50% - 14px);
    width: 28px;
    height: 28px;
    border-radius: 7px;
    background: #fff;
    border: 2px solid var(--colour);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.95rem;
    font-weight: 900;
    color: #1a1a1a;
    box-shadow: 0 2px 0 rgba(0,0,0,0.2);
    opacity: 0;
    animation: spill 3.5s ease-in-out infinite;
    animation-delay: var(--delay);
  }

  @keyframes spill {
    0% {
      opacity: 0;
      transform: translateY(0) translateX(0) rotate(0deg) scale(0.4);
    }
    8% {
      opacity: 1;
      transform: translateY(calc(-1 * var(--rise) - 40px)) translateX(calc(var(--drift) * 0.05)) rotate(0deg) scale(1);
    }
    20% {
      opacity: 1;
      transform: translateY(calc(-1 * var(--rise) - 35px)) translateX(calc(var(--drift) * 0.25)) rotate(5deg) scale(1);
    }
    40% {
      opacity: 1;
      transform: translateY(calc(-1 * var(--rise) - 10px)) translateX(calc(var(--drift) * 0.6)) rotate(12deg) scale(0.95);
    }
    65% {
      opacity: 0.85;
      transform: translateY(30px) translateX(calc(var(--drift) * 1.0)) rotate(22deg) scale(0.85);
    }
    83% {
      opacity: 0.7;
      transform: translateY(70px) translateX(calc(var(--drift) * 1.3)) rotate(30deg) scale(0.7);
    }
    84% {
      opacity: 0;
      transform: translateY(72px) translateX(calc(var(--drift) * 1.3)) rotate(30deg) scale(0);
    }
    100% {
      opacity: 0;
      transform: translateY(72px) translateX(calc(var(--drift) * 1.3)) rotate(30deg) scale(0);
    }
  }

  .fragment {
    position: absolute;
    top: 0;
    left: calc(50% - 4px);
    width: var(--frag-size);
    height: var(--frag-size);
    border-radius: 50%;
    background: var(--colour);
    opacity: 0;
    animation: frag 3.5s ease-out infinite;
    animation-delay: var(--delay);
  }

  @keyframes frag {
    0%, 83% {
      opacity: 0;
      transform: translateY(70px) translateX(calc(var(--drift) * 1.3)) scale(0);
    }
    85% {
      opacity: 1;
      transform: translateY(70px) translateX(calc(var(--drift) * 1.3)) scale(1);
    }
    95% {
      opacity: 0.6;
      transform: translateY(calc(70px + var(--frag-y))) translateX(calc(var(--drift) * 1.3 + var(--frag-x))) scale(0.8);
    }
    100% {
      opacity: 0;
      transform: translateY(calc(70px + var(--frag-y) * 1.5)) translateX(calc(var(--drift) * 1.3 + var(--frag-x) * 1.5)) scale(0);
    }
  }

  .title-blocks {
    display: flex;
    gap: 8px;
    margin-top: 4px;
    z-index: 4;
  }

  .title-block {
    width: 52px;
    height: 52px;
    border-radius: 14px;
    background: #fff;
    border: 4px solid var(--colour);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    font-weight: 900;
    color: #1a1a1a;
    box-shadow: 0 4px 0 rgba(0,0,0,0.25);
  }

  .subtitle-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
    z-index: 4;
  }

  .subtitle {
    font-size: 1rem;
    font-weight: 600;
    color: rgba(255,255,255,0.6);
    margin: 0;
  }

  .frog-icon {
    animation: frog-wobble 1.5s ease-in-out infinite, frog-colour 4s ease-in-out infinite;
  }

  .frog-icon.right {
    animation: frog-wobble-right 1.5s ease-in-out infinite, frog-colour 4s ease-in-out infinite;
    animation-delay: 0.3s, 2s;
  }

  @keyframes frog-colour {
    0%, 100% { filter: hue-rotate(0deg) saturate(1) brightness(1); }
    45%, 55% { filter: hue-rotate(-70deg) saturate(3) brightness(0.85); }
  }

  @keyframes frog-wobble {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-8deg) translateY(-2px); }
    75% { transform: rotate(5deg); }
  }

  @keyframes frog-wobble-right {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(8deg) translateY(-2px); }
    75% { transform: rotate(-5deg); }
  }
</style>
