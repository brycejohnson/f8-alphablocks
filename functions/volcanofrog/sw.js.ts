/**
 * Serves a self-unregistering SW that clears caches and dies.
 * No reload — just clean up and go away.
 */

const KILL_SW = `
self.addEventListener('install', function() { self.skipWaiting(); });
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k) { return caches.delete(k); }));
    }).then(function() {
      return self.registration.unregister();
    })
  );
});
`

export const onRequest: PagesFunction = async () => {
  return new Response(KILL_SW, {
    headers: {
      'Content-Type': 'application/javascript',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}
