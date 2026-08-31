import Badge from '../../../components/ui/Badge.jsx'
import dayjs from 'dayjs'
import { formatTimeFromSeconds } from '@/utils/format.js'

const STATUS_BADGE = {
  'BELUM TERKIRIM': 'warning',
  'SUDAH TERKIRIM': 'success',
}

/** Satu baris pengguna di tabel. */
export default function SalesInvoiceRow({ data }) {
  return (
    <tr className="transition-colors hover:bg-[#fafafd]">
      <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
        {data.invoice_number}
      </td>
      <td className="px-4 py-3 align-middle whitespace-nowrap text-ink text-xs">
        {data.customer_name}
      </td>
      <td className="px-4 py-3 align-middle whitespace-nowrap text-ink text-xs">
        {dayjs(data.si_date_time).format('DD/MM/YYYY')}
      </td>
      <td className="px-4 py-3 align-middle whitespace-nowrap text-ink text-xs">
        {dayjs(data.delivery_date_time).format('DD/MM/YYYY')}
      </td>
      <td className="px-4 py-3 align-middle whitespace-nowrap text-ink text-xs">
        {formatTimeFromSeconds(data.detik_si_ke_dn)}
      </td>
      <td className="px-4 py-3 align-middle whitespace-nowrap">
        <Badge variant={STATUS_BADGE[data.status] ?? 'gray'}>{data.status ?? '-'}</Badge>
      </td>
    </tr>
  )
}
