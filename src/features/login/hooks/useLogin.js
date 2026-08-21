import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { useAuth } from '@/features/auth/context/AuthContext.jsx'
import { login } from '../api/loginApi'

/**
 * Mutation login: sukses → isi sesi (user/role, memory-only) + redirect.
 * Token tidak disentuh frontend — backend menyimpannya di cookie HttpOnly.
 */
export function useLogin() {
  const navigate = useNavigate()
  const { setSession } = useAuth()

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      setSession(data)
      navigate('/sales-orders', { replace: true })
    },
  })
}
