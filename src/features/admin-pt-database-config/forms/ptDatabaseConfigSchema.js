import { z } from 'zod'

export const createPTDatabaseConfigSchema = z.object({
    ptKey: z.string().min(1, 'PT Key wajib diisi').max(10),
    ptName: z.string().min(1, 'PT Name wajib diisi').max(100),
    dbHost: z.string().min(1, 'DB Host wajib diisi').max(100),
    dbPort: z.string().min(1, 'DB Port wajib diisi').max(5).regex(/^\d+$/, 'DB Port harus berupa angka'),
    dbName: z.string().min(1, 'DB Name wajib diisi').max(100),
    dbUser: z.string().min(1, 'DB User wajib diisi').max(50),
    dbPassword: z.string().min(1, 'DB Password wajib diisi').max(50),
    status: z.enum(['active', 'inactive'], { message: 'Pilih status' }),
})

export const createPTDatabaseConfigDefaultValues = {
    ptKey: '',
    ptName: '',
    dbHost: '',
    dbPort: '',
    dbName: '',
    dbUser: '',
    dbPassword: '',
    status: 'active',
}