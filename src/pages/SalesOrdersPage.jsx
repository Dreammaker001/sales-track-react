import FilterBar from "@/features/sales-order/components/FilterBar";
import SalesOrdersTable from "@/features/sales-order/components/SalesOrdersTable";
import useSalesOrders from "@/features/sales-order/hooks/useSalesOrders";
import Card from "@/components/ui/Card";
import { toast } from "sonner";

export default function SalesOrdersPage() {
    const {
        salesOrders,
        loading,
        query,
        status,
        setStatus,
        invoice,
        setInvoice,
        searchBy,
        refetch,
        setSearchParams,
    } = useSalesOrders()

    return (
        <>
            <div className="mb-5 flex items-end justify-between">
                <div>
                    <h2 className="text-lg font-bold">Sales Orders</h2>
                    <p className="mt-0.5 text-xs text-ink-3">Kelola dan pantau semua pesanan penjualan</p>
                </div>
            </div>

            <FilterBar
                query={query}
                status={status}
                onStatus={setStatus}
                invoice={invoice}
                onInvoice={setInvoice}
                searchBy={searchBy}
                setSearchParams={setSearchParams}
                onSearch={() => {
                    if (!query || query === '') {
                        toast.error('Masukkan kata kunci pencarian terlebih dahulu')
                        return
                    }
                    refetch()
                }}
            />

            <Card>
                <SalesOrdersTable
                    data={salesOrders}
                    loading={loading}
                />
            </Card>
        </>
    )
}