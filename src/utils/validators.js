/** Validator murni. */

export function isRequired(value) {
  return typeof value === 'string' ? value.trim().length > 0 : value != null
}

export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value ?? '').trim())
}

export function isMinLength(value, min) {
  return String(value ?? '').length >= min
}

/** Kekuatan password: 0–4 (sesuai checklist desain) */
export function passwordStrength(value) {
  const pw = String(value ?? '')
  let score = 0
  if (pw.length >= 8) score += 1
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score += 1
  if (/\d/.test(pw)) score += 1
  if (/[^A-Za-z0-9]/.test(pw)) score += 1
  return score
}

/** Generate password acak yang memenuhi syarat keamanan (auto-generate). */
export function generatePassword(length = 12) {
  const upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const lower = 'abcdefghijkmnopqrstuvwxyz'
  const digits = '23456789'
  const symbols = '!@#$%^&*'
  const all = upper + lower + digits + symbols
  const pick = (set) => set[Math.floor(Math.random() * set.length)]

  const chars = [pick(upper), pick(lower), pick(digits), pick(symbols)]
  for (let i = chars.length; i < length; i += 1) chars.push(pick(all))

  // Shuffle (Fisher–Yates)
  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[chars[i], chars[j]] = [chars[j], chars[i]]
  }
  return chars.join('')
}
