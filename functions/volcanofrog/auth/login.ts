/**
 * Server-side login endpoint
 * POST /volcanofrog/auth/login  { code: string }
 * Returns httpOnly secure cookie on success, 401 on failure.
 */

interface Env {
  ACCESS_CODE_HASH?: string
}

// SHA-256 hash of the access code (same as was in client code)
const DEFAULT_HASH = '9e7f3375709b613eac449f47489c7749d7fd986874dc5d1a69cd28b6ddd4ad93'

async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message)
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

/** Generate a random session token */
function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')
}

/** Constant-time string comparison to prevent timing attacks */
function safeCompare(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let result = 0
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return result === 0
}

export const onRequest: PagesFunction<Env> = async ({ request }) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  let body: { code?: string }
  try {
    body = await request.json()
  } catch {
    return new Response('Bad request', { status: 400 })
  }

  if (!body.code || typeof body.code !== 'string') {
    return new Response(JSON.stringify({ ok: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const expectedHash = DEFAULT_HASH
  const inputHash = await sha256(body.code)

  if (!safeCompare(inputHash, expectedHash)) {
    return new Response(JSON.stringify({ ok: false }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  // Generate session token and set as httpOnly cookie
  const token = generateToken()

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `vf_session=${token}; Path=/volcanofrog; HttpOnly; Secure; SameSite=Strict; Max-Age=86400`,
    },
  })
}
