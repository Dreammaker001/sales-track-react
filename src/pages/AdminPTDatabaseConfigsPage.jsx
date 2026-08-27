import FilterBar from '@/features/admin-pt-database-config/components/FilterBar.jsx'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import PTDatabaseConfigsTable from '@/features/admin-pt-database-config/components/PTDatabaseConfigsTable.jsx'
import usePTDatabaseConfigs from '@/features/admin-pt-database-config/hooks/usePTDatabaseConfigs.js'
import { useNavigate } from 'react-router'

export default function AdminPTDatabaseConfigsPage() {
    const navigate = useNavigate()

    const {
        datas,
        loading,
        error,
        query,
        setQuery,
        status,
        setStatus,
        setPage,
    } = usePTDatabaseConfigs()

    return (
        <>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-lg font-bold">Daftar Konfigurasi Database PT</h2>
                    <p className="mt-0.5 text-xs text-ink-3">Kelola konfigurasi database PT</p>
                </div>
                <Button
                    className="cursor-pointer"
                    onClick={() => navigate('/admin/pt-database-configs/create')}
                >+ Tambah Konfigurasi</Button>
            </div>

            <FilterBar
                query={query}
                onQuery={setQuery}
                status={status}
                onStatus={setStatus}
            />

            <Card>
                <PTDatabaseConfigsTable
                    datas={datas}
                    loading={loading}
                    error={error}
                    setPage={setPage} />
            </Card>
        </>
    )
}