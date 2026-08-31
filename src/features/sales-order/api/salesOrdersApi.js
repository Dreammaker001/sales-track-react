import { client } from '../../../api/client'

export async function fetchSalesOrders({ q, searchBy, pt, status, invoice, periodMonth }) {
  const res = await client.get('/sales-orders', {
    params: { q, search_by: searchBy, pt, status, invoice, period_month: periodMonth },
  })
  return res.data
}

export async function getSalesOrderByID(id, pt) {
  const res = await client.get(`/sales-orders/${id}`, { params: { pt } })
  return res.data
}

export async function getPTAccess() {
  const res = await client.get('/user-pt-access/options')
  return res.data
}
