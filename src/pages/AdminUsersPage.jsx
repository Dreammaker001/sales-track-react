import { useNavigate, useSearchParams } from 'react-router'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import FilterBar from '../features/admin/components/FilterBar.jsx'
import UsersTable from '../features/admin/components/UsersTable.jsx'
import useUsers from '../features/admin/hooks/useUsers.js'

export default function AdminUsersPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialQuery = searchParams.get('q') ?? ''

  const {
    users,
    loading,
    query,
    setQuery,
    role,
    setRole,
    status,
    setStatus,
    toggleStatus,
  } = useUsers(initialQuery)

  return (
    <>
      <div className="mb-5 flex items-end justify-between">
        <div>
          <h2 className="text-lg font-bold">Daftar Pengguna</h2>
          <p className="mt-0.5 text-xs text-ink-3">{users.length} pengguna terdaftar</p>
        </div>
        <Button onClick={() => navigate('/admin/users/buat')}>+ Buat User</Button>
      </div>

      <FilterBar
        query={query}
        onQuery={setQuery}
        role={role}
        onRole={setRole}
        status={status}
        onStatus={setStatus}
      />

      <Card>
        <UsersTable users={users} loading={loading} onToggle={toggleStatus} />
      </Card>
    </>
  )
}
