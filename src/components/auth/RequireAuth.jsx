import { Navigate } from 'react-router'
import { useAuth } from '@/features/auth/context/AuthContext.jsx'

/**
 * Guard sesi: menunggu status 'checking' (boot /auth/me) lalu mengarahkan
 * user yang belum login ke halaman /login.
 */
export default function RequireAuth({ children }) {
  const { status } = useAuth()

  if (status === 'checking') {
    return (
      <div className="grid min-h-screen place-items-center bg-canvas text-sm text-ink-2">
        Memeriksa sesi...
      </div>
    )
  }

  if (status === 'guest') {
    return <Navigate to="/login" replace />
  }

  return children
}
