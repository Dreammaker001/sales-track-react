import FilterBar from '@/features/sales-order/components/FilterBar'
import SalesOrdersTable from '@/features/sales-order/components/SalesOrdersTable'
import useSalesOrders from '@/features/sales-order/hooks/useSalesOrders'
import { usePTAccess } from '@/hooks/useUserPTAccess.js'
import Card from '@/components/ui/Card'
import { toast } from 'sonner'

export default function SalesOrdersPage() {
  const {
    salesOrders,
    loading,
    query,
    status,
    setStatus,
    searchBy,
    pt,
    periodMonth,
    refetch,
    setSearchParams,
  } = useSalesOrders()

  const {
    data: ptAccessOptions = {
      data: [],
    },
  } = usePTAccess()

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
        searchBy={searchBy}
        setSearchParams={setSearchParams}
        ptAccess={pt}
        periodMonth={periodMonth}
        onSearch={() => {
          if (
            !query ||
            query === '' ||
            pt === null ||
            pt === '' ||
            searchBy === null ||
            searchBy === ''
          ) {
            toast.error('Masukkan kata kunci pencarian terlebih dahulu')
            return
          }
          refetch()
        }}
        ptAccessOptions={
          ptAccessOptions?.data?.map((item) => ({
            label: item?.pt?.pt_name,
            value: item?.pt_key,
          })) || []
        }
      />

      <Card>
        <SalesOrdersTable ptAccess={pt} data={salesOrders} status={status} loading={loading} />
      </Card>
    </>
  )
}
