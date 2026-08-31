import Badge from '@/components/ui/Badge.jsx'
import dayjs from 'dayjs'

const STATUS_BADGE = {
  'PENDING-INVOICE': 'warning',
  COMPLETED: 'success',
  'CLOSED-PARTIAL': 'danger',
}

/** Kartu sales order untuk daftar di mode mobile. */
export default function SalesOrderCard({ order, ptAccess }) {
  return (
    <div className="rounded-md border border-line bg-surface p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="font-semibold text-ink">{order.so_number}</div>
        <Badge variant={STATUS_BADGE[order.overall_status] ?? 'gray'}>
          {order.overall_status ?? '-'}
        </Badge>
      </div>

      <div className="mt-1 text-sm text-ink">{order.customer_name}</div>

      <div className="mt-3">
        <div className="mb-1 text-xs text-ink-2">Proses</div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <div className="h-2 bg-canvas rounded-md"></div>
            <div
              className={`h-2 ${order.percent_invoice <= 50 ? 'bg-yellow-500' : order.percent_invoice === 100 ? 'bg-green-500' : 'bg-blue-500'} absolute top-0 left-0 rounded-md`}
              style={{ width: `${order.percent_invoice}%` }}
            ></div>
          </div>
          <span className="text-xs text-ink-2">{order.percent_invoice}%</span>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-xs text-ink-2">{dayjs(order.so_date_time).format('DD/MM/YYYY')}</span>
        <a
          className="inline-flex px-3 py-2 bg-canvas rounded-md text-xs font-medium text-ink"
          href={`/sales-orders/${order.so_id}?so_number=${order.so_number}&pelanggan=${order.customer_name}&status=${order.overall_status}&pt=${ptAccess}`}
        >
          Detail
        </a>
      </div>
    </div>
  )
}
