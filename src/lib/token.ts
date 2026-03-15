import crypto from 'crypto'

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function randomSegment(length: number): string {
  const bytes = crypto.randomBytes(length)
  return Array.from(bytes)
    .map(b => CHARS[b % CHARS.length])
    .join('')
}

export function generateToken(): string {
  return `SVX-${randomSegment(4)}-${randomSegment(4)}-${randomSegment(4)}`
}

export function hashToken(token: string): string {
  return crypto
    .createHash('sha256')
    .update(token)
    .digest('hex')
}
