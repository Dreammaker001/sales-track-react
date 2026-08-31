import { client } from '../../../api/client'

export async function login(payload) {
  const { data } = await client.post('/auth/login', payload)
  return data
}
