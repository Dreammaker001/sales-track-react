// src/pages/LoginPage.jsx
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AlertCircle, Eye, EyeOff, LoaderCircle } from 'lucide-react'
import Button from '@/components/ui/Button.jsx'
import Input from '@/components/ui/Input.jsx'
import LoginSidePanel from '@/features/login/components/LoginSidePanel.jsx'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useLogin } from '@/features/login/hooks/useLogin.js'
import { loginSchema } from '@/features/login/forms/loginSchema.js'
import { useAuth } from '@/features/auth/context/AuthContext.jsx'
import { useNavigate } from 'react-router'

/** Petakan pesan teknis dari interceptor → pesan ramah untuk user. */
function formatLoginError(error) {
  const msg = (error?.message || '').toLowerCase()
  if (/username|password|credential|kata sandi|invalid/i.test(msg)) {
    return 'Username atau kata sandi salah'
  }
  if (/jaringan|network|timeout|connect/i.test(msg)) {
    return 'Tidak dapat terhubung ke server. Periksa koneksi Anda.'
  }
  return msg || 'Terjadi kesalahan. Silakan coba lagi.'
}

/**
 * Halaman Login — sesuai board "Login" desain Penpot:
 * card putih 420px di tengah kanan, input 380×44, tombol Masuk 380×46,
 * checkbox "Ingat saya", link "Lupa kata sandi?".
 */
export default function LoginPage() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const { isAuthenticated } = useAuth()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  })

  const onLogin = useLogin()
  const errorMessage = onLogin.isError ? formatLoginError(onLogin.error) : null

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/sales-orders', { replace: true })
    }
  }, [isAuthenticated, navigate])

  return (
    <div className="flex min-h-screen bg-canvas">
      <LoginSidePanel />

      {/* Panel kanan — card form */}
      <main className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-[420px] rounded-xl bg-surface p-5 shadow-sm">
          <h2 className="text-2xl font-bold text-ink">Selamat Datang</h2>
          <p className="mt-1 text-sm text-ink-2">
            Masuk untuk melanjutkan ke dashboard
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => onLogin.mutate(data))} className="mt-12">
              {errorMessage && (
            <div
              role="alert"
              className="mb-2 flex items-start gap-2 rounded-sm bg-danger-soft px-3 py-2.5 text-[13px] font-medium text-danger"
            >
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}
              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="budi.santoso" className="h-11 w-full" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Kata Sandi + ikon mata */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mt-6">
                    <FormLabel>Kata Sandi</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••••"
                          className="h-11 w-full pr-10"
                          {...field}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((v) => !v)}
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-3 hover:text-ink-2"
                          aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Tombol Masuk — 46px sesuai desain */}
              <Button
                type="submit"
                size="lg"
                className="mt-8 w-full"
                disabled={onLogin.isPending}
              >
                {onLogin.isPending ? (
                  <>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  'Masuk'
                )}
              </Button>
            </form>
          </Form>

          {/* Footer card */}
          <p className="mt-8 text-center text-[13px] text-ink-2">
            Belum punya akun? Hubungi administrator
          </p>
          <p className="mt-2 text-center text-xs text-ink-3">
            Akses terbatas untuk tim sales
          </p>
        </div>
      </main>
    </div>
  )
}
