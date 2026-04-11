/**
 * Middleware — runs on ALL /volcanofrog/* requests before static assets.
 * Forces no-cache on sw.js and HTML so browsers always get fresh versions.
 */
export const onRequest: PagesFunction = async ({ request, next }) => {
  const response = await next()
  const url = new URL(request.url)
  const path = url.pathname

  // Force no-cache on service worker and HTML entry point
  if (path.endsWith('/sw.js') || path.endsWith('/volcanofrog/') || path.endsWith('/volcanofrog')) {
    const newResponse = new Response(response.body, response)
    newResponse.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    return newResponse
  }

  return response
}
