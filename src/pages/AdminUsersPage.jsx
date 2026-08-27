import { useNavigate, useSearchParams } from 'react-router'
import * as React from 'react'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import FilterBar from '../features/admin-user/components/FilterBar.jsx'
import UsersTable from '../features/admin-user/components/UsersTable.jsx'
import useUsers from '../features/admin-user/hooks/useUsers.js'
import StatusDialog from '@/features/admin-user/components/StatusDialog.jsx'
import ChangePasswordDialog from '@/features/admin-user/components/ChangePasswordDialog.jsx'

export default function AdminUsersPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const initialQuery = searchParams.get('q') ?? ''
  const page = searchParams.get('page') ?? 1
  const [openStatusDialog, setOpenStatusDialog] = React.useState(false)
  const [openChangePasswordDialog, setOpenChangePasswordDialog] = React.useState(false)
  const [selectedUserForDialog, setSelectedUserForDialog] = React.useState(null)

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
  } = useUsers(initialQuery, page)

  const handleQueryChange = (value) => {
    setQuery(value)
    setSearchParams(prev => {
      prev.set('q', value)
      prev.set('page', 1) // Reset to first page on new query
      return prev
    })
  }

  return (
    <>
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-bold">Daftar Pengguna</h2>
          <p className="mt-0.5 text-xs text-ink-3">{users.pagination.total} pengguna terdaftar</p>
        </div>
        <Button
          className="cursor-pointer"
          onClick={() => navigate('/admin/users/create')}
        >+ Buat User</Button>
      </div>

      <FilterBar
        query={query}
        onQuery={handleQueryChange}
        role={role}
        onRole={setRole}
        status={status}
        onStatus={setStatus}
      />

      <Card>
        <UsersTable
          users={users}
          loading={loading}
          onToggle={(val) => {
            setOpenStatusDialog(true)
            setSelectedUserForDialog(val)
          }}
          onChangePassword={(val) => {
            setSelectedUserForDialog(val)
            setOpenChangePasswordDialog(true)
          }}
          setSearchParams={setSearchParams} />
      </Card>

      {
        openStatusDialog && (
          <StatusDialog
            onSubmit={() => {
              toggleStatus(selectedUserForDialog.id, selectedUserForDialog.value)
              setOpenStatusDialog(false)
            }}
            data={selectedUserForDialog}
            onCancel={() => setOpenStatusDialog(false)}
          />
        )
      }

      {
        openChangePasswordDialog && (
          <ChangePasswordDialog
            userData={selectedUserForDialog}
            onClose={() => setOpenChangePasswordDialog(false)}
          />
        )
      }
    </>
  )
}
