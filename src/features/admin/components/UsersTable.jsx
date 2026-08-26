import { DataPagination } from '@/components/common/DataPagination.jsx'
import UserRow from './UserRow.jsx'
import UserCard from './UserCard.jsx'

const COLUMNS = ['User', 'Peran', 'Status', 'Terakhir Login', 'Aksi']

/** Tabel daftar pengguna dengan header + state loading/empty. */
export default function UsersTable({ users, loading, onToggle, onChangePassword, setSearchParams }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 p-10 text-sm text-ink-3">
        <span className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-track border-t-primary" />
        Memuat pengguna...
      </div>
    )
  }

  if (users.data?.length === 0) {
    return <div className="p-10 text-center text-sm text-ink-3">Tidak ada pengguna yang cocok dengan filter.</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between px-6 pt-5 pb-3">
        <h3 className="text-base font-bold">Semua Pengguna</h3>
        <span className="text-xs text-ink-3">{users.data?.length} hasil</span>
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
            {users.data?.map((user) => (
              <UserRow key={user.id} user={user} onToggle={onToggle} onChangePassword={onChangePassword} />
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-3 px-4 pt-1 pb-4 lg:hidden">
        {users.data?.map((user) => (
          <UserCard key={user.id} user={user} onToggle={onToggle} onChangePassword={onChangePassword} />
        ))}
      </div>

      <div className="flex items-center justify-end px-6 py-4 border-t border-(--color-canvas)">
        <DataPagination
          current={users.pagination.page}
          perPage={users.pagination.per_page}
          total={users.pagination.total}
          onPageChange={(page) => {
            setSearchParams(prev => {
              prev.set('page', page);
              return prev;
            });
          }}
        />
      </div>
    </div>
  )
}
