import Button from '@/components/ui/Button'
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from '@/components/ui/dialog'
import { LoaderCircle } from 'lucide-react'

export default function DeleteDialog({ data, onClose, onDelete, isLoading }) {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm bg-white">
        <DialogHeader>
          <DialogTitle>Hapus Konfigurasi Database PT</DialogTitle>
          <DialogDescription>
            Apakah anda yakin ingin menghapus konfigurasi database '
            <span className="font-bold">{data?.pt_name}</span>' ini? Tindakan ini tidak dapat
            dibatalkan.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" className="w-full sm:w-auto" onClick={onClose}>
            Batal
          </Button>
          <Button
            className="w-full bg-red-500 text-white hover:bg-red-600 sm:w-auto"
            onClick={onDelete}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                Menghapus...
              </>
            ) : (
              'Hapus'
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
