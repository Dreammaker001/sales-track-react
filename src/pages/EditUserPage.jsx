import { useNavigate, useParams } from 'react-router'
import Button from '@/components/ui/Button.jsx'
import Card from '@/components/ui/Card.jsx'
import UserForm from '@/features/admin-user/components/UserForm.jsx'
import {
  useUpdateUser,
  useUser,
  usePTDatabaseConfigOptions,
} from '@/features/admin-user/hooks/useUser.js'

/** Halaman Edit User — muat data user, lalu tampilkan UserForm mode="edit". */
export default function EditUserPage() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data: ptAccessOptions, isLoading: isLoadingPTAccessOptions } =
    usePTDatabaseConfigOptions()
  const { data: user, isLoading, isError, error } = useUser(id)
  const mutation = useUpdateUser()

  if (isLoading) {
    return <Card className="p-6 text-sm text-ink-2">Memuat data pengguna...</Card>
  }

  if (isError || !user) {
    return (
      <Card className="p-6">
        <p className="text-sm font-semibold text-danger">Gagal memuat pengguna</p>
        <p className="mt-1 text-[13px] text-ink-2">{error?.message}</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/admin/users')}>
          Kembali ke daftar
        </Button>
      </Card>
    )
  }

  return (
    <div className="flex justify-center">
      <UserForm
        mode="edit"
        initialValues={{
          username: user?.data?.username,
          name: user?.data?.name,
          role: user?.data?.role,
          status: user?.data?.status,
          access: user?.data?.access.map((a) => a.pt_key) || [],
        }}
        onSubmit={(values) => {
          mutation.mutate({ id: user?.data?.id, payload: values })
        }}
        isPending={mutation.isPending}
        ptAccessOptions={ptAccessOptions?.data}
        isLoadingPTAccessOptions={isLoadingPTAccessOptions}
      />
    </div>
  )
}
