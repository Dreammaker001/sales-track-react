import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SalesOrderRow from "@/pages/SalesOrderRow";
import useSalesOrderDetail from "@/features/sales-order/hooks/useSalesOrderDetail";
import { useParams, useSearchParams } from 'react-router'

const COLUMNS = ['No. Invoice', 'Barang', 'Qty Pesanan', 'Qty Invoice / Qty Terkirim', 'Qty Outstanding SI / Qty Outstanding Delivery', 'Status Kirim', 'Invoice', 'SOkeSI', 'SIkeDN']

export default function SalesOrderDetailPage() {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const soNumber = searchParams.get('so_number')
    const customerName = searchParams.get('pelanggan')
    const status = searchParams.get('status')
    const { salesOrder, loading, error } = useSalesOrderDetail(id)

    if (loading) {
        return (
            <div className="flex items-center justify-center gap-3 p-10 text-sm text-ink-3">
                <span className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-track border-t-primary" />
                Memuat...
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-ink-3">Error: {error}</div>
            </div>
        )
    }

    if (!salesOrder) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="text-ink-3">Sales order not found.</div>
            </div>
        )
    }

    return (
        <>
            <Card className="mb-4">
                <div className="grid grid-cols-3 gap-3 px-6 py-4">
                    <div className="border-r border-line pr-6">
                        <div className="text-xs text-ink-3 mb-1">SO Number</div>
                        <div className="text-2xl font-semibold">{soNumber}</div>
                    </div>
                    <div className="border-r border-line pr-6">
                        <div className="text-xs text-ink-3 mb-1">Pelanggan</div>
                        <div className="text-2xl font-semibold">{customerName}</div>
                    </div>
                    <div>
                        <div className="text-xs text-ink-3 mb-1">Status</div>
                        <div className="text-2xl font-semibold">
                            <Badge variant={status === 'COMPLETED' ? 'success' : status === 'PENDING-INVOICE' ? 'warning' : 'gray'} className="!text-xl py-4">{status}</Badge>
                        </div>
                    </div>
                </div>
            </Card>
            {/* <FilterBarDetail /> */}
            <Card className="mt-4">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] border-collapse">
                        <thead>
                            <tr>
                                {COLUMNS.map((col) => (
                                    <th
                                        key={col}
                                        className="border-y border-line px-4 py-3 text-left text-xs font-semibold whitespace-nowrap text-ink-3"
                                    >
                                        {col}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {salesOrder.data.map((row) => (
                                <SalesOrderRow key={row.id} row={row} />
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* <div className="py-4">
                    <DataPagination
                        current={1}
                        perPage={10}
                        total={40}
                        onPageChange={() => {
                            // setSearchParams(prev => {
                            //   prev.set('page', page);
                            //   return prev;
                            // });
                        }}
                    />
                </div> */}
            </Card>
        </>
    )
}