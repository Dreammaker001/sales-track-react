import { useSearchParams } from 'react-router'
import { useDebounce } from '@/hooks/useDebounce.js'
import { useQuery } from '@tanstack/react-query'
import { getPTDatabaseConfigs } from '../api/ptDatabaseConfigsApi.js'

export default function usePTDatabaseConfigs(initialQuery = '', page = 1) {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('q') ?? initialQuery;
    const status = searchParams.get('status') ?? '';
    const currentPage = parseInt(searchParams.get('page') ?? page, 10);

    const debouncedQuery = useDebounce(query, 250);
    const filters = { q: debouncedQuery, status, page: currentPage };

    const {
        data: configs = {
            data: [],
            pagination: { page: 1, per_page: 10, total: 0 },
        },
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['pt-database-configs', filters],
        queryFn: () => getPTDatabaseConfigs(filters),
    });

    return {
        datas: configs,
        loading: isLoading,
        error: isError ? error.message : null,
        query,
        setQuery: (value) => {
            setSearchParams((prev) => {
                prev.set('q', value);
                prev.set('page', 1); // Reset to first page on new query
                return prev;
            });
        },
        status,
        setStatus: (value) => {
            setSearchParams((prev) => {
                prev.set('status', value);
                prev.set('page', 1); // Reset to first page on new filter
                return prev;
            });
        },
        setPage: (value) => {
            setSearchParams((prev) => {
                prev.set('page', value);
                return prev;
            });
        },
    };
}