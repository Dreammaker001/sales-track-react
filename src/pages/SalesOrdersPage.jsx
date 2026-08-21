import FilterBar from "@/features/sales-order/components/FilterBar";
import SalesOrdersTable from "@/features/sales-order/components/SalesOrdersTable";
import useSalesOrders from "@/features/sales-order/hooks/useSalesOrders";
import Card from "@/components/ui/Card";
import { useEffect } from "react";

export default function SalesOrdersPage() {
    const {
        salesOrders,
        loading,
        query,
        setQuery,
        status,
        setStatus,
        invoice,
        setInvoice,
    } = useSalesOrders()

    useEffect(() => {
        console.log(salesOrders)
    }, [salesOrders])
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
                onQuery={setQuery}
                status={status}
                onStatus={setStatus}
                invoice={invoice}
                onInvoice={setInvoice}
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