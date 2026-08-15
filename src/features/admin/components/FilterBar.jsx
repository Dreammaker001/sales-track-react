import Chip from '../../../components/ui/Chip.jsx'
import Input from '../../../components/ui/Input.jsx'

const ROLE_OPTIONS = ['Semua', 'Admin', 'Sales']
const STATUS_OPTIONS = ['Semua', 'Aktif', 'Nonaktif']

/** Bilah filter: search + chip peran + chip status. */
export default function FilterBar({ query, onQuery, role, onRole, status, onStatus }) {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-4 rounded-md bg-surface p-3 px-5 shadow-card">
      <Input
        muted
        className="w-[280px]"
        placeholder="Cari username, nama, email..."
        value={query}
        onChange={(e) => onQuery(e.target.value)}
        aria-label="Cari pengguna"
      />

      <div className="flex items-center gap-2" role="group" aria-label="Filter peran">
        <span className="mr-1 text-xs font-semibold text-ink-3">Peran</span>
        {ROLE_OPTIONS.map((opt) => (
          <Chip key={opt} active={role === opt} onClick={() => onRole(opt)}>
            {opt}
          </Chip>
        ))}
      </div>

      <div className="flex items-center gap-2" role="group" aria-label="Filter status">
        <span className="mr-1 text-xs font-semibold text-ink-3">Status</span>
        {STATUS_OPTIONS.map((opt) => (
          <Chip key={opt} active={status === opt} onClick={() => onStatus(opt)}>
            {opt}
          </Chip>
        ))}
      </div>
    </div>
  )
}
