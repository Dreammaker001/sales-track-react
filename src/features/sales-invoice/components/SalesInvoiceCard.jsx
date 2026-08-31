import Badge from '@/components/ui/Badge.jsx'
import { formatTimeFromSeconds } from '@/utils/format'
import dayjs from 'dayjs'

const STATUS_BADGE = {
  'BELUM TERKIRIM': 'warning',
  'SUDAH TERKIRIM': 'success',
}

/** Kartu sales order untuk daftar di mode mobile. */
export default function SalesInvoiceCard({ data }) {
  return (
    <div className="rounded-md border border-line bg-surface p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="font-semibold text-ink">{data.si_number}</div>
        <Badge variant={STATUS_BADGE[data.status] ?? 'gray'}>{data.status ?? '-'}</Badge>
      </div>

      <div className="mt-1 text-sm text-ink">{data.customer_name}</div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <div className="text-[11px] text-ink-3">Tanggal Pengiriman</div>
          <div className="text-xs text-ink">
            {dayjs(data.delivery_date_time).format('DD/MM/YYYY')}
          </div>
        </div>
        <div>
          <div className="text-[11px] text-ink-3">SIkeDN</div>
          <div className="text-xs text-ink">{formatTimeFromSeconds(data.detik_si_ke_dn)}</div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-xs text-ink-2">{dayjs(data.si_date_time).format('DD/MM/YYYY')}</span>
      </div>
    </div>
  )
}
