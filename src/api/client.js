import axios from 'axios'

/**
 * Instance axios terpusat untuk semua panggilan backend.
 * - baseURL dari env (VITE_API_URL, default '/api' → proxy Vite di dev)
 * - Auth via COOKIE HttpOnly (di-set backend saat login) — frontend tidak
 *   mengirim header Authorization manual; cookie terkirim otomatis.
 * - interceptor response: lemparkan error yang sudah dinormalisasi
 */
export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
})


client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error || error.message || 'Terjadi kesalahan jaringan'
    return Promise.reject(new Error(message))
  },
)
