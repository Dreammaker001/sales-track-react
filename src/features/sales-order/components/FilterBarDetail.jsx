import Chip from '../../../components/ui/Chip.jsx'
import Input from '../../../components/ui/Input.jsx'

const INVOICE_OPTIONS = [{
  name: 'Semua',
  value: '',
}, { name: 'Sudah', value: 'SUDAH SI' }, { name: 'Belum', value: 'BELUM ADA SI' }]
const DELIVERY_OPTIONS = [{
  name: 'Semua',
  value: '',
}, { name: 'Sudah', value: 'SUDAH TERKIRIM' }, { name: 'Belum', value: 'BELUM TERKIRIM' }]

/** Bilah filter: search + chip peran + chip status. */
export default function FilterBarDetail({ query, onQuery, invoice = '', onInvoice = () => {}, delivery = '', onDelivery = () => {} }) {
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

      <div className="flex items-center gap-2" role="group" aria-label="Filter invoice">
        <span className="mr-1 text-xs font-semibold text-ink-3">Invoice</span>
        {INVOICE_OPTIONS.map((opt) => (
          <Chip key={opt.value} active={invoice === opt.value} onClick={() => onInvoice(opt.value)}>
            {opt.name}
          </Chip>
        ))}
      </div>

      <div className="flex items-center gap-2" role="group" aria-label="Filter delivery">
        <span className="mr-1 text-xs font-semibold text-ink-3">Delivery</span>
        {DELIVERY_OPTIONS.map((opt) => (
          <Chip key={opt.value} active={delivery === opt.value} onClick={() => onDelivery(opt.value)}>
            {opt.name}
          </Chip>
        ))}
      </div>
    </div>
  )
}
