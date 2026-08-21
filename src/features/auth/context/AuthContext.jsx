/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { client, setAccessToken } from '@/api/client.js'

/**
 * Sesi auth — access token di MEMORY, refresh token di cookie HttpOnly.
 * - Access token: module variable di client.js (bukan localStorage) — dikirim
 *   via header Authorization; hilang saat halaman di-reload (wajar).
 * - Refresh token: cookie HttpOnly (backend) — dipakai boot & saat 401.
 * - user & role: state React, dari response login/refresh (backend mengirim
 *   response yang sama seperti login).
 * - status: 'checking' (boot, refresh via cookie) → 'ready' | 'guest'
 */
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ user: null, role: null, status: 'checking' })

  /** Dipanggil saat login/refresh sukses — simpan access di memory + isi sesi. */
  const setSession = useCallback((data) => {
    const payload = data.data ?? data
    if (payload.access_token) {
      setAccessToken(payload.access_token)
    }
    setAuth({
      user: payload.user ?? payload,
      role: payload.role ?? payload.user?.role ?? null,
      status: 'ready',
    })
  }, [])

  const logout = useCallback(async () => {
    try {
      await client.post('/auth/logout')
    } catch {
      // tetap logout di sisi client walau request gagal
    }
    setAccessToken(null)
    setAuth({ user: null, role: null, status: 'guest' })
  }, [])

  // Sinkronisasi dengan interceptor axios (refresh flow di client.js):
  // - onAuthRefreshed: refresh sukses → access token baru + update role/user
  // - onSessionExpired: refresh gagal → bersihkan access + kosongkan sesi
  useEffect(() => {
    client.onAuthRefreshed = setSession
    client.onSessionExpired = () => {
      setAccessToken(null)
      setAuth({ user: null, role: null, status: 'guest' })
    }

    return () => {
      client.onAuthRefreshed = null
      client.onSessionExpired = null
    }
  }, [setSession])

  // Boot: access token hilang saat reload → POST /auth/refresh (cookie refresh
  // terkirim otomatis) → dapat access_token + user/role sekaligus.
  useEffect(() => {
    let active = true

    client
      .post('/auth/refresh')
      .then((res) => {
        if (!active) return
        setSession(res.data)
      })
      .catch(() => {
        if (!active) return
        // Jangan timpa sesi yang baru saja login (race: boot refresh selesai
        // setelah login sukses)
        setAuth((prev) =>
          prev.status === 'ready'
            ? prev
            : { user: null, role: null, status: 'guest' },
        )
      })

    return () => {
      active = false
    }
  }, [setSession])

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        isAuthenticated: auth.status === 'ready',
        setSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth harus dipakai di dalam <AuthProvider>')
  return ctx
}
