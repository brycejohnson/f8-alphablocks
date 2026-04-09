<script lang="ts">
  import '../app.css'
  import { onMount } from 'svelte'
  import type { Snippet } from 'svelte'

  let { children }: { children: Snippet } = $props()

  onMount(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/volcanofrog/sw.js', { scope: '/volcanofrog/' })
    }
  })
</script>

{@render children()}
