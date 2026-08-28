import CreateEditForm from '@/features/admin-pt-database-config/components/CreateEditForm.jsx'
import { useCreatePTDatabaseConfig } from '@/features/admin-pt-database-config/hooks/usePTDatabaseConfig.js'
export default function AdminCreatePTDatabaseConfigPage() {
    const mutation = useCreatePTDatabaseConfig()

    return(
        <div className="flex justify-center">
            <CreateEditForm
                mode="create"
                isPending={mutation.isPending}
                onSubmit={(values) => mutation.mutate(values)}
            />
        </div>
    )
}