<script lang="ts">
  import '../app.css'
  import { onMount } from 'svelte'
  import type { Snippet } from 'svelte'

  let { children }: { children: Snippet } = $props()

  onMount(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/alphablocks/sw.js', { scope: '/alphablocks/' })
    }
  })
</script>

{@render children()}
