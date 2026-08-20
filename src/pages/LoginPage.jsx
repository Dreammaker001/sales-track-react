// src/pages/LoginPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useLogin } from '@/features/login/hooks/useLogin.js'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Loader } from 'lucide-react'
import Button from '@/components/ui/Button.jsx'
import Input from '@/components/ui/Input.jsx'
import LoginSidePanel from '@/features/login/components/LoginSidePanel.jsx'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { loginSchema } from '@/features/login/forms/loginSchema.js'

/**
 * Halaman Login — sesuai board "Login" desain Penpot:
 * card putih 420px di tengah kanan (y=140, h=520), input 380×44,
 * tombol Masuk 380×46, checkbox "Ingat saya", link "Lupa kata sandi?".
 */
export default function LoginPage() {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: '',
        },
    })

    const {
        onLogin,
    } = useLogin({ navigate })

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
                        <form onSubmit={form.handleSubmit(onLogin.mutate)} className="mt-8">
                            {onLogin.isError && (
                                <p className="mb-2 text-sm text-red-600">Login gagal. Silakan periksa username dan password Anda.</p>
                            )}
                            {/* Username */}
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="contoh: budi.santoso"
                                                className="h-11 w-full"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

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
                                                    className="h-11 w-full"
                                                    {...field}
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

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {/* Kata Sandi + ikon mata */}
                            {/* <label className="mt-6 mb-1.5 block text-[13px] font-semibold text-ink">
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
                            </div> */}

                            {/* Ingat saya + Lupa kata sandi */}
                            {/* <div className="mt-6 flex items-center justify-between">
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
                            </div> */}

                            {/* Tombol Masuk — 46px sesuai desain */}
                            <Button type="submit" size="lg" className={`mt-8 w-full ${onLogin.isPending ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={onLogin.isPending}>
                                {onLogin.isPending ? <Loader className="animate-spin h-5 w-5 mr-2" /> : 'Masuk'}
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