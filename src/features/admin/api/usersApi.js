import { client } from '../../../api/client'

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

/** Ambil daftar user dengan filter (query, peran, status). */
export async function fetchUsers({ q = '', role = '', status = '', page = 1 } = {}) {
  const res = await client.get('/admin/users', { params: { q, role, status, page } })
  return res.data
}

/** Toggle aktif/nonaktif user (user nonaktif tidak bisa login). */
export async function toggleUserStatus(id, value) {
  const { data } = await client.patch(`/admin/users/${id}/status`, { status: value })
  return data
}

/** Buat user baru (username + password auto-generate + peran + status). */
export async function createUser(payload) {
  const { data } = await client.post('/admin/users', payload)
  return data
}
