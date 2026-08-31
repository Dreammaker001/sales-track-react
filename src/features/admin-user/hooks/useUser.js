import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchUserByID, updateUser, getPTDatabaseConfigOptons, deleteUser } from '../api/usersApi.js'
import { toast } from "sonner"
import { useNavigate } from 'react-router'

/** Ambil detail satu user (cache per username). */
export function useUser(id) {
  return useQuery({
    queryKey: ['users', 'detail', id],
    queryFn: () => fetchUserByID(id),
    enabled: Boolean(id),
  })
}

export function usePTDatabaseConfigOptions() {
  return useQuery({
    queryKey: ['users', 'pt-access-options'],
    queryFn: () => getPTDatabaseConfigOptons(),
  })
}

/** Simpan perubahan user; invalidate list + detail agar UI selaras. */
export function useUpdateUser() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: ({ id, payload }) => updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('Perubahan user berhasil disimpan')
      navigate(-1)
    },
    onError: (error) => {
      toast.error(`Gagal menyimpan perubahan user: ${error.message}`)
    }
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('User berhasil dihapus')
    },
    onError: (error) => {
      toast.error(`Gagal menghapus user: ${error.message}`)
    }
  })
}