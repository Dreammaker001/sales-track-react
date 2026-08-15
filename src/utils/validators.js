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
