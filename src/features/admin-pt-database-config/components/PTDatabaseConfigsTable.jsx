import { DataPagination } from '@/components/common/DataPagination.jsx'
import PTDatabaseConfigRow from './PTDatabaseConfigRow.jsx'
// import PTDatabaseConfigCard from './PTDatabaseConfigCard.jsx'

const COLUMNS = ['Kode', 'Nama PT', 'Dibuat', 'Diubah', 'Status', 'Aksi']

/** Tabel daftar pengguna dengan header + state loading/empty. */
export default function PTDatabaseConfigsTable({ datas, loading, error, setPage }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 p-10 text-sm text-ink-3">
        <span className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-track border-t-primary" />
        Memuat...
      </div>
    )
  }

  if (datas.data?.length === 0) {
    return <div className="p-10 text-center text-sm text-ink-3">Tidak ada data yang cocok dengan filter.</div>
  }

  if (error) {
    return <div className="p-10 text-center text-sm text-red-500">Terjadi kesalahan: {error}</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between px-6 pt-5 pb-3">
        <h3 className="text-base font-bold">Semua Konfigurasi Database PT</h3>
        <span className="text-xs text-ink-3">{datas.data?.length} hasil</span>
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
            {datas.data?.map((data) => (
              <PTDatabaseConfigRow key={data.id} data={data} />
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="space-y-3 px-4 pt-1 pb-4 lg:hidden">
        {datas.data?.map((data) => (
          <UserCard key={data.id} data={data} />
        ))}
      </div> */}

      <div className="flex items-center justify-end px-6 py-4 border-t border-(--color-canvas)">
        <DataPagination
          current={datas.pagination.page}
          perPage={datas.pagination.per_page}
          total={datas.pagination.total}
          onPageChange={setPage}
        />
      </div>
    </div>
  )
}
