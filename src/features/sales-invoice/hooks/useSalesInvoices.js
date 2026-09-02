import { useSearchParams } from 'react-router'
import { useDebounce } from '../../../hooks/useDebounce'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchSalesInvoices } from '../api/salesInvoicesApi'

export default function useSalesInvoices() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const searchBy = searchParams.get('search_by') || 'customer_code'
  const pt = searchParams.get('pt') || ''
  const periodMonth = searchParams.get('period_month') || '1'
  const [status, setStatus] = useState()

  const debouncedQuery = useDebounce(query, 250)
  const filters = { q: debouncedQuery, searchBy: searchBy, pt, periodMonth }

  const {
    data: salesInvoices = {
      data: [],
    },
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ['salesInvoices', filters],
    queryFn: () => fetchSalesInvoices(filters),
    enabled: false,
    gcTime: 0,
    staleTime: 0,
  })

  return {
    salesInvoices,
    loading: isLoading,
    error: isError ? error.message : null,
    query,
    searchBy,
    pt,
    periodMonth,
    status,
    setStatus,
    refetch,
    setSearchParams,
  }
}
