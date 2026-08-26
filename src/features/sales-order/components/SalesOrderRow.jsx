import Badge from '../../../components/ui/Badge.jsx'
import dayjs from 'dayjs'

const STATUS_BADGE = { 'PENDING-INVOICE': 'warning', COMPLETED: 'success' }

/** Satu baris pengguna di tabel. */
export default function SalesOrderRow({ order }) {

  return (
    <tr className="transition-colors hover:bg-[#fafafd]">
      <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
        {order.so_number}
      </td>
      <td className="px-4 py-3 align-middle whitespace-nowrap text-ink text-xs">{order.customer_name}</td>
        <td className="px-4 py-3 align-middle whitespace-nowrap text-ink text-xs">{dayjs(order.so_date_time).format('DD/MM/YYYY')}</td>
        <td className="px-4 py-3 align-middle whitespace-nowrap text-ink text-xs flex gap-2">
            <div className="flex-auto relative">
                <div className="h-2 bg-canvas rounded-md"></div>
                <div className={`h-2 ${order.percent_invoice <= 50 ? 'bg-yellow-500' : order.percent_invoice === 100 ? 'bg-green-500' : 'bg-blue-500'} absolute top-0 left-0 rounded-md`} style={{ width: `${order.percent_invoice}%` }}></div>
            </div>
            <span className="self-start">{order.percent_invoice}%</span>
        </td>
        <td className="px-4 py-3 align-middle whitespace-nowrap">
            <Badge variant={STATUS_BADGE[order.overall_status] ?? 'gray'}>{order.overall_status === 'PENDING-INVOICE' ? 'Pending Invoice' : order.overall_status === 'COMPLETED' ? 'Selesai' : '-'}</Badge>
        </td>
      <td className="px-4 py-3 align-middle whitespace-nowrap text-ink text-xs"><a className="px-3 py-2 bg-canvas rounded-md" href={`/sales-orders/${order.so_id}?so_number=${order.so_number}&pelanggan=${order.customer_name}&status=${order.overall_status}`}>Detail</a></td>
    </tr>
  )
}
