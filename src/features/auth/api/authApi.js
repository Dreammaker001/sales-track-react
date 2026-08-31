import { client } from '../../../api/client'

export async function changePassword(payload) {
  const { data } = await client.patch(`/auth/change-password`, {
    old_password: payload.oldPassword,
    new_password: payload.password,
  })
  return data
}
