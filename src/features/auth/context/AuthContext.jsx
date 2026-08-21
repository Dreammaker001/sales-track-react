/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { client } from '@/api/client.js'

/**
 * Sesi auth — MEMORY ONLY (bukan localStorage).
 * - Token hidup di cookie HttpOnly (dikirim otomatis tiap request) — frontend
 *   tidak menyimpan apa pun yang bisa diutak-atik user.
 * - user & role hanya state React: diisi dari response login, dan di-refresh
 *   lewat GET /auth/me saat aplikasi boot (cookie masih ada di browser).
 * - status: 'checking' (boot, cek /me) → 'ready' | 'guest'
 */
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({ user: null, role: null, status: 'checking' })

  // Boot: cek sesi via cookie → /auth/me
  useEffect(() => {
    let active = true

    client
      .get('/auth/me')
      .then((res) => {
        if (!active) return
        const d = res.data
        setAuth({
          user: d?.data ?? d,
          role: d?.data?.role ?? null,
          status: 'ready',
        })
      })
      .catch(() => {
        if (!active) return
        setAuth({ user: null, role: null, status: 'guest' })
      })

    return () => {
      active = false
    }
  }, [])

  /** Dipanggil saat login sukses — isi sesi dari response backend. */
  const setSession = useCallback((data) => {
    setAuth({
      user: data.user ?? data,
      role: data.role ?? data.user?.role ?? null,
      status: 'ready',
    })
  }, [])

  const logout = useCallback(async () => {
    try {
      await client.post('/auth/logout')
    } catch {
      // tetap logout di sisi client walau request gagal
    }
    setAuth({ user: null, role: null, status: 'guest' })
  }, [])

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
