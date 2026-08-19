import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import { changeUserPassword } from '../api/usersApi'

export function useChangePasswordUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }) => changeUserPassword(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('Password user berhasil diubah')
    },
    onError: (error) => {
      toast.error(`Gagal mengubah password user: ${error.message}`)
    }
  })
}