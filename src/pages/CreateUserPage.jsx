import { useMutation, useQueryClient } from '@tanstack/react-query'
import { usePTDatabaseConfigOptions } from '@/features/admin-user/hooks/useUser.js'
import { useNavigate } from 'react-router'
import { createUser } from '@/features/admin-user/api/usersApi.js'
import UserForm from '@/features/admin-user/components/UserForm.jsx'

/** Halaman Buat User — bungkus tipis di atas UserForm mode="create". */
export default function CreateUserPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: ptAccessOptions, isLoading } = usePTDatabaseConfigOptions()

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      navigate('/admin/users')
    },
  })

  return (
    <div className="flex justify-center">
      <UserForm
        mode="create"
        onSubmit={(values) => mutation.mutate(values)}
        isPending={mutation.isPending}
        ptAccessOptions={ptAccessOptions?.data}
        isLoadingPTAccessOptions={isLoading}
      />
    </div>
  )
}
