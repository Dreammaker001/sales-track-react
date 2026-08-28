import { useParams } from 'react-router'
import Button from '@/components/ui/Button.jsx'
import Card from '@/components/ui/Card.jsx'
import { useUpdatePTDatabaseConfig, usePTDatabaseConfig } from '@/features/admin-pt-database-config/hooks/usePTDatabaseConfig.js'
import CreateEditForm from '@/features/admin-pt-database-config/components/CreateEditForm.jsx'

export default function AdminEditPTDatabaseConfigPage() {
    const { id } = useParams()

    const { data, isLoading, isError, error } = usePTDatabaseConfig(id)
    const mutation = useUpdatePTDatabaseConfig()

    if (isLoading) {
        return (
            <Card className="p-6 text-sm text-ink-2">
                Memuat konfigurasi database PT...
            </Card>
        )
    }

    if (isError || !data) {
        return (
            <Card className="p-6">
                <p className="text-sm font-semibold text-danger">
                    Gagal memuat konfigurasi database PT
                </p>
                <p className="mt-1 text-[13px] text-ink-2">{error?.message}</p>
                <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => navigate('/admin/pt-database-configs')}
                >
                    Kembali ke daftar
                </Button>
            </Card>
        )
    }

    return (
        <div className="flex justify-center">
            <CreateEditForm
                mode="edit"
                initialValues={{
                    ptKey: data?.data?.pt_key,
                    ptName: data?.data?.pt_name,
                    dbHost: data?.data?.db_host,
                    dbPort: data?.data?.db_port,
                    dbName: data?.data?.db_name,
                    dbUser: data?.data?.db_user,
                    status: data?.data?.status,
                }}
                onSubmit={(values) => {
                    mutation.mutate({ id: data?.data?.id, payload: values })
                }}
                isPending={mutation.isPending}
            />
        </div>
    )
}