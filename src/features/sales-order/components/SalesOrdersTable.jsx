import SalesOrderRow from './SalesOrderRow.jsx'
import SalesOrderCard from './SalesOrderCard.jsx'

const COLUMNS = ['SO Number', 'Pelanggan', 'Tanggal', 'Proses', 'Status', 'Aksi']

/** Tabel daftar pengguna dengan header + state loading/empty. */
export default function SalesOrdersTable({ data, loading, ptAccess, status }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 p-10 text-sm text-ink-3">
        <span className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-track border-t-primary" />
        Memuat sales order...
      </div>
    )
  }

  if (data?.data?.length === 0) {
    return (
      <div className="p-10 text-center text-sm text-ink-3">
        Tidak ada sales order yang cocok dengan filter.
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between px-6 pt-5 pb-3">
        <h3 className="text-base font-bold">Semua Sales Order</h3>
        <span className="text-xs text-ink-3">{data.data?.length} hasil</span>
      </div>

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
            {data?.data
              .filter((order) => (status != '' ? order.overall_status === status : true))
              ?.map((order) => (
                <SalesOrderRow key={order.id} order={order} ptAccess={ptAccess} />
              ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 px-4 pt-1 pb-4 lg:hidden">
        {data?.data
          ?.filter((order) => order.overall_status === status)
          ?.map((order) => (
            <SalesOrderCard key={order.id} order={order} ptAccess={ptAccess} />
          ))}
      </div>
      {/* <div className="flex items-center justify-end px-6 py-4 border-t border-(--color-canvas)">
        <DataPagination
          current={data.pagination.page}
          perPage={data.pagination.per_page}
          total={data.pagination.total}
          onPageChange={(page) => {
            setSearchParams(prev => {
              prev.set('page', page);
              return prev;
            });
          }}
        />
      </div> */}
    </div>
  )
}
