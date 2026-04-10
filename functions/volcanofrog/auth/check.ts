/**
 * Server-side session check
 * GET /volcanofrog/auth/check
 * Returns { ok: true } if valid session cookie exists, { ok: false } otherwise.
 */

function getCookie(request: Request, name: string): string | null {
  const header = request.headers.get('Cookie') ?? ''
  const match = header.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`))
  return match ? match[1] : null
}

export const onRequest: PagesFunction = async ({ request }) => {
  const token = getCookie(request, 'vf_session')

  // Session exists and is non-empty (token was set by our login endpoint)
  const ok = !!token && token.length === 64

  return new Response(JSON.stringify({ ok }), {
    headers: { 'Content-Type': 'application/json' },
  })
}
