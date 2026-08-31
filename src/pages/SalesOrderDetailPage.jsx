import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SalesOrderDetailCard from "@/features/sales-order/components/SalesOrderDetailCard";
import SalesOrderDetailRow from "@/features/sales-order/components/SalesOrderDetailRow";
import useSalesOrderDetail from "@/features/sales-order/hooks/useSalesOrderDetail";
import { useParams, useSearchParams } from 'react-router'

const COLUMNS = ['No. Invoice', 'Barang', 'Qty Pesanan', 'Qty Invoice / Qty Terkirim', 'Qty Outstanding SI / Qty Outstanding Delivery', 'Status Kirim', 'Invoice', 'SOkeSI', 'SIkeDN']
const STATUS_BADGE = { 'PENDING-INVOICE': 'warning', COMPLETED: 'success', 'CLOSED-PARTIAL': 'danger' }

export default function SalesOrderDetailPage() {
    const { id } = useParams()
    const [searchParams] = useSearchParams()
    const soNumber = searchParams.get('so_number')
    const customerName = searchParams.get('pelanggan')
    const status = searchParams.get('status')
    const ptAccess = searchParams.get('pt')
    const { salesOrder, loading, error } = useSalesOrderDetail(id, ptAccess)

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
                <div className="grid grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-3 sm:gap-3 sm:px-6">
                    <div className="border-b border-line pb-3 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">
                        <div className="text-xs text-ink-3 mb-1">SO Number</div>
                        <div className="text-lg font-semibold sm:text-2xl">{soNumber}</div>
                    </div>
                    <div className="border-b border-line pb-3 sm:border-b-0 sm:border-r sm:pb-0 sm:pr-6">
                        <div className="text-xs text-ink-3 mb-1">Pelanggan</div>
                        <div className="text-lg font-semibold sm:text-2xl">{customerName}</div>
                    </div>
                    <div>
                        <div className="text-xs text-ink-3 mb-1">Status</div>
                        <div className="text-lg font-semibold sm:text-2xl">
                            <Badge variant={STATUS_BADGE[status] ?? 'gray'} className="!text-base sm:!text-xl sm:py-4">{status}</Badge>
                        </div>
                    </div>
                </div>
            </Card>
            {/* <FilterBarDetail /> */}
            <Card className="mt-4">
                <div className="hidden overflow-x-auto lg:block">
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
                                <SalesOrderDetailRow key={row.id} row={row}/>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="space-y-3 p-4 lg:hidden">
                    {salesOrder.data.map((row) => (
                        <SalesOrderDetailCard key={row.id} row={row} />
                    ))}
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