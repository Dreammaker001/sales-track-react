import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPTAccess } from '../api/salesOrdersApi.js'
import { useDebounce } from '../../../hooks/useDebounce.js'
import { fetchSalesOrders } from '../api/salesOrdersApi.js'
import { useSearchParams } from 'react-router'

export default function useSalesOrders() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [invoice, setInvoice] = useState('')
  const [status, setStatus] = useState('')
  const searchBy = searchParams.get('search_by') || 'customer_code'
  const pt = searchParams.get('pt') || ''
  const periodMonth = searchParams.get('period_month') || '1'

  const debouncedQuery = useDebounce(query, 250)
  const filters = { q: debouncedQuery, searchBy: searchBy, pt, status, invoice, periodMonth }

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
    gcTime: 0,
    staleTime: 0,
  })

  return {
    salesOrders,
    loading: isLoading,
    error: isError ? error.message : null,
    query,
    status,
    setStatus,
    invoice,
    setInvoice,
    searchBy,
    pt,
    periodMonth,
    refetch,
    setSearchParams,
  }
}

export function usePTAccess() {
  return useQuery({
    queryKey: ['ptAccess'],
    queryFn: () => getPTAccess(),
  })
}
