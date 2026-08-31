import Chip from '../../../components/ui/Chip.jsx'
import Input from '../../../components/ui/Input.jsx'

const ROLE_OPTIONS = [
  {
    name: 'Semua',
    value: '',
  },
  { name: 'Admin', value: 'admin' },
  { name: 'Sales', value: 'sales' },
]
const STATUS_OPTIONS = [
  {
    name: 'Semua',
    value: '',
  },
  { name: 'Aktif', value: 'active' },
  { name: 'Nonaktif', value: 'inactive' },
]

/** Bilah filter: search + chip peran + chip status. */
export default function FilterBar({ query, onQuery, role, onRole, status, onStatus }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-4 rounded-md bg-surface p-3 px-5 shadow-card">
      <Input
        muted
        className="w-full sm:w-[280px]"
        placeholder="Cari username, nama, email..."
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        aria-label="Cari pengguna"
      />

      <div
        className="flex w-full flex-wrap items-center gap-2 sm:w-auto"
        role="group"
        aria-label="Filter peran"
      >
        <span className="mr-1 text-xs font-semibold text-ink-3">Peran</span>
        {ROLE_OPTIONS.map((opt) => (
          <Chip key={opt.value} active={role === opt.value} onClick={() => onRole(opt.value)}>
            {opt.name}
          </Chip>
        ))}
      </div>

      <div
        className="flex w-full flex-wrap items-center gap-2 sm:w-auto"
        role="group"
        aria-label="Filter status"
      >
        <span className="mr-1 text-xs font-semibold text-ink-3">Status</span>
        {STATUS_OPTIONS.map((opt) => (
          <Chip key={opt.value} active={status === opt.value} onClick={() => onStatus(opt.value)}>
            {opt.name}
          </Chip>
        ))}
      </div>
    </div>
  )
}
