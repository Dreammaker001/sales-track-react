import { client } from '../../../api/client'

export async function getPTDatabaseConfigs({ q = '', status = '', page = 1 } = {}) {
  const res = await client.get('/admin/pt-database-configs', { params: { q, status, page } })
  return res.data
}

export async function getPTDatabaseConfigByID(id) {
  const res = await client.get(`/admin/pt-database-configs/${id}`)
  return res.data
}

export async function createPTDatabaseConfig(payload) {
  const res = await client.post('/admin/pt-database-configs', {
    pt_key: payload.ptKey,
    pt_name: payload.ptName,
    db_host: payload.dbHost,
    db_port: payload.dbPort,
    db_name: payload.dbName,
    db_user: payload.dbUser,
    db_password: payload.dbPassword,
    status: payload.status,
  })
  return res.data
}

export async function updatePTDatabaseConfig(id, payload) {
  const res = await client.put(`/admin/pt-database-configs/${id}`, {
    pt_key: payload.ptKey,
    pt_name: payload.ptName,
    db_host: payload.dbHost,
    db_port: payload.dbPort,
    db_name: payload.dbName,
    db_user: payload.dbUser,
    db_password: payload.dbPassword,
    status: payload.status,
  })
  return res.data
}

export async function deletePTDatabaseConfig(id) {
  const res = await client.delete(`/admin/pt-database-configs/${id}`)
  return res.data
}
