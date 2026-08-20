import axios from 'axios'
import { storage } from '../services/storage'

/**
 * Instance axios terpusat untuk semua panggilan backend.
 * - baseURL dari env (VITE_API_URL, default '/api' → proxy Vite di dev)
 * - interceptor request: sisipkan Bearer token dari storage
 * - interceptor response: lemparkan error yang sudah dinormalisasi
 */
export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
})

client.interceptors.request.use((config) => {
  const token = storage.get('auth.token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error || error.message || 'Terjadi kesalahan jaringan'
    return Promise.reject(new Error(message))
  },
)
