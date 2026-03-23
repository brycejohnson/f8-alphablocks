<script lang="ts">
  import GameCanvas from '$lib/components/GameCanvas.svelte'
  import HUD from '$lib/components/HUD.svelte'
  import PasswordGate from '$lib/components/PasswordGate.svelte'
  // AudioContext is created on first tap via ensureAudioContext() in LetterBlock — no setup needed here
</script>

<PasswordGate>
  <main>
    <HUD />
    <GameCanvas />
  </main>
</PasswordGate>

<style>
  main {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
