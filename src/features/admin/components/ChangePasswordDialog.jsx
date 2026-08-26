import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordUserSchema } from "../forms/changePasswordUserSchema";
import { Form } from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import Input from "@/components/ui/Input.jsx";
import Button from "@/components/ui/Button.jsx";
import { toast } from "sonner"
import { changeUserPassword } from "../api/usersApi";
import React, { useCallback } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, LoaderCircle } from 'lucide-react'

export default function ChangePasswordDialog({
    userData,
    onClose = () => { },
}) {
    const [showPassword, setShowPassword] = React.useState(false)
    const [levelPassword, setLevelPassword] = React.useState(0)
    const queryClient = useQueryClient()

    const form = useForm({
        resolver: zodResolver(changePasswordUserSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
            forceChangePassword: false,
        },
    })

    const mutation = useMutation({
        mutationFn: ({ id, payload }) => changeUserPassword(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] })
            toast.success('Password user berhasil diubah')
            onClose()
        },
        onError: (error) => {
            toast.error(`Gagal mengubah password user: ${error.message}`)
        }
    })

    const checkPassword = useCallback((values) => {
        const lowerCaseRegex = /[a-z]/;
        const upperCaseRegex = /[A-Z]/;
        const numberRegex = /[0-9]/;
        const specialCharRegex = /[^A-Za-z0-9]/;

        const hasLowerCase = lowerCaseRegex.test(values.password);
        const hasUpperCase = upperCaseRegex.test(values.password);
        const hasNumber = numberRegex.test(values.password);
        const hasSpecialChar = specialCharRegex.test(values.password);

        let score = 0;
        if (hasLowerCase) score++;
        if (hasUpperCase) score++;
        if (hasNumber) score++;
        if (hasSpecialChar) score++;

        setLevelPassword(score)
    }, []);

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-sm md:max-w-md bg-white">
                <DialogHeader>
                    <DialogTitle>Ubah Password User</DialogTitle>
                    <DialogDescription>
                        Password baru langsung berlaku
                    </DialogDescription>
                </DialogHeader>
                <div className="bg-(--color-canvas) p-4 rounded-md mb-2">
                    <div className="text-ink-1 font-semibold">{userData?.name}</div>
                    <div className="text-ink-3">{userData?.role} · {userData?.username}</div>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit((values) => {
                        mutation.mutate({ id: userData.id, payload: values })
                    })} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password Baru</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                className="h-11 w-full"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Masukkan password baru" {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    checkPassword({ password: e.target.value });
                                                }} />
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
                                    <FormDescription>Password harus minimal 8 karakter</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Konfirmasi Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                className="h-11 w-full"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Konfirmasi password baru"
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
                        <div>
                            <div className="grid grid-cols-4 gap-2 mt-3">
                                {
                                    [1, 2, 3, 4].map((level) => (
                                        <div key={level} className={`h-2 w-full rounded ${levelPassword >= level ? 'bg-success' : 'bg-(--color-canvas)'}`}></div>
                                    ))
                                }
                                <div className="col-span-4 text-xs text-success mt-1">
                                    {levelPassword === 1 && 'Lemah · Tidak memenuhi syarat keamanan'}
                                    {levelPassword === 2 && 'Sedang · Tidak memenuhi syarat keamanan'}
                                    {levelPassword === 3 && 'Kuat · Memenuhi syarat keamanan'}
                                    {levelPassword === 4 && 'Sangat Kuat · Memenuhi syarat keamanan'}
                                </div>
                            </div>
                        </div>
                        <div>
                            <FormField
                                control={form.control}
                                name="forceChangePassword"
                                render={({ field }) => (
                                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={(checked) => {
                                                    field.onChange(checked);
                                                }}
                                            />
                                        </FormControl>
                                        <div className="space-y-1 leading-none">
                                            <FormLabel>Paksa user untuk mengubah password</FormLabel>
                                            <FormDescription>
                                                User akan diminta untuk mengubah password saat login berikutnya
                                            </FormDescription>
                                        </div>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-2 mt-10">
                            <Button type="button" variant="outline" onClick={onClose}>
                                Batal
                            </Button>
                            <Button type="submit" disabled={mutation.isPending}>
                                {mutation.isPending ? <>
                                    <LoaderCircle className="h-4 w-4 animate-spin" />
                                    Memproses...
                                </> : 'Simpan'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}