import { useNavigate } from 'react-router'
import dayjs from 'dayjs'
import Avatar from '../../../components/ui/Avatar.jsx'
import Badge from '../../../components/ui/Badge.jsx'
import Toggle from '../../../components/ui/Toggle.jsx'
import { initials } from '../../../utils/format.js'

const STATUS_BADGE = { active: 'success', inactive: 'gray' }

/** Satu baris pengguna di tabel. */
export default function UserRow({ user, onToggle }) {
  const navigate = useNavigate()
  const isAdmin = user.role === 'admin'

  return (
    <tr className="transition-colors hover:bg-[#fafafd]">
      <td className="px-4 py-3 align-middle whitespace-nowrap">
        <div className="flex items-center gap-3">
          <Avatar
            initials={initials(user.name)}
            size={32}
            variant={isAdmin ? 'default' : 'neutral'}
          />
          <div>
            <div className="text-sm leading-tight font-semibold">{user.name}</div>
            <div className="text-[11px] leading-tight text-ink-3">
              {user.username}
            </div>
          </div>
        </div>
      </td>

      <td className="px-4 py-3 align-middle whitespace-nowrap">
        <span
          className={`inline-flex items-center gap-2 text-xs font-semibold ${
            isAdmin ? 'text-primary' : 'text-ink-2'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${isAdmin ? 'bg-primary' : 'bg-ink-2'}`}
          />
          {user.role}
        </span>
      </td>

      <td className="px-4 py-3 align-middle whitespace-nowrap">
        <Badge variant={STATUS_BADGE[user.status] ?? 'gray'}>{user.status === 'active' ? 'Aktif' : 'Nonaktif'}</Badge>
      </td>

      <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
        {user.last_login ? dayjs(user.last_login).format('DD/MM/YYYY HH:mm') : '-'}
      </td>

      <td className="px-4 py-3 align-middle whitespace-nowrap">
        <div className="flex items-center gap-6">
          <button
            type="button"
            className="text-xs font-semibold text-primary hover:underline"
            onClick={() => navigate(`/admin/users/${user.username}/ganti-password`)}
          >
            Ganti Password
          </button>
          <Toggle
            checked={user.status === 'active'}
            onChange={() => onToggle({
              id: user.id,
              name: user.name,
              value: user.status === 'active' ? 'inactive' : 'active',
            })}
            label={`Aktifkan/nonaktifkan ${user.name}`}
          />
        </div>
      </td>
    </tr>
  )
}
