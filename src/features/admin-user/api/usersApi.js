import { client } from '../../../api/client'

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

/** Ambil detail satu user berdasarkan username (untuk halaman edit). */
export async function fetchUserByID(id) {
  const { data } = await client.get(`/admin/users/${id}`)
  return data
}

/** Simpan perubahan data user (nama, username, peran, status). */
export async function updateUser(id, payload) {
  const { data } = await client.put(`/admin/users/${id}`, {
    name: payload.name,
    role: payload.role,
    status: payload.status,
  })
  return data
}

export async function changeUserPassword(id, payload) {
  const { data } = await client.patch(`/admin/users/${id}/password`, {
    password: payload.password,
    password_change_required: payload.forceChangePassword,
  })
  return data
}