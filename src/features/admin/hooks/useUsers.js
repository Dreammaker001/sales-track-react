import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useDebounce } from '../../../hooks/useDebounce.js'
import { fetchUsers, toggleUserStatus } from '../api/usersApi.js'

const flipStatus = (status) => (status === 'Aktif' ? 'Nonaktif' : 'Aktif')

/**
 * State halaman Admin Users (pola TanStack Query):
 * - useQuery: fetch + cache list user, filter masuk queryKey (beda filter = cache beda)
 * - useMutation: toggle status dengan optimistic update + rollback + invalidate
 */
export default function useUsers(initialQuery = '') {
  const queryClient = useQueryClient()

  const [query, setQuery] = useState(initialQuery)
  const [role, setRole] = useState('Semua')
  const [status, setStatus] = useState('Semua')

  const debouncedQuery = useDebounce(query, 250)
  const filters = { query: debouncedQuery, role, status }

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['users', filters],
    queryFn: () => fetchUsers(filters),
  })

  const mutation = useMutation({
    mutationFn: toggleUserStatus,

    // Optimistic: UI berubah dulu, snapshot lama disimpan utk rollback
    onMutate: async (id) => {
      const previous = queryClient.getQueryData(['users', filters])
      queryClient.setQueryData(['users', filters], (old = []) =>
        old.map((u) =>
          u.id === id ? { ...u, status: flipStatus(u.status) } : u,
        ),
      )
      return { previous }
    },

    // Gagal → kembalikan snapshot
    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['users', filters], context.previous)
      }
    },

    // Sukses/gagal → pastikan cache selaras dengan server
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
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
    toggleStatus: mutation.mutate,
  }
}
