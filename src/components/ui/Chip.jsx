/**
 * Chip filter dengan state aktif/nonaktif.
 */
export default function Chip({ children, active = false, onClick, className = '' }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex h-8 items-center justify-center rounded-full border px-4 text-sm transition-colors ${
        active
          ? 'border-primary bg-primary font-semibold text-white'
          : 'border-line bg-surface text-ink-2 hover:border-primary hover:text-primary'
      } ${className}`}
    >
      {children}
    </button>
  )
}
