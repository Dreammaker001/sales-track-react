import { z } from 'zod'

/** Skema validasi form Buat User — aturan mengikuti checklist desain Penpot. */
export const createUserSchema = z.object({
  name: z.string().min(1, 'Nama wajib diisi').min(4, 'Minimal 4 karakter'),
  username: z
    .string()
    .min(1, 'Username wajib diisi')
    .min(4, 'Minimal 4 karakter')
    .regex(/^[a-z0-9._-]+$/, 'Huruf kecil, angka, titik, strip, underscore'),
  password: z
    .string()
    .min(1, 'Password wajib diisi')
    .min(8, 'Minimal 8 karakter')
    .regex(/[A-Z]/, 'Harus ada huruf besar')
    .regex(/[a-z]/, 'Harus ada huruf kecil')
    .regex(/[0-9]/, 'Harus ada angka')
    .regex(/[^A-Za-z0-9]/, 'Harus ada karakter khusus'),
  role: z.enum(['admin', 'sales'], { message: 'Pilih peran' }),
  status: z.enum(['active', 'inactive']),
})

export const createUserDefaultValues = {
  name: '',
  username: '',
  password: '',
  role: 'sales',
  status: 'active',
}
