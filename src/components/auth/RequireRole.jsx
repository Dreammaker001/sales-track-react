import { Navigate } from 'react-router'
import { useAuth } from '@/features/auth/context/AuthContext.jsx'

/**
 * Guard peran: hanya role di `roles` yang boleh mengakses.
 * Catatan: ini untuk UX (sembunyikan/arahkan) — otorisasi SEJATI tetap
 * divalidasi backend dari cookie/token di setiap endpoint.
 */
export default function RequireRole({ roles, children }) {
  const { role } = useAuth()

  if (!roles.includes(role)) {
    return <Navigate to="/sales-orders" replace />
  }

  return children
}
