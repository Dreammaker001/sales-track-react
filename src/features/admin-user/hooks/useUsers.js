import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebounce } from '../../../hooks/useDebounce.js'
import { fetchUsers, toggleUserStatus } from '../api/usersApi.js'
import { toast } from "sonner"

/**
 * State halaman Admin Users (pola TanStack Query):
 * - useQuery: fetch + cache list user, filter masuk queryKey (beda filter = cache beda)
 * - useMutation: toggle status dengan optimistic update + rollback + invalidate
 */
export default function useUsers(initialQuery = '', page = 1) {
  const queryClient = useQueryClient()

  const [query, setQuery] = useState(initialQuery)
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('')

  const debouncedQuery = useDebounce(query, 250)
  const filters = { q: debouncedQuery, role, status, page }

  const {
    data: users = {
      data: [],
      pagination: { page: 1, per_page: 10, total: 0 },
    },
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['users', filters],
    queryFn: () => fetchUsers(filters),
  })

  const mutation = useMutation({
    mutationFn: ({ id, value }) => toggleUserStatus(id, value),

    // Optimistic: UI berubah dulu, snapshot lama disimpan utk rollback
    onMutate: async ({ id, value }) => {
      const previous = queryClient.getQueryData(['users', filters])
      queryClient.setQueryData(['users', filters], (old = { data: [] }) => ({
        ...old,
        data: old.data.map((u) =>
          u.id === id ? { ...u, status: value } : u,
        ),
      }))
      return { previous }
    },

    // Gagal → kembalikan snapshot
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['users', filters], context.previous)
      }
      toast.error('Gagal mengubah status user. Silakan coba lagi.')
    },

    // Sukses/gagal → pastikan cache selaras dengan server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      toast.success('Status user berhasil diubah.')
    },
  })

  return {
    users,
    loading: isLoading,
    error: isError ? error.message : null,
    query,
    setQuery,
    role,
    setRole,
    status,
    setStatus,
    toggleStatus: (id, value) => mutation.mutate({ id, value }),
  }
}
