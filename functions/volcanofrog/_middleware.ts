/**
 * Middleware — runs on ALL /volcanofrog/* requests.
 * - Forces no-cache on sw.js and HTML
 * - Adds Content Security Policy header
 */
export const onRequest: PagesFunction = async ({ request, next }) => {
  const response = await next()
  const url = new URL(request.url)
  const path = url.pathname
  const newResponse = new Response(response.body, response)

  // CSP: allow self, inline styles (Svelte needs them), and Google TTS audio
  newResponse.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self' https://texttospeech.googleapis.com; media-src 'self' blob:; worker-src 'self'"
  )

  // Force no-cache on service worker and HTML entry point
  if (path.endsWith('/sw.js') || path.endsWith('/volcanofrog/') || path.endsWith('/volcanofrog')) {
    newResponse.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  }

  return newResponse
}
