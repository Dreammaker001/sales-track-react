/**
 * Tombol dengan varian: primary | outline.
 * Ukuran: default (40px) | lg (46px) | sm (32px).
 */
const VARIANTS = {
  primary: 'bg-primary text-white hover:bg-primary-dark',
  outline: 'bg-surface border border-line text-ink-2 hover:border-ink-3 hover:text-ink',
}

const SIZES = {
  lg: 'h-[46px] px-5 text-sm',
  sm: 'h-8 px-3 text-xs',
  md: 'h-10 px-4 text-sm',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  ...rest
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm font-semibold transition-colors active:translate-y-px disabled:pointer-events-none disabled:opacity-50 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
