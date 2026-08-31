import { useNavigate } from 'react-router'
import dayjs from 'dayjs'
import Badge from '@/components/ui/Badge.jsx'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu.jsx'
import { EllipsisVertical } from 'lucide-react'

const STATUS_BADGE = { active: 'success', inactive: 'gray' }

/** Kartu konfigurasi database PT untuk daftar di mode mobile. */
export default function PTDatabaseConfigCard({ data, onDelete }) {
  const navigate = useNavigate()

  return (
    <div className="rounded-md border border-line bg-surface p-4 shadow-card">
      <div className="flex items-start justify-between gap-3">
        <div className="font-semibold text-ink">{data.pt_key}</div>
        <Badge variant={STATUS_BADGE[data.status] ?? 'gray'}>{data.status === 'active' ? 'Aktif' : 'Nonaktif'}</Badge>
      </div>

      <div className="mt-1 text-sm text-ink">{data.pt_name}</div>

      <div className="mt-3 grid grid-cols-2 gap-3 text-xs text-ink-2">
        <div>Dibuat: {data.created_at ? dayjs(data.created_at).format('DD/MM/YYYY HH:mm') : '-'}</div>
        <div>Diubah: {data.updated_at ? dayjs(data.updated_at).format('DD/MM/YYYY HH:mm') : '-'}</div>
      </div>

      <div className="mt-3 flex items-center justify-end">
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
              onClick={() => navigate(`/admin/pt-database-configs/${data.id}/edit`)}
            >
              Edit Pengguna
            </DropdownMenuItem>
            <DropdownMenuItem
              className="hover:bg-primary hover:text-white"
              onClick={() => onDelete(data.id)}
            >
              Hapus
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
