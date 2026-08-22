import { zodResolver } from '@hookform/resolvers/zod'
import { RefreshCw, LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import Button from '@/components/ui/Button.jsx'
import Card from '@/components/ui/Card.jsx'
import Input from '@/components/ui/Input.jsx'
import Toggle from '@/components/ui/Toggle.jsx'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form.jsx'
import {
  createUserDefaultValues,
  createUserSchema,
  updateUserSchema,
} from '@/features/admin/forms/userSchema.js'
import { generatePassword } from '@/utils/validators.js'

const ROLES = [
  { name: 'Admin', value: 'admin', desc: 'Akses penuh sistem' },
  { name: 'Sales', value: 'sales', desc: 'Kelola order & invoice' },
]

/**
 * Form user bersama untuk halaman Buat & Edit.
 * - mode="create": tampilkan password auto-generate, submit "+ Buat User"
 * - mode="edit":  tanpa password (lewat Ganti Password), username read-only
 */
export default function UserForm({
  mode = 'create',
  initialValues,
  onSubmit,
  isPending = false,
}) {
  const navigate = useNavigate()
  const isEdit = mode === 'edit'

  const form = useForm({
    resolver: zodResolver(isEdit ? updateUserSchema : createUserSchema),
    defaultValues: initialValues ?? createUserDefaultValues,
  })

  const title = isEdit ? 'Edit User' : 'Buat User Baru'
  const subtitle = isEdit
    ? 'Ubah data profil & hak akses pengguna'
    : 'Akun baru langsung aktif dan bisa login'
  const submitLabel = isEdit ? 'Simpan Perubahan' : '+ Buat User'
  const pendingLabel = isEdit ? 'Menyimpan...' : 'Membuat...'

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-[600px]">
        <Card className="p-6">
          <h2 className="text-xl font-bold">{title}</h2>
          <p className="mt-1 text-[13px] text-ink-2">{subtitle}</p>
          <div className="my-5 h-px bg-line" />

          <div className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="contoh: Budi Santoso" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="contoh: budi.santoso"
                      disabled={isEdit}
                      muted={isEdit}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {isEdit
                      ? 'Username tidak bisa diubah — identitas login tetap'
                      : 'Username unik untuk login — tidak bisa diubah'}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password — hanya saat membuat akun */}
            {!isEdit && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password (auto-generate)</FormLabel>
                    <div className="flex gap-2">
                      <FormControl>
                        <Input
                          readOnly
                          value={field.value}
                          placeholder="—"
                          className="bg-gray-soft"
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          form.setValue('password', generatePassword(), {
                            shouldValidate: true,
                          })
                        }
                      >
                        <RefreshCw className="h-4 w-4" />
                        Generate
                      </Button>
                    </div>
                    <div className="flex items-center gap-2 rounded-sm bg-info-soft px-3 py-2.5 text-xs font-semibold text-info">
                      Password dibuat otomatis — salin &amp; kirim ke user, tidak
                      bisa dilihat lagi
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Peran */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Peran</FormLabel>
                  <div className="grid grid-cols-2 gap-3" role="radiogroup">
                    {ROLES.map((r) => {
                      const selected = field.value === r.value
                      return (
                        <button
                          key={r.value}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => field.onChange(r.value)}
                          className={`flex items-start gap-3 rounded-[10px] border p-4 text-left transition-colors ${selected
                              ? 'border-primary'
                              : 'border-line hover:border-ink-3'
                            }`}
                        >
                          <span
                            className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border-2 ${selected ? 'border-primary' : 'border-line'
                              }`}
                          >
                            {selected && (
                              <span className="h-2 w-2 rounded-full bg-primary" />
                            )}
                          </span>
                          <span>
                            <span className="block text-[13px] font-semibold">
                              {r.name}
                            </span>
                            <span className="block text-[11px] text-ink-3">
                              {r.desc}
                            </span>
                          </span>
                        </button>
                      )
                    })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status akun */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status Akun</FormLabel>
                  <div className="flex items-center gap-3">
                    <Toggle
                      checked={field.value === 'active'}
                      onChange={(v) => field.onChange(v ? 'active' : 'inactive')}
                      label="Status akun"
                    />
                    <span className="text-[13px] text-ink-2">
                      {isEdit
                        ? 'Nonaktif = user tidak bisa login'
                        : 'Langsung aktif setelah dibuat'}
                    </span>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-2 border-t border-line pt-5">
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => navigate('/admin/users')}
            >
              Kembali
            </Button>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? <>
                <LoaderCircle className="h-4 w-4 animate-spin" />
                {pendingLabel}
              </> : submitLabel}
            </Button>
          </div>

          <p className="mt-4 text-center text-xs text-ink-3">
            {isEdit
              ? 'Perubahan langsung berlaku di sistem'
              : 'Setelah dibuat, user bisa langsung login dengan username &amp; password ini'}
          </p>
        </Card>
      </form>
    </Form>
  )
}
