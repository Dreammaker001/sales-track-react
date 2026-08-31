import { useNavigate } from 'react-router'
import dayjs from 'dayjs'
import Avatar from '../../../components/ui/Avatar.jsx'
import Badge from '../../../components/ui/Badge.jsx'
import Toggle from '../../../components/ui/Toggle.jsx'
import { initials } from '@/utils/format.js'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu.jsx'
import { EllipsisVertical } from 'lucide-react'

const STATUS_BADGE = { active: 'success', inactive: 'gray' }

/** Kartu pengguna untuk daftar di mode mobile. */
export default function UserCard({ user, onToggle, onChangePassword, onDelete }) {
  const navigate = useNavigate()
  const isAdmin = user.role === 'admin'

  return (
    <div className="rounded-md border border-line bg-surface p-4 shadow-card">
      <div className="flex items-center gap-3">
        <Avatar
          initials={initials(user.name)}
          size={32}
          variant={isAdmin ? 'default' : 'neutral'}
        />
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold">{user.name}</div>
          <div className="truncate text-[11px] text-ink-3">{user.username}</div>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span
          className={`inline-flex items-center gap-2 text-xs font-semibold ${isAdmin ? 'text-primary' : 'text-ink-2'}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${isAdmin ? 'bg-primary' : 'bg-ink-2'}`} />
          {user.role}
        </span>
        <Badge variant={STATUS_BADGE[user.status] ?? 'gray'}>
          {user.status === 'active' ? 'Aktif' : 'Nonaktif'}
        </Badge>
      </div>

      <div className="mt-3 flex items-center justify-between gap-3">
        <span className="text-xs text-ink-2">
          Terakhir login:{' '}
          {user.last_login ? dayjs(user.last_login).format('DD/MM/YYYY HH:mm') : '-'}
        </span>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="cursor-pointer text-ink-3 hover:text-ink-1 focus:outline-none focus:ring-0"
                aria-label="Aksi pengguna"
              >
                <EllipsisVertical />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={4}
              className="w-[180px] ring-0 bg-white border border-line shadow-md rounded-lg "
            >
              <DropdownMenuItem
                className="hover:bg-primary hover:text-white mb-1"
                onClick={() => navigate(`/admin/users/${user.id}/edit`)}
              >
                Edit Pengguna
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-primary hover:text-white"
                onClick={() => onChangePassword(user)}
              >
                Ganti Password
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-500 hover:bg-red-500 hover:text-white"
                onClick={() => onDelete(user)}
              >
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Toggle
            checked={user.status === 'active'}
            onChange={() =>
              onToggle({
                id: user.id,
                name: user.name,
                value: user.status === 'active' ? 'inactive' : 'active',
              })
            }
            label={`Aktifkan/nonaktifkan ${user.name}`}
          />
        </div>
      </div>
    </div>
  )
}
