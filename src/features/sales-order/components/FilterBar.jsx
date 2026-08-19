import Chip from '../../../components/ui/Chip.jsx'
import Input from '../../../components/ui/Input.jsx'

const STATUS_OPTIONS = [{
  name: 'Semua',
  value: '',
}, { name: 'Pending-Invoice', value: 'pending-invoice' }, { name: 'Selesai', value: 'completed' }]
const INVOICE_OPTIONS = [{
  name: 'Semua',
  value: '',
}, { name: 'Ada', value: 'ada' }, { name: 'Belum', value: 'belum' }]

/** Bilah filter: search + chip peran + chip status. */
export default function FilterBar({ query, onQuery, status, onStatus, invoice, onInvoice }) {
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

      <div className="flex items-center gap-2" role="group" aria-label="Filter status">
        <span className="mr-1 text-xs font-semibold text-ink-3">Status</span>
        {STATUS_OPTIONS.map((opt) => (
          <Chip key={opt.value} active={status === opt.value} onClick={() => onStatus(opt.value)}>
            {opt.name}
          </Chip>
        ))}
      </div>

      <div className="flex items-center gap-2" role="group" aria-label="Filter invoice">
        <span className="mr-1 text-xs font-semibold text-ink-3">Invoice</span>
        {INVOICE_OPTIONS.map((opt) => (
          <Chip key={opt.value} active={invoice === opt.value} onClick={() => onInvoice(opt.value)}>
            {opt.name}
          </Chip>
        ))}
      </div>
    </div>
  )
}
