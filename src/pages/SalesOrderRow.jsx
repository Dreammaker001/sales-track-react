import Badge from "@/components/ui/Badge";
import { formatTimeFromSeconds } from "@/utils/format";

export default function SalesOrderRow({ row }) {
    return (
        <tr className="transition-colors hover:bg-[#fafafd]">
            <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
                {row.invoice_number}
            </td>
            <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
                {row.item_name}
            </td>
            <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
                {row.qty_ordered}
            </td>
            <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
                {row.qty_invoiced} / {row.qty_delivered}
            </td>
            <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
                {row.qty_outstanding_si} / {row.qty_outstanding_delivery}
            </td>
            <td className="px-4 py-3 align-middle whitespace-nowrap">
                <Badge variant={row.status_delivery === 'SUDAH TERKIRIM' ? 'success' : 'danger'}>
                    {row.status_delivery}
                </Badge>
            </td>
            <td className="px-4 py-3 align-middle whitespace-nowrap">
                <Badge variant={row.status_si === 'SUDAH SI' ? 'success' : 'danger'}>
                    {row.status_si}
                </Badge>
            </td>
            <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
                {formatTimeFromSeconds(row.detik_so_ke_si)}
            </td>
            <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
                {formatTimeFromSeconds(row.detik_si_ke_dn)}
            </td>
        </tr>
    )
}