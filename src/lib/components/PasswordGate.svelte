<script lang="ts">
  import { onMount } from 'svelte'
  import type { Snippet } from 'svelte'
  import { base } from '$app/paths'

  let { children }: { children: Snippet } = $props()

  let authed = $state(false)
  let loading = $state(true)
  let input = $state('')
  let error = $state(false)
  let checking = $state(false)

  const isDev = false // import.meta.env.DEV

  const zhBlocks = [
    { char: '火', colour: '#E53935' },
    { char: '山', colour: '#2E7D32' },
    { char: '蛙', colour: '#1565C0' },
  ]

  onMount(async () => {
    if (isDev) {
      authed = true
      loading = false
      return
    }

    try {
      const res = await fetch(`${base}/auth/check`, { credentials: 'same-origin' })
      const data = await res.json()
      if (data.ok) {
        authed = true
      }
    } catch {
      // Server unavailable — stay on gate
    }
    loading = false
  })

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    checking = true
    error = false

    try {
      const res = await fetch(`${base}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ code: input }),
      })
      const data = await res.json()

      if (data.ok) {
        setTimeout(() => { authed = true }, 300)
      } else {
        error = true
        input = ''
      }
    } catch {
      error = true
      input = ''
    }
    checking = false
  }
</script>

{#if loading}
  <div class="backdrop">
    <div class="card">
      <img src="{base}/images/zh-transparent/objects/vf-title.png" alt="Volcano Frog" class="title-img" />
      <p class="subtitle">Loading...</p>
    </div>
  </div>
{:else if authed}
  {@render children()}
{:else}
  <div class="backdrop">
    <form class="card" onsubmit={handleSubmit}>
      <div class="hero">
        <img src="{base}/images/zh-transparent/objects/frog-felt.jpg" alt="Volcano Frog mascot" class="frog-img" />
        <img src="{base}/images/zh-transparent/objects/vf-title.png" alt="Volcano Frog" class="title-img" />
      </div>

      <p class="subtitle">Enter access code to continue</p>
      <input
        type="password"
        bind:value={input}
        placeholder="Access code"
        autofocus
        class:error-border={error}
      />
      {#if error}
        <p class="error">Invalid access code</p>
      {/if}
      <button type="submit" disabled={checking || !input}>
        {checking ? 'Checking...' : 'Enter'}
      </button>

      <div class="zh-blocks">
        {#each zhBlocks as block}
          <span class="zh-block" style="border-color: {block.colour}; color: {block.colour}">{block.char}</span>
        {/each}
      </div>
    </form>
  </div>
{/if}

<style>
  .backdrop {
    position: fixed;
    inset: 0;
    background: #0a0a0f;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    overflow-y: auto;
  }

  .card {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 40px 32px;
    max-width: 340px;
    width: 90%;
  }

  .hero {
    position: relative;
    width: clamp(260px, 85vw, 340px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .frog-img {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 20px;
  }

  .title-img {
    position: absolute;
    top: -40px;
    left: 50%;
    transform: translateX(-50%);
    width: 42%;
    height: auto;
    object-fit: contain;
    filter: drop-shadow(0 2px 8px rgba(0,0,0,0.7));
  }

  .subtitle {
    font-size: 14px;
    color: #888;
    margin-bottom: 8px;
  }

  input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(255,255,255,0.05);
    color: #e0e0e0;
    font-size: 16px;
    outline: none;
    text-align: center;
    letter-spacing: 2px;
    box-sizing: border-box;
  }

  input.error-border {
    border-color: #e74c3c;
  }

  .error {
    color: #e74c3c;
    font-size: 13px;
    margin: 0;
  }

  button {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    border: none;
    background: #f1c40f;
    color: #0a0a0f;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
  }

  button:disabled {
    opacity: 0.5;
    cursor: default;
  }

  .zh-blocks {
    display: flex;
    gap: 10px;
    margin-top: 8px;
  }

  .zh-block {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.6rem;
    font-weight: 900;
    border: 3px solid;
    border-radius: 12px;
    background: #fff;
  }
</style>
