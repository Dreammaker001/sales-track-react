import { Outlet } from 'react-router'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

/** Kerangka aplikasi: sidebar tetap + area konten (topbar + halaman). */
export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar />
      <main className="ml-[240px] flex min-w-0 flex-1 flex-col">
        <Topbar />
        <div className="px-6 pb-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
