<script lang="ts">
  /**
   * Splash screen — volcano erupting character blocks
   * Temporary placeholder until commissioned artwork is ready
   */

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
    {#each Array(14) as _, i}
      <div
        class="smoke-puff"
        style="
          --delay: {i * 0.5}s;
          --drift: {(Math.random() - 0.5) * 40}px;
          --size: {20 + Math.random() * 30}px;
        "
      ></div>
    {/each}
    <!-- Spilling smoke that arcs to sides -->
    {#each Array(10) as _, i}
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

  <!-- Volcano -->
  <div class="volcano">
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg" width="160" height="160">
      <path fill="#717578" d="M41.38,68.14c0,0-15.55,21.56-19.65,26.88S9.18,109.07,9.73,110.16c0.55,1.09,6.96,3.68,6.96,3.68 s32.47,4.64,35.06,4.64s55.8-15.14,55.8-15.14s-18.69-39.98-24.7-37.66S41.38,68.14,41.38,68.14z"/>
      <path fill="#474B4E" d="M66.76,80.96c0,0-4.64,4.09-6.82,6.28s-8.29,7.1-7.5,7.91c0.65,0.67,9.87-3.52,10.83-4 c0.82-0.41,11-4.19,11.68-3.23c0.68,0.96-2.28,3.23-3.27,4.64c-0.92,1.31-17.17,17.68-21.01,18.69c-2.76,0.73-19.51,1.64-20.06,0.27 c-0.55-1.36,6-10.64,4.37-12.01c-1.64-1.36-8.33,3.03-12.28,5.35s-10.09,5.29-11.05,5.43s-1.91-0.14-1.91-0.14s-0.29,1.71,8.19,5.59 c6.68,3.06,12.14,5.87,30.43,7.64s31.38,0.14,39.02-0.96c7.64-1.09,21.69-5.46,25.38-7.09c3.68-1.64,6.53-3.33,6.14-4.5 c-0.14-0.41-21.42-28.65-21.42-28.65L86,65.14L66.76,80.96z"/>
      <radialGradient id="vg1" cx="66.67" cy="64.78" r="52.91" gradientUnits="userSpaceOnUse">
        <stop offset="0.17" stop-color="#E79F68"/><stop offset="0.53" stop-color="#E2AF9B"/><stop offset="0.88" stop-color="#E0E0E0"/>
      </radialGradient>
      <path fill="url(#vg1)" d="M74.13,63.5c0,0-0.27-11.46,5.46-18.28c5.73-6.82,13.1-12.01,17.74-15.28 c4.64-3.27,11.19-7.37,10.37-13.23c-0.82-5.87-5.4-9.76-25.32-9.76s-33.62,1.85-46.31,8.53s-7.31,15.32-1.91,16.78 c4.77,1.29,10.84,1.81,15.65,6.94c8.73,9.3,7.81,23.62,7.81,23.62L74.13,63.5z"/>
    </svg>
  </div>

  <!-- Title in character blocks -->
  <div class="title-blocks">
    {#each titleChars as t}
      <div class="title-block" style="--colour: {t.colour}">
        {t.char}
      </div>
    {/each}
  </div>
  <div class="subtitle-row">
    <div class="frog-icon">
      <svg viewBox="0 0 128 140" xmlns="http://www.w3.org/2000/svg" width="36" height="40">
        <path fill="#B7D019" d="M14.16,48.37c-0.43,4.5-10,10.84-9.57,26.89s13.09,44.06,57.72,44.77 c44.63,0.7,60.96-27.31,61.1-46.6c0.13-17.88-8.58-21.43-9.57-26.04c-0.84-3.94,6.76-21.96-10.28-28.44 C83.45,11.3,75.96,30.63,75.4,31.05c-0.56,0.42-6.05,0.7-10.84,0.7s-10,0-10.56-0.56c-0.56-0.56-12.81-19.99-30.55-11.83 C6.81,27.03,14.44,45.41,14.16,48.37z"/>
        <path fill="#2F2F2F" d="M103.08,42.36c0,5.29-3,9.76-8.02,9.57c-4.33-0.16-7.84-4.29-7.84-9.57s3.51-9.49,7.84-9.57 C100.17,32.69,103.08,37.07,103.08,42.36z"/>
        <path fill="#2F2F2F" d="M41.89,41.61c0.28,6.76-3,10.14-8.02,10.04c-4.22-0.08-7.56-3.19-7.65-9.67 c-0.08-5.34,1.97-9.48,7.65-9.67C38.09,32.18,41.67,36.28,41.89,41.61z"/>
        <path fill="#2F2F2F" d="M53.29,63.5c-0.81,1.79-3.06,2.35-4.57,1.48c-1.5-0.87-1.91-3.23-0.93-4.93 c0.98-1.7,2.65-1.96,3.87-1.48C53.29,59.21,54.49,60.85,53.29,63.5z"/>
        <path fill="#2F2F2F" d="M80.33,60.55c0.77,1.86-0.16,4.04-1.94,4.57c-1.78,0.53-3.69-0.61-4.26-2.54 c-0.57-1.93,0.14-3.61,1.87-4.3C77.13,57.84,79.19,57.8,80.33,60.55z"/>
        <path fill="#FF6011" d="M27.44,78.31l0.38,2.72c0,0,10.51,10.98,35.85,11.36c26,0.39,37.26-12.29,37.26-12.29l-11.64-5.63 c0,0-11.07,4.69-25.34,4.41c-14.27-0.28-28.34-4.41-28.34-4.41L27.44,78.31z"/>
        <path fill="#865B51" d="M104.59,71.92c-3.28-4.79-7.23-0.43-13.42,1.88c-3.43,1.28-5.7,2.02-5.7,2.02s5.09,0.99,7.34,2.21 s6.17,3.89,6.17,3.89S107.35,75.96,104.59,71.92z"/>
        <path fill="#865B51" d="M24.81,71.36c-3.94,2.63,3.02,9.68,3.02,9.68s2.15-1.98,5.06-3.2s7.78-2.1,7.78-2.1 s-5.63-1.27-8.9-3.16C30.08,71.62,27.06,69.86,24.81,71.36z"/>
        <!-- Tongue (on top of everything) -->
        <rect x="42" y="88" width="44" rx="16" fill="#F08080">
          <animate attributeName="height" values="0;0;0;0;0;0;0;30;40;30;0;0;0" dur="3s" repeatCount="indefinite"/>
        </rect>
      </svg>
    </div>
    <p class="subtitle">Volcano Frog</p>
    <div class="frog-icon right">
      <svg viewBox="0 0 128 140" xmlns="http://www.w3.org/2000/svg" width="36" height="40" style="transform: scaleX(-1)">
        <path fill="#B7D019" d="M14.16,48.37c-0.43,4.5-10,10.84-9.57,26.89s13.09,44.06,57.72,44.77 c44.63,0.7,60.96-27.31,61.1-46.6c0.13-17.88-8.58-21.43-9.57-26.04c-0.84-3.94,6.76-21.96-10.28-28.44 C83.45,11.3,75.96,30.63,75.4,31.05c-0.56,0.42-6.05,0.7-10.84,0.7s-10,0-10.56-0.56c-0.56-0.56-12.81-19.99-30.55-11.83 C6.81,27.03,14.44,45.41,14.16,48.37z"/>
        <path fill="#2F2F2F" d="M103.08,42.36c0,5.29-3,9.76-8.02,9.57c-4.33-0.16-7.84-4.29-7.84-9.57s3.51-9.49,7.84-9.57 C100.17,32.69,103.08,37.07,103.08,42.36z"/>
        <path fill="#2F2F2F" d="M41.89,41.61c0.28,6.76-3,10.14-8.02,10.04c-4.22-0.08-7.56-3.19-7.65-9.67 c-0.08-5.34,1.97-9.48,7.65-9.67C38.09,32.18,41.67,36.28,41.89,41.61z"/>
        <path fill="#2F2F2F" d="M53.29,63.5c-0.81,1.79-3.06,2.35-4.57,1.48c-1.5-0.87-1.91-3.23-0.93-4.93 c0.98-1.7,2.65-1.96,3.87-1.48C53.29,59.21,54.49,60.85,53.29,63.5z"/>
        <path fill="#2F2F2F" d="M80.33,60.55c0.77,1.86-0.16,4.04-1.94,4.57c-1.78,0.53-3.69-0.61-4.26-2.54 c-0.57-1.93,0.14-3.61,1.87-4.3C77.13,57.84,79.19,57.8,80.33,60.55z"/>
        <path fill="#FF6011" d="M27.44,78.31l0.38,2.72c0,0,10.51,10.98,35.85,11.36c26,0.39,37.26-12.29,37.26-12.29l-11.64-5.63 c0,0-11.07,4.69-25.34,4.41c-14.27-0.28-28.34-4.41-28.34-4.41L27.44,78.31z"/>
        <path fill="#865B51" d="M104.59,71.92c-3.28-4.79-7.23-0.43-13.42,1.88c-3.43,1.28-5.7,2.02-5.7,2.02s5.09,0.99,7.34,2.21 s6.17,3.89,6.17,3.89S107.35,75.96,104.59,71.92z"/>
        <path fill="#865B51" d="M24.81,71.36c-3.94,2.63,3.02,9.68,3.02,9.68s2.15-1.98,5.06-3.2s7.78-2.1,7.78-2.1 s-5.63-1.27-8.9-3.16C30.08,71.62,27.06,69.86,24.81,71.36z"/>
        <!-- Tongue (on top of everything) -->
        <rect x="42" y="88" width="44" rx="16" fill="#F08080">
          <animate attributeName="height" values="0;0;0;0;0;0;0;0;0;30;40;30;0;0;0" dur="3s" repeatCount="indefinite"/>
        </rect>
      </svg>
    </div>
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
  }

  .smoke-area {
    position: absolute;
    top: calc(50% - 140px);
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
      opacity: 0.45;
      transform: translateY(-15px) translateX(calc(var(--drift) * 0.1)) scale(0.6);
    }
    25% {
      opacity: 0.35;
      transform: translateY(-40px) translateX(calc(var(--drift) * 0.4)) scale(1);
    }
    55% {
      opacity: 0.2;
      transform: translateY(-80px) translateX(calc(var(--drift) * 0.8)) scale(1.5);
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

  .volcano {
    position: relative;
    z-index: 1;
  }

  /* Erupting blocks shoot up from volcano top */
  .eruption-area {
    position: absolute;
    top: calc(50% - 60px);
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
    top: calc(50% - 70px);
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
