import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from '@/components/ui/select.jsx'
import Input from '../../../components/ui/Input.jsx'
import Button from '../../../components/ui/Button.jsx'
import Chip from '../../../components/ui/Chip.jsx'

const STATUS_OPTIONS = [
  {
    name: 'Semua',
    value: '',
  },
  { name: 'Pending-Invoice', value: 'PENDING-INVOICE' },
  { name: 'Closed-Partial', value: 'CLOSED-PARTIAL' },
  { name: 'Selesai', value: 'COMPLETED' },
]

const SEARCH_OPTIONS = [
  {
    label: 'Customer Code',
    value: 'customer_code',
  },
  { label: 'SO Number', value: 'so_number' },
]

const PERIOD_OPTIONS = [
  {
    label: '1 Bulan Terakhir',
    value: '1',
  },
  {
    label: '3 Bulan Terakhir',
    value: '3',
  },
  {
    label: '6 Bulan Terakhir',
    value: '6',
  },
]

/** Bilah filter: search + chip peran + chip status. */
export default function FilterBar({
  query,
  status,
  onStatus,
  searchBy,
  onSearch,
  setSearchParams,
  ptAccessOptions,
  ptAccess,
  periodMonth,
}) {
  return (
    <div className="mb-4 flex flex-col gap-4 rounded-md bg-surface p-3 px-5 shadow-card">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Select
          items={ptAccessOptions}
          value={ptAccess}
          defaultValue={ptAccessOptions[0]?.value || ''}
          onValueChange={(e) => {
            setSearchParams((prev) => {
              prev.set('pt', e)
              return prev
            })
          }}
          aria-label="Pilih PT"
        >
          <SelectTrigger className="w-full max-w-48 border-line !max-w-full w-full sm:w-auto">
            <SelectValue className="text-ink-2" placeholder="Pilih PT" />
          </SelectTrigger>
          <SelectContent position="popper" className="bg-surface border-line">
            <SelectGroup>
              <SelectLabel className="text-xs font-semibold text-ink-3">Pilih PT</SelectLabel>
              {ptAccessOptions.map((item) => (
                <SelectItem key={item.value} value={item.value} className="text-ink-2">
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          items={SEARCH_OPTIONS}
          value={searchBy}
          onValueChange={(e) => {
            setSearchParams((prev) => {
              prev.set('search_by', e)
              return prev
            })
          }}
          aria-label="Cari berdasarkan"
          defaultValue={SEARCH_OPTIONS[0].value}
        >
          <SelectTrigger className="w-full max-w-48 border-line !max-w-full w-full sm:w-auto">
            <SelectValue className="text-ink-2" placeholder="Cari berdasarkan" />
          </SelectTrigger>
          <SelectContent position="popper" className="bg-surface border-line">
            <SelectGroup>
              <SelectLabel className="text-xs font-semibold text-ink-3">
                Cari berdasarkan
              </SelectLabel>
              {SEARCH_OPTIONS.map((item) => (
                <SelectItem key={item.value} value={item.value} className="text-ink-2">
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          items={PERIOD_OPTIONS}
          value={periodMonth}
          onValueChange={(e) => {
            setSearchParams((prev) => {
              prev.set('period_month', e)
              return prev
            })
          }}
          aria-label="Periode"
          defaultValue={PERIOD_OPTIONS[0].value}
        >
          <SelectTrigger className="w-full max-w-48 border-line !max-w-full w-full sm:w-auto">
            <SelectValue className="text-ink-2" placeholder="Periode" />
          </SelectTrigger>
          <SelectContent position="popper" className="bg-surface border-line">
            <SelectGroup>
              <SelectLabel className="text-xs font-semibold text-ink-3">Periode</SelectLabel>
              {PERIOD_OPTIONS.map((item) => (
                <SelectItem key={item.value} value={item.value} className="text-ink-2">
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <Input
          muted
          className="w-full sm:w-[280px]"
          placeholder="Cari username, nama, email..."
          value={query}
          onChange={(e) =>
            setSearchParams((prev) => {
              prev.set('q', e.target.value)
              return prev
            })
          }
          aria-label="Cari pengguna"
        />
        <Button onClick={onSearch} className="w-full sm:w-auto">
          Search
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter status">
          <span className="mr-1 text-xs font-semibold text-ink-3">Status</span>
          {STATUS_OPTIONS.map((opt) => (
            <Chip key={opt.value} active={status === opt.value} onClick={() => onStatus(opt.value)}>
              {opt.name}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  )
}
