import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {useDebounce} from '../../../hooks/useDebounce.js'
import { fetchSalesOrders } from '../api/salesOrdersApi.js'

export default function useSalesOrders(initialQuery = '') {
    const [query, setQuery] = useState(initialQuery)
    const [invoice, setInvoice] = useState('')
    const [status, setStatus] = useState('')
    const [searchBy, setSearchBy] = useState('customer_code')

    const debouncedQuery = useDebounce(query, 250)
    const filters = { q: debouncedQuery, searchBy: searchBy, status, invoice }

    const {
        data: salesOrders = {
            data: [],
        },
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ['salesOrders', filters],
        queryFn: () => fetchSalesOrders(filters),
        enabled: false,
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
        searchBy,
        setSearchBy,
        refetch,
    }
}