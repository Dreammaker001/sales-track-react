import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchUserByID, updateUser } from '../api/usersApi.js'
import { toast } from "sonner"

/** Ambil detail satu user (cache per username). */
export function useUser(id) {
  return useQuery({
    queryKey: ['users', 'detail', id],
    queryFn: () => fetchUserByID(id),
    enabled: Boolean(id),
  })
}

/** Simpan perubahan user; invalidate list + detail agar UI selaras. */
export function useUpdateUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, payload }) => updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('Perubahan user berhasil disimpan')
    },
    onError: (error) => {
      toast.error(`Gagal menyimpan perubahan user: ${error.message}`)
    }
  })
}
