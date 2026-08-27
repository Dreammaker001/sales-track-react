import { useNavigate } from 'react-router'
import dayjs from 'dayjs'
import Badge from '../../../components/ui/Badge.jsx'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu.jsx'
import { EllipsisVertical } from 'lucide-react'

const STATUS_BADGE = { active: 'success', inactive: 'gray' }

/** Satu baris pengguna di tabel. */
export default function PTDatabaseConfigRow({ data }) {
  const navigate = useNavigate()

  return (
    <tr className="transition-colors hover:bg-[#fafafd]">
      <td className="px-4 py-3 align-middle whitespace-nowrap text-ink text-xs">{data.pt_key}</td>
      <td className="px-4 py-3 align-middle whitespace-nowrap text-ink text-xs">{data.pt_name}</td>
      <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
        {data.created_at ? dayjs(data.created_at).format('DD/MM/YYYY HH:mm') : '-'}
      </td>
      <td className="px-4 py-3 align-middle whitespace-nowrap text-xs text-ink-2">
        {data.updated_at ? dayjs(data.updated_at).format('DD/MM/YYYY HH:mm') : '-'}
      </td>
      <td className="px-4 py-3 align-middle whitespace-nowrap">
        <Badge variant={STATUS_BADGE[data.status] ?? 'gray'}>{data.status === 'active' ? 'Aktif' : 'Nonaktif'}</Badge>
      </td>
      <td className="px-4 py-3 align-middle whitespace-nowrap">
        <div className="flex items-center gap-6">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="cursor-pointer text-ink-3 hover:text-ink-1 focus:outline-none focus:ring-0"
                aria-label="Aksi pt database config"
              >
                <EllipsisVertical />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={4} className="w-[180px] ring-0 bg-white border border-line shadow-md rounded-lg ">
              <DropdownMenuItem
                className="hover:bg-primary hover:text-white mb-1"
                onClick={() => navigate(`/admin/users/${user.id}/edit`)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="hover:bg-primary hover:text-white"
                onClick={() => {}}
              >
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </td>
    </tr>
  )
}
