import { client } from '../../../api/client'

export async function fetchSalesOrders({q, searchBy, status, invoice}) {
    const res = await client.get('/sales-orders', { params: { q, search_by:searchBy, status, invoice } })
    return res.data
}

export async function getSalesOrderByID(id) {
    const res = await client.get(`/sales-orders/${id}`)
    return res.data
}