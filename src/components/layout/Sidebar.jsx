import { NavLink } from 'react-router'
import Avatar from '../ui/Avatar.jsx'
import { useAuth } from '@/features/auth/context/AuthContext.jsx'
import { initials } from '@/utils/format.js'
import { SquareArrowRightExit } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/sales-orders', label: 'Sales Orders' },
  { to: '/sales-invoices', label: 'Sales Invoices' },
]

const NAV_ITEMS_ADMIN = [
  { to: '/admin/users', label: 'Users' },
  { to: '/admin/pt-database-configs', label: 'PT Database Configs' },
]

const SUPPORT_LINKS = ['Pusat Bantuan', 'Laporkan Masalah']

export default function Sidebar({ open }) {
  const { user, role, logout } = useAuth()
  const isAdmin = role === 'admin'

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r border-line bg-surface transition-transform duration-300 lg:static lg:z-auto lg:transition-all lg:duration-300 overflow-y-auto lg:overflow-hidden ${open ? 'translate-x-0 lg:w-[240px]' : '-translate-x-full lg:w-0'}`}
    >
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
        {isAdmin && (
          <>
            <div className="mt-4 mb-2 px-4 text-[11px] font-semibold tracking-wider text-ink-3 uppercase">
              Admin
            </div>
            {NAV_ITEMS_ADMIN.map((item) => (
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
          </>
        )}
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

      <div className="mt-auto flex justify-between gap-3 border-t border-line">
        <div className="mt-auto flex items-center gap-3 px-6 py-4">
          <Avatar initials={user?.name ? initials(user.name) : '?'} size={36} variant="primary" />
          <div>
            <div className="text-sm font-semibold">{user?.name ?? 'Pengguna'}</div>
            <div className="text-[11px] text-ink-3">{isAdmin ? 'Administrator' : 'Sales'}</div>
          </div>
        </div>
        <button
          className="flex h-full cursor-pointer items-center justify-center px-4 text-ink-2 hover:text-ink"
          onClick={() => {
            logout()
          }}
        >
          <SquareArrowRightExit className="h-6 w-6" />
        </button>
        {/* <div className="flex h-full cursor-pointer items-center justify-center px-4">
          <SquareArrowRightExit className="h-6 w-6 text-ink-2 hover:text-ink"/>
        </div> */}
      </div>
    </aside>
  )
}
