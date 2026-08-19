import { z } from 'zod'

export const changePasswordUserSchema = z.object({
    password: z
        .string()
        .min(1, 'Password wajib diisi')
        .min(8, 'Minimal 8 karakter')
        .regex(/[A-Z]/, 'Harus ada huruf besar')
        .regex(/[a-z]/, 'Harus ada huruf kecil')
        .regex(/[0-9]/, 'Harus ada angka')
        .regex(/[^A-Za-z0-9]/, 'Harus ada karakter khusus'),
    confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
    forceChangePassword: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Password dan konfirmasi password harus sama',
    path: ['confirmPassword'],
})

