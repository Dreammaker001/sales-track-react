/**
 * Avatar bulat berisi inisial.
 * varian: default (primary-soft) | neutral | primary
 * ukuran (px): 24 | 32 | 36 | 38
 */
const VARIANTS = {
  default: 'bg-primary-soft text-primary',
  neutral: 'bg-gray-soft text-ink-2',
  primary: 'bg-primary text-white',
}

export default function Avatar({ initials, size = 32, variant = 'default', className = '' }) {
  return (
    <span
      className={`inline-grid shrink-0 select-none place-items-center rounded-full font-bold ${VARIANTS[variant]} ${className}`}
      style={{ width: size, height: size, fontSize: Math.round(size * 0.36) }}
      aria-hidden="true"
    >
      {initials}
    </span>
  )
}
