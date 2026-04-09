<script lang="ts">
  import type { Snippet } from 'svelte'

  const PASS_HASH = '9e7f3375709b613eac449f47489c7749d7fd986874dc5d1a69cd28b6ddd4ad93'
  const STORAGE_KEY = 'volcanofrog_auth'

  let { children }: { children: Snippet } = $props()

  let authed = $state(typeof sessionStorage !== 'undefined' && sessionStorage.getItem(STORAGE_KEY) === 'true')
  let input = $state('')
  let error = $state(false)
  let checking = $state(false)

  async function sha256(message: string): Promise<string> {
    const msgBuffer = new TextEncoder().encode(message)
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
  }

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    checking = true
    error = false

    const hash = await sha256(input)
    if (hash === PASS_HASH) {
      sessionStorage.setItem(STORAGE_KEY, 'true')
      setTimeout(() => { authed = true }, 300)
    } else {
      error = true
      input = ''
    }
    checking = false
  }
</script>

{#if authed}
  {@render children()}
{:else}
  <div class="backdrop">
    <form class="card" onsubmit={handleSubmit}>
      <div class="logo">Alphablocks</div>
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

  .logo {
    font-size: 28px;
    font-weight: 700;
    color: #f1c40f;
    letter-spacing: -0.5px;
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
</style>
