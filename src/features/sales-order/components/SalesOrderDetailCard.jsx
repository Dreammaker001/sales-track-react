import Badge from "@/components/ui/Badge";
import { formatTimeFromSeconds } from "@/utils/format";

/** Kartu baris detail sales order untuk mode mobile. */
export default function SalesOrderDetailCard({ row }) {
  return (
    <div className="rounded-md border border-line bg-surface p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="font-semibold text-ink">{row.invoice_number}</div>
        <Badge variant={row.status_delivery === 'SUDAH TERKIRIM' ? 'success' : 'danger'}>
          {row.status_delivery}
        </Badge>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <div className="text-[11px] text-ink-3">Barang</div>
          <div className="text-xs text-ink">{row.item_name}</div>
        </div>
        <div>
          <div className="text-[11px] text-ink-3">Qty Pesanan</div>
          <div className="text-xs text-ink">{row.qty_ordered}</div>
        </div>
        <div>
          <div className="text-[11px] text-ink-3">Qty Invoice / Terkirim</div>
          <div className="text-xs text-ink">{row.qty_invoiced} / {row.qty_delivered}</div>
        </div>
        <div>
          <div className="text-[11px] text-ink-3">Outstanding SI / Delivery</div>
          <div className="text-xs text-ink">{row.qty_outstanding_si} / {row.qty_outstanding_delivery}</div>
        </div>
        <div>
          <div className="text-[11px] text-ink-3">Status SI</div>
          <Badge variant={row.status_si === 'SUDAH SI' ? 'success' : 'danger'}>
            {row.status_si}
          </Badge>
        </div>
        <div>
          <div className="text-[11px] text-ink-3">SO ke SI</div>
          <div className="text-xs text-ink">{formatTimeFromSeconds(row.detik_so_ke_si)}</div>
        </div>
        <div>
          <div className="text-[11px] text-ink-3">SI ke DN</div>
          <div className="text-xs text-ink">{formatTimeFromSeconds(row.detik_si_ke_dn)}</div>
        </div>
      </div>
    </div>
  )
}
