import { useQuery } from '@tanstack/react-query'
import { getSalesOrderByID } from '../api/salesOrdersApi'

export default function useSalesOrderDetail(id, pt) {
  const {
    data: salesOrder = {
      data: [],
    },
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ['salesOrders', 'detail', id],
    queryFn: () => getSalesOrderByID(id, pt),
    enabled: Boolean(id),
  })

  return {
    salesOrder,
    loading: isFetching,
    error: isError ? error.message : null,
  }
}
