import { useMutation } from '@tanstack/react-query'
import { login } from '../api/loginApi'

export function useLogin({navigate}) {
    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (data) => {
            navigate('/admin/users')
        },
        // onError: (error) => {
        //     setErrorMessage("Login gagal. Silakan periksa username dan password Anda.")
        // },
    })

    return {
        onLogin: mutation,
    }
}