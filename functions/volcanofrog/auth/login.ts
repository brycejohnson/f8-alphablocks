/**
 * Server-side login endpoint
 * POST /volcanofrog/auth/login  { code: string }
 * Returns httpOnly secure cookie on success, 401 on failure.
 * Rate limited: 5 attempts per IP per minute.
 */

interface Env {
  ACCESS_CODE_HASH?: string
}

// SHA-256 hash of the access code (same as was in client code)
const DEFAULT_HASH = '9e7f3375709b613eac449f47489c7749d7fd986874dc5d1a69cd28b6ddd4ad93'

// In-memory rate limiter (resets on cold start, good enough for edge)
const attempts = new Map<string, { count: number; resetAt: number }>()
const MAX_ATTEMPTS = 5
const WINDOW_MS = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = attempts.get(ip)

  if (!entry || now > entry.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return false
  }

  entry.count++
  return entry.count > MAX_ATTEMPTS
}

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

  const ip = request.headers.get('CF-Connecting-IP') ?? request.headers.get('X-Forwarded-For') ?? 'unknown'

  if (isRateLimited(ip)) {
    return new Response(JSON.stringify({ ok: false, error: 'Too many attempts. Try again in a minute.' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json', 'Retry-After': '60' },
    })
  }

  let body: { code?: string }
  try {
    body = await request.json()
  } catch {
    return new Response('Bad request', { status: 400 })
  }

  if (!body.code || typeof body.code !== 'string' || body.code.length > 100) {
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
