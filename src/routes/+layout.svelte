<script lang="ts">
  import '../app.css'
  import { onMount } from 'svelte'
  import type { Snippet } from 'svelte'

  let { children }: { children: Snippet } = $props()

  onMount(() => {
    if (!('serviceWorker' in navigator)) return

    // Unregister any existing SW — we no longer use a service worker
    navigator.serviceWorker.getRegistrations().then(regs => {
      regs.forEach(r => r.unregister())
    })
  })
</script>

{@render children()}
