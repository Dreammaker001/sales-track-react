import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

export default function StatusDialog({ data, onSubmit, onCancel }) {
  return (
    <>
      <Dialog open={true} onOpenChange={onCancel}>
        <DialogContent className="sm:max-w-sm bg-white">
          <DialogHeader>
            <DialogTitle>Ubah Status</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin mengubah status "
              <span className="font-semibold">{data?.name}</span>" ini?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" className="mr-2 w-auto" onClick={onCancel}>
              Batal
            </Button>
            <Button
              className={`w-auto ${data?.value === 'active' ? 'bg-green-500' : 'bg-red-500'} text-white`}
              onClick={onSubmit}
            >
              {data?.value === 'active' ? 'Aktifkan' : 'Nonaktifkan'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
