/**
 * Volcanofrog Service Worker — phase-aware, lazy-cache audio
 *
 * Strategy:
 * - No install-time bulk pre-cache (avoids 50MB iOS quota, avoids blocking)
 * - Cache-first for any /audio/ request
 * - Audio is cached lazily as it's played; speculative prefetch in app
 * - Old caches deleted on activate; all clients reloaded on version bump
 */

const CACHE_VERSION = 'v8'
const CACHE_NAME = `volcanofrog-audio-${CACHE_VERSION}`

// ── Install: activate immediately, no pre-caching ─────────────────────────────
self.addEventListener('install', () => {
  self.skipWaiting()
})

// ── Activate: delete ALL old caches, claim clients, reload them ──────────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    )
    .then(() => self.clients.claim())
    .then(() => self.clients.matchAll({ type: 'window' }))
    .then(clients => {
      for (const client of clients) {
        client.postMessage({ type: 'SW_UPDATED' })
      }
    })
  )
})

// ── Fetch: cache-first for audio, network-only for everything else ────────────
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url)
  if (!url.pathname.includes('/audio/')) return

  event.respondWith(
    caches.open(CACHE_NAME).then(async (cache) => {
      const cached = await cache.match(event.request)
      if (cached) return cached

      try {
        const response = await fetch(event.request)
        // Only cache valid audio responses (not HTML error pages)
        const ct = response.headers.get('content-type') ?? ''
        if (response.ok && (ct.includes('audio') || ct.includes('octet-stream'))) {
          cache.put(event.request, response.clone())
        }
        return response
      } catch {
        return new Response('Audio unavailable', { status: 503 })
      }
    })
  )
})

// ── Message: explicit prefetch from app (speculative) ─────────────────────────
// App sends: { type: 'PREFETCH', urls: string[] }
self.addEventListener('message', (event) => {
  if (event.data?.type !== 'PREFETCH') return
  const urls = event.data.urls ?? []
  caches.open(CACHE_NAME).then(async (cache) => {
    for (const url of urls) {
      const cached = await cache.match(url)
      if (!cached) {
        fetch(url).then(r => {
          const ct = r.headers.get('content-type') ?? ''
          if (r.ok && (ct.includes('audio') || ct.includes('octet-stream'))) {
            cache.put(url, r)
          }
        }).catch(() => { /* silent */ })
      }
    }
  })
})
