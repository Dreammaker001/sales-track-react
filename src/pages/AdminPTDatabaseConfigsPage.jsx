import FilterBar from '@/features/admin-pt-database-config/components/FilterBar.jsx'
import Button from '../components/ui/Button.jsx'
import Card from '../components/ui/Card.jsx'
import PTDatabaseConfigsTable from '@/features/admin-pt-database-config/components/PTDatabaseConfigsTable.jsx'
import usePTDatabaseConfigs from '@/features/admin-pt-database-config/hooks/usePTDatabaseConfigs.js'
import { useNavigate } from 'react-router'
import DeleteDialog from '@/features/admin-pt-database-config/components/DeleteDialog.jsx'
import { useState } from 'react'
import { useDeletePTDatabaseConfig } from '@/features/admin-pt-database-config/hooks/usePTDatabaseConfig.js'

export default function AdminPTDatabaseConfigsPage() {
    const navigate = useNavigate()
    const [deleteId, setDeleteId] = useState(null)

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

    const deleteMutation = useDeletePTDatabaseConfig()

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
                    setPage={setPage}
                    onDelete={(id) => setDeleteId(id)}
                    />
            </Card>

            {deleteId !== null && (
                <DeleteDialog
                    onClose={() => setDeleteId(null)}
                    onDelete={() => {
                        deleteMutation.mutate(deleteId, {
                            onSuccess: () => setDeleteId(null)
                        })
                    }}
                    isLoading={deleteMutation.isPending}
                />
            )}
        </>
    )
}