import { Outlet } from 'react-router'
import { useState } from 'react'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'
import FirstChangePasswordDialog from '../../features/auth/components/FirstChangePasswordDialog.jsx'
import { useAuth } from '@/features/auth/context/AuthContext.jsx'

/** Kerangka aplikasi: sidebar tetap + area konten (topbar + halaman). */
export default function AppLayout() {
  const { user } = useAuth()
  const [openSidebar, setOpenSidebar] = useState(true)

  return (
    <div className="flex min-h-screen bg-canvas">
      {openSidebar && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setOpenSidebar(false)} aria-hidden="true" />}
      <Sidebar open={openSidebar} />
      <main className="overflow-y-auto max-h-screen no-scrollbar flex min-w-0 flex-1 flex-col">
        <Topbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
        <div className="px-4 pb-6 lg:px-6">
          <Outlet />
        </div>
      </main>
      {
        user?.password_changed_at === null && <FirstChangePasswordDialog />
      }
    </div>
  )
}
