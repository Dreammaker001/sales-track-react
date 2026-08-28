import Button from "@/components/ui/Button";
import { Dialog, DialogHeader, DialogTitle, DialogDescription, DialogContent } from "@/components/ui/dialog";
import { LoaderCircle } from 'lucide-react'

export default function DeleteDialog({ onClose, onDelete, isLoading }) {
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-sm bg-white">
                <DialogHeader>
                    <DialogTitle>Delete Konfigurasi Database PT</DialogTitle>
                    <DialogDescription>
                        Apakah anda yakin ingin menghapus konfigurasi database PT ini? Tindakan ini tidak dapat dibatalkan.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex justify-end gap-2">
                    <Button variant="outline" className="" onClick={onClose}>
                        Batal
                    </Button>
                    <Button className="bg-red-500 text-white hover:bg-red-600" onClick={onDelete} disabled={isLoading}>
                        {
                            isLoading ? <>
                                <LoaderCircle className="h-4 w-4 animate-spin" />
                                Menghapus...
                            </> : 'Hapus'
                        }
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}