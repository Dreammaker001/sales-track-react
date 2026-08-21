
const mockData = [
        {
            id: 1,
            so_number: 'INV-001',
            customer_name: 'PT Maju Jaya',
            so_date: '15/01/2024',
            percent_invoice: 50,
            status: 'PENDING-INVOICE'

        },
        {
            id: 2,
            so_number: 'INV-002',
            customer_name: 'CV Sejahtera',
            so_date: '14/01/2024',
            percent_invoice: 75,
            status: 'COMPLETED'
        },
        {
            id: 3,
            so_number: 'INV-003',
            customer_name: 'PT Berkah Usaha',
            so_date: '13/01/2024',
            percent_invoice: 0,
            status: 'PENDING-INVOICE'
        },
        {
            id: 4,
            so_number: 'INV-004',
            customer_name: 'PT Berkah Usaha',
            so_date: '13/01/2024',
            percent_invoice: 100,
            status: 'COMPLETED'
        },
    ]

const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchSalesOrders() {
    
    // const res = await client.get('/sales-orders', { params: { q, status, invoice, page } })
    // return res.data

    await delay(500) // Simulate network delay
    const data = {
        data: mockData,
        pagination: {
            page: 1,
            per_page: 10,
            total: mockData.length
        }
    }

    return data
}