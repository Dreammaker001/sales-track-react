import axios from 'axios'

/**
 * Instance axios terpusat untuk semua panggilan backend.
 * - baseURL dari env (VITE_API_URL, default '/api' → proxy Vite di dev)
 * - Access token: disimpan di MEMORY (module variable) — tidak pernah di
 *   localStorage; dikirim via header Authorization: Bearer.
 * - Refresh token: di cookie HttpOnly (backend) — terkirim otomatis saat
 *   POST /auth/refresh (tanpa body).
 * - Saat 401 → refresh otomatis → update access token → retry request asli.
 * - Callback onAuthRefreshed / onSessionExpired didaftarkan AuthProvider.
 */

let accessToken = null

/** Di-set AuthProvider saat login/refresh sukses (dari response body). */
export function setAccessToken(token) {
  accessToken = token || null
}

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 15000,
})

client.onAuthRefreshed = null
client.onSessionExpired = null

// Sisipkan access token dari memory ke semua request (kecuali auth itu sendiri)
client.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

let refreshPromise = null

/**
 * Refresh sesi: cookie refresh (HttpOnly) terkirim otomatis — tanpa body.
 * Response = sama seperti login → simpan access_token baru → update context
 * → retry request asli. Single-flight: request 401 bersamaan hanya memicu
 * SATU refresh (promise bersama).
 */
async function refreshAndRetry(original) {
  const { data } = await axios.post(`${client.defaults.baseURL}/auth/refresh`, null, {
    timeout: 15000,
  })

  setAccessToken(data.access_token)
  client.onAuthRefreshed?.(data)
  return client(original)
}

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config
    const status = error.response?.status

    // 401 pada request biasa → coba refresh sekali.
    // Kecuali: /auth/login (401 = kredensial salah, bukan sesi kedaluwarsa)
    // dan /auth/refresh itu sendiri (anti-loop).
    if (
      status === 401 &&
      original &&
      !original._retry &&
      !original.url.includes('/auth/login') &&
      !original.url.includes('/auth/refresh')
    ) {
      original._retry = true
      try {
        if (!refreshPromise) {
          refreshPromise = refreshAndRetry(original).finally(() => {
            refreshPromise = null
          })
        }
        return await refreshPromise
      } catch (refreshError) {
        // Refresh gagal → sesi kedaluwarsa → lempar ke halaman login
        client.onSessionExpired?.()
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
        return Promise.reject(refreshError)
      }
    }

    const message = error.response?.data?.error || error.message || 'Terjadi kesalahan jaringan'
    return Promise.reject(new Error(message))
  },
)
