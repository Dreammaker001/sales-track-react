// src/pages/LoginPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Eye, EyeOff } from 'lucide-react'
import Button from '@/components/ui/Button.jsx'
import Input from '@/components/ui/Input.jsx'
import LoginSidePanel from '@/features/login/components/LoginSidePanel.jsx'

/**
 * Halaman Login — sesuai board "Login" desain Penpot:
 * card putih 420px di tengah kanan (y=140, h=520), input 380×44,
 * tombol Masuk 380×46, checkbox "Ingat saya", link "Lupa kata sandi?".
 */
export default function LoginPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: POST /api/v1/auth/login → storage.set('auth.token', token)
    navigate('/admin/users')
  }

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

          <form onSubmit={onSubmit} className="mt-12">
            {/* Username */}
            <label className="mb-1.5 block text-[13px] font-semibold text-ink">
              Username
            </label>
            <Input
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              placeholder="budi.santoso"
              className="h-11 w-full"
            />

            {/* Kata Sandi + ikon mata */}
            <label className="mt-6 mb-1.5 block text-[13px] font-semibold text-ink">
              Kata Sandi
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••••"
                className="h-11 pr-10 w-full"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-ink-3 hover:text-ink-2"
                aria-label={showPassword ? 'Sembunyikan sandi' : 'Tampilkan sandi'}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Ingat saya + Lupa kata sandi */}
            <div className="mt-6 flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 text-[13px] text-ink-2 select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="h-4 w-4 rounded-sm border-line accent-primary"
                />
                Ingat saya
              </label>
              <a href="#" className="text-[13px] font-medium text-primary hover:underline">
                Lupa kata sandi?
              </a>
            </div>

            {/* Tombol Masuk — 46px sesuai desain */}
            <Button type="submit" size="lg" className="mt-8 w-full">
              Masuk
            </Button>
          </form>

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