import { getPTAccess } from '../api/userPtAccessApi.js'
import { useQuery } from '@tanstack/react-query'

export function usePTAccess() {
  return useQuery({
    queryKey: ['ptAccess'],
    queryFn: () => getPTAccess(),
  })
}
