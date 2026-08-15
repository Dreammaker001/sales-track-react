import { NavLink } from 'react-router'
import Avatar from '../ui/Avatar.jsx'

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/sales-orders', label: 'Sales Orders' },
  { to: '/invoices', label: 'Invoices' },
  { to: '/admin/users', label: 'Admin' },
  { to: '/settings', label: 'Pengaturan' },
]

const SUPPORT_LINKS = ['Pusat Bantuan', 'Laporkan Masalah']

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 flex w-[240px] flex-col border-r border-line bg-surface">
      <div className="flex items-center gap-3 px-6 pb-5 pt-6">
        <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-primary text-xl font-black text-white">
          S
        </span>
        <span className="text-lg font-bold">SalesTrack</span>
      </div>

      <nav className="flex flex-col gap-0.5 px-4" aria-label="Menu utama">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `relative flex h-10 items-center gap-4 rounded-sm px-4 text-sm transition-colors ${
                isActive
                  ? 'bg-primary-soft font-semibold text-primary'
                  : 'text-ink-2 hover:bg-gray-soft hover:text-ink'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute -left-4 top-2 bottom-2 w-1 rounded bg-primary" />
                )}
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    isActive ? 'bg-primary' : 'bg-line'
                  }`}
                />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mx-6 mb-5 mt-6 h-px bg-line" />

      <p className="mb-2 px-6 text-[11px] font-semibold tracking-wider text-ink-3 uppercase">
        Dukungan
      </p>
      {SUPPORT_LINKS.map((label) => (
        <a
          key={label}
          href="#"
          onClick={(e) => e.preventDefault()}
          className="flex items-center gap-4 px-6 py-2 text-sm text-ink-2 hover:text-ink"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-line" />
          {label}
        </a>
      ))}

      <div className="mt-auto flex items-center gap-3 border-t border-line px-6 py-4">
        <Avatar initials="AW" size={36} variant="primary" />
        <div>
          <div className="text-sm font-semibold">Andi Wijaya</div>
          <div className="text-[11px] text-ink-3">Administrator</div>
        </div>
      </div>
    </aside>
  )
}
