/**
 * Badge pill: success | warning | gray | danger.
 */
const VARIANTS = {
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  gray: 'bg-gray-soft text-ink-3',
  danger: 'bg-danger-soft text-danger',
}

export default function Badge({ children, variant = 'gray', className = '' }) {
  return (
    <span
      className={`inline-flex h-6 items-center justify-center whitespace-nowrap rounded-full px-3 text-xs font-semibold ${VARIANTS[variant]} ${className}`}
    >
      {children}
    </span>
  )
}
