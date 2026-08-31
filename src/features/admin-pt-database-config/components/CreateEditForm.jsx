import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Input from '@/components/ui/Input.jsx'
import Card from '@/components/ui/Card.jsx'
import { useNavigate } from 'react-router'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.jsx'
import {
  createPTDatabaseConfigDefaultValues,
  createPTDatabaseConfigSchema,
  editPTDatabaseConfigSchema,
} from '@/features/admin-pt-database-config/forms/ptDatabaseConfigSchema.js'
import Button from '@/components/ui/Button.jsx'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from '@/components/ui/select'
import { LoaderCircle } from 'lucide-react'

const STATUS_OPTIONS = [
  { value: 'active', label: 'Aktif' },
  { value: 'inactive', label: 'Tidak Aktif' },
]

export default function CreateEditForm({
  mode = 'create',
  initialValues,
  onSubmit,
  isPending = false,
}) {
  const navigate = useNavigate()
  const isEdit = mode === 'edit'

  const form = useForm({
    resolver: zodResolver(isEdit ? editPTDatabaseConfigSchema : createPTDatabaseConfigSchema),
    defaultValues: initialValues ?? createPTDatabaseConfigDefaultValues,
  })

  const title = isEdit ? 'Edit Konfigurasi Database PT' : 'Tambah Konfigurasi Database PT Baru'
  const subtitle = isEdit
    ? 'Ubah data konfigurasi database PT'
    : 'Tambah data konfigurasi database PT baru'
  const submitLabel = isEdit ? 'Simpan Perubahan' : '+ Simpan Konfigurasi'
  const pendingLabel = isEdit ? 'Menyimpan...' : 'Membuat...'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full md:max-w-[600px]">
        <Card className="p-4 sm:p-6">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="mt-1 text-[13px] text-ink-2">{subtitle}</p>
          <div className="my-5 h-px bg-line" />

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* PT Key */}
              <FormField
                control={form.control}
                name="ptKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kode PT</FormLabel>
                    <FormControl>
                      <Input placeholder="contoh: PT001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* PT Name */}
              <FormField
                control={form.control}
                name="ptName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama PT</FormLabel>
                    <FormControl>
                      <Input placeholder="contoh: PT. Toba Group" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Database Host */}
              <FormField
                control={form.control}
                name="dbHost"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Host Database</FormLabel>
                    <FormControl>
                      <Input placeholder="contoh: localhost" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Database Port */}
              <FormField
                control={form.control}
                name="dbPort"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Port Database</FormLabel>
                    <FormControl>
                      <Input placeholder="contoh: 3306" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Database Username */}
              <FormField
                control={form.control}
                name="dbUser"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username Database</FormLabel>
                    <FormControl>
                      <Input placeholder="contoh: root" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Database Password */}
              <FormField
                control={form.control}
                name="dbPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password Database</FormLabel>
                    <FormControl>
                      <Input placeholder="contoh: password123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Database Name */}
              <FormField
                control={form.control}
                name="dbName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Database</FormLabel>
                    <FormControl>
                      <Input placeholder="contoh: toba_db" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Status */}
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        items={STATUS_OPTIONS}
                        value={field.value}
                        onValueChange={field.onChange}
                        aria-label="Pilih status"
                      >
                        <SelectTrigger className="w-full rounded border border-gray-300 p-2">
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                        <SelectContent position="popper" className="bg-surface border-line">
                          <SelectGroup>
                            <SelectLabel className="text-xs font-semibold text-ink-3">
                              Status
                            </SelectLabel>
                            {STATUS_OPTIONS.map((item) => (
                              <SelectItem
                                key={item.value}
                                value={item.value}
                                className="text-ink-2"
                              >
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="mt-8 flex flex-col-reverse gap-2 border-t border-line pt-5 sm:grid sm:grid-cols-2 sm:gap-2">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate('/admin/pt-database-configs')}
            >
              Kembali
            </Button>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  <LoaderCircle className="h-4 w-4 animate-spin" />
                  {pendingLabel}
                </>
              ) : (
                submitLabel
              )}
            </Button>
          </div>
        </Card>
      </form>
    </Form>
  )
}
