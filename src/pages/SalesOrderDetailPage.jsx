import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import FilterBarDetail from "@/features/sales-order/components/FilterBarDetail";
import SalesOrderRow from "@/pages/SalesOrderRow";
import { DataPagination } from '@/components/common/data-pagination.jsx'

const COLUMNS = ['No. Invoice', 'Barang', 'Qty Pesanan', 'Qty Invoice / Qty Terkirim', 'Qty Outstanding SI / Qty Outstanding Delivery', 'Status Kirim', 'Invoice', 'SOkeSI', 'SIkeDN']

export default function SalesOrderDetailPage() {
    return (
        <>
            <div className="mb-5 flex items-end justify-between">
                <div>
                    <h2 className="text-lg font-bold">Sales Order Detail</h2>
                    <p className="mt-0.5 text-xs text-ink-3">Detail informasi sales order</p>
                </div>
            </div>
            <Card className="mb-4">
                <div className="grid grid-cols-3 gap-3 px-6 py-4">
                    <div className="border-r border-line pr-6">
                        <div className="text-xs text-ink-3 mb-1">SO Number</div>
                        <div className="text-2xl font-semibold">SO-001</div>
                    </div>
                    <div className="border-r border-line pr-6">
                        <div className="text-xs text-ink-3 mb-1">Pelanggan</div>
                        <div className="text-2xl font-semibold">PT. Contoh Pelanggan</div>
                    </div>
                    <div>
                        <div className="text-xs text-ink-3 mb-1">Status</div>
                        <div className="text-2xl font-semibold">
                            <Badge variant="success" className="!text-xl py-4">COMPLETED</Badge>
                        </div>
                    </div>
                </div>
            </Card>
            <FilterBarDetail />
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
                            {[1, 2, 3, 4].map((row) => (
                                <SalesOrderRow key={row} />
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="py-4">
                    <DataPagination
                        current={1}
                        perPage={10}
                        total={40}
                        onPageChange={(page) => {
                            // setSearchParams(prev => {
                            //   prev.set('page', page);
                            //   return prev;
                            // });
                        }}
                    />
                </div>
            </Card>
        </>
    )
}