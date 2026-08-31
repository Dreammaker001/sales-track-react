import { client } from '@/api/client'

export async function getPTAccess() {
  const res = await client.get('/user-pt-access/options')
  return res.data
}
