import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from 'react-router'
import { router } from './routes'
import { AuthProvider } from './features/auth/context/AuthContext'

/**
 * Default global TanStack Query:
 * - refetchOnWindowFocus: false → hindari refetch mengejutkan; kontrol via invalidate/polling
 * - staleTime 30s → master data dianggap segar 30 detik (per-query bisa di-override)
 * - retry 1x untuk error transien
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 30_000,
    },
  },
})

export default function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  )
}
