<script lang="ts">
  import '../app.css'
  import { onMount } from 'svelte'
  import type { Snippet } from 'svelte'

  let { children }: { children: Snippet } = $props()

  onMount(() => {
    if (!('serviceWorker' in navigator)) return

    navigator.serviceWorker.register('/volcanofrog/sw.js', { scope: '/volcanofrog/', updateViaCache: 'none' })
      .then(reg => {
        // Check for updates every 60s
        setInterval(() => reg.update(), 60_000)

        reg.addEventListener('updatefound', () => {
          const newSw = reg.installing
          if (!newSw) return
          newSw.addEventListener('statechange', () => {
            // New SW activated and there's already a controlling SW (i.e. this is an update)
            if (newSw.state === 'activated' && navigator.serviceWorker.controller) {
              window.location.reload()
            }
          })
        })
      })

    // If a new SW takes over while page is open, reload to get fresh assets
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      window.location.reload()
    })
  })
</script>

{@render children()}
