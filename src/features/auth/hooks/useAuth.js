import { useMutation } from '@tanstack/react-query'
import { changePassword } from '../api/authApi'
import { toast } from 'sonner'
import { useAuth as useAuthContext } from '@/features/auth/context/AuthContext.jsx'

export default function useAuth() {
  const { logout } = useAuthContext()
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      logout()
    },
    onError: (error) => {
      toast.error(error?.message || 'Terjadi kesalahan saat mengubah kata sandi.')
    },
  })
}
