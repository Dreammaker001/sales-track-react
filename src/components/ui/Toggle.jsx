/**
 * Toggle switch (aktif/nonaktif).
 * - checked: status aktif (hijau)
 * - onChange(checked)
 */
export default function Toggle({ checked = false, onChange, disabled = false, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative h-[22px] w-10 shrink-0 rounded-full transition-colors disabled:opacity-50 ${
        checked ? 'bg-success' : 'bg-gray-fill'
      }`}
    >
      <span
        className={`absolute left-0.5 top-[3px] h-4 w-4 rounded-full bg-white shadow transition-transform ${
          checked ? 'translate-x-5' : ''
        }`}
      />
    </button>
  )
}
