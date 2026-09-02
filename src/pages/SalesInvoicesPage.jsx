import FilterBar from '@/features/sales-invoice/components/FilterBar'
import useSalesInvoices from '@/features/sales-invoice/hooks/useSalesInvoices'
import { usePTAccess } from '@/hooks/useUserPTAccess.js'
import { toast } from 'sonner'
import Card from '@/components/ui/Card'
import { SalesInvoicesTable } from '@/features/sales-invoice/components/SalesInvoicesTable.jsx'

export default function SalesInvoicesPage() {
  const {
    salesInvoices,
    loading,
    query,
    searchBy,
    pt,
    periodMonth,
    status,
    setStatus,
    refetch,
    setSearchParams,
  } = useSalesInvoices()

  const {
    data: ptAccessOptions = {
      data: [],
    },
  } = usePTAccess()

  return (
    <>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold">Sales Invoices</h2>
          <p className="mt-0.5 text-xs text-ink-3">Kelola dan pantau semua faktur penjualan</p>
        </div>
      </div>

      <FilterBar
        query={query}
        searchBy={searchBy}
        setSearchParams={setSearchParams}
        ptAccess={pt}
        periodMonth={periodMonth}
        status={status}
        onStatus={setStatus}
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
        <SalesInvoicesTable datas={salesInvoices} loading={loading} status={status} />
      </Card>
    </>
  )
}
