import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {useDebounce} from '../../../hooks/useDebounce.js'
import { fetchSalesOrders } from '../api/salesOrdersApi.js'

export default function useSalesOrders(initialQuery = '', page = 1) {
    const [query, setQuery] = useState(initialQuery)
    const [invoice, setInvoice] = useState('')
    const [status, setStatus] = useState('')

    const debouncedQuery = useDebounce(query, 250)
    const filters = { q: debouncedQuery, status, invoice, page }

    const {
        data: salesOrders = {
            data: [],
            pagination: { page: 1, per_page: 10, total: 0 },
        },
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['salesOrders', filters],
        queryFn: () => fetchSalesOrders(filters),
    })

    return {
        salesOrders,
        loading: isLoading,
        error: isError ? error.message : null,
        query,
        setQuery,
        status,
        setStatus,
        invoice,
        setInvoice,
    }
}