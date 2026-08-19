import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { createUser } from '@/features/admin/api/usersApi.js'
import UserForm from '@/features/admin/components/UserForm.jsx'

/** Halaman Buat User — bungkus tipis di atas UserForm mode="create". */
export default function CreateUserPage() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      navigate('/admin/users')
    },
  })

  return (
    <UserForm
      mode="create"
      onSubmit={(values) => mutation.mutate(values)}
      isPending={mutation.isPending}
    />
  )
}
