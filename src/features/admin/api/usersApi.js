import { client } from '../../../api/client'

/**
 * API domain user admin.
 * Default memakai data mock lokal (VITE_USE_MOCK=true);
 * set false untuk memanggil backend sungguhan via client axios.
 */

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'

const MOCK_USERS = [
  {
    id: 'u1',
    username: 'budi.santoso',
    name: 'Budi Santoso',
    email: 'budi@perusahaan.com',
    role: 'Sales',
    status: 'Aktif',
    lastLogin: '12 Agu 2026, 09:41',
  },
  {
    id: 'u2',
    username: 'andi.wijaya',
    name: 'Andi Wijaya',
    email: 'andi@perusahaan.com',
    role: 'Admin',
    status: 'Aktif',
    lastLogin: '12 Agu 2026, 08:15',
  },
  {
    id: 'u3',
    username: 'siti.rahayu',
    name: 'Siti Rahayu',
    email: 'siti@perusahaan.com',
    role: 'Sales',
    status: 'Aktif',
    lastLogin: '11 Agu 2026, 16:30',
  },
  {
    id: 'u4',
    username: 'dimas.prakoso',
    name: 'Dimas Prakoso',
    email: 'dimas@perusahaan.com',
    role: 'Sales',
    status: 'Nonaktif',
    lastLogin: '02 Agu 2026',
  },
  {
    id: 'u5',
    username: 'rina.kusuma',
    name: 'Rina Kusuma',
    email: 'rina@perusahaan.com',
    role: 'Sales',
    status: 'Aktif',
    lastLogin: '10 Agu 2026, 13:22',
  },
]

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

/** Ambil daftar user dengan filter (query, peran, status). */
export async function fetchUsers({ query = '', role = 'Semua', status = 'Semua' } = {}) {
  if (USE_MOCK) {
    await delay()
    const q = query.trim().toLowerCase()
    return MOCK_USERS.filter((u) => {
      const matchQuery =
        !q || [u.username, u.name, u.email].some((v) => v.toLowerCase().includes(q))
      const matchRole = role === 'Semua' || u.role === role
      const matchStatus = status === 'Semua' || u.status === status
      return matchQuery && matchRole && matchStatus
    })
  }

  const { data } = await client.get('/admin/users', { params: { query, role, status } })
  return data
}

/** Toggle aktif/nonaktif user (user nonaktif tidak bisa login). */
export async function toggleUserStatus(id) {
  if (USE_MOCK) {
    await delay(200)
    const user = MOCK_USERS.find((u) => u.id === id)
    if (!user) throw new Error('User tidak ditemukan')
    user.status = user.status === 'Aktif' ? 'Nonaktif' : 'Aktif'
    return { ...user }
  }

  const { data } = await client.patch(`/admin/users/${id}/status`)
  return data
}

/** Buat user baru (username + password auto-generate + peran + status). */
export async function createUser(payload) {
  if (USE_MOCK) {
    await delay(400)
    const user = {
      id: `u${Date.now()}`,
      username: payload.username,
      name: payload.username,
      email: `${payload.username}@perusahaan.com`,
      role: payload.role,
      status: payload.status,
      lastLogin: '—',
    }
    MOCK_USERS.unshift(user)
    return { ...user }
  }

  const { data } = await client.post('/admin/users', payload)
  return data
}
