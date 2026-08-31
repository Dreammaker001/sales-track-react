import { client } from '../../../api/client'

export async function fetchSalesInvoices({ q, searchBy, pt, status, invoice, periodMonth }) {
  const res = await client.get('/sales-invoices', {
    params: { q, search_by: searchBy, pt, status, invoice, period_month: periodMonth },
  })
  return res.data
}
