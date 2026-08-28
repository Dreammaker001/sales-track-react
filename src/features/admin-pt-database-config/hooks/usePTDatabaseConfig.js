import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getPTDatabaseConfigByID, createPTDatabaseConfig, updatePTDatabaseConfig, deletePTDatabaseConfig } from '../api/ptDatabaseConfigsApi.js'
import { toast } from "sonner"
import { useNavigate } from 'react-router'

export function usePTDatabaseConfig(id) {
    return useQuery({
        queryKey: ['pt-database-configs', 'detail', id],
        queryFn: () => getPTDatabaseConfigByID(id),
        enabled: Boolean(id),
    })
}

export function useCreatePTDatabaseConfig() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: (payload) => createPTDatabaseConfig(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pt-database-configs'] })
            toast.success('Konfigurasi database PT berhasil dibuat')
            navigate(-1)
        },
        onError: (error) => {
            toast.error(`Gagal membuat konfigurasi database PT: ${error.message}`)
        }
    })
}

export function useUpdatePTDatabaseConfig() {
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    return useMutation({
        mutationFn: ({ id, payload }) => updatePTDatabaseConfig(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pt-database-configs'] })
            toast.success('Perubahan konfigurasi database PT berhasil disimpan')
            navigate(-1)
        },
        onError: (error) => {
            toast.error(`Gagal menyimpan perubahan konfigurasi database PT: ${error.message}`)
        }
    })
}

export function useDeletePTDatabaseConfig() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (id) => deletePTDatabaseConfig(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pt-database-configs'] })
            toast.success('Konfigurasi database PT berhasil dihapus')
        },
        onError: (error) => {
            toast.error(`Gagal menghapus konfigurasi database PT: ${error.message}`)
        }
    })
}