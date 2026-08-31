/**
 * Input teks.
 * - muted: latar canvas (dipakai di filter bar), border transparan
 */
export default function Input({ muted = false, className = '', ...rest }) {
  return (
    <input
      className={`h-10 rounded-sm border px-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-primary focus:ring-[3px] focus:ring-primary-soft ${
        muted ? 'border-transparent bg-canvas focus:bg-surface' : 'border-line bg-surface'
      } ${className}`}
      {...rest}
    />
  )
}
