import React from "react";
import { CheckIcon, Lock, LoaderCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordUserSchema } from "../forms/firstChangePasswordSchema";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../components/ui/dialog";
import { Form } from "../../../components/ui/form";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "../../../components/ui/form";
import Input from "../../../components/ui/Input.jsx";
import Button from "../../../components/ui/Button.jsx";
import useAuth from "../hooks/useAuth.js";

export default function FirstChangePasswordDialog() {
    const [levelPassword, setLevelPassword] = React.useState(0)
    const [strongPassword, setStrongPassword] = React.useState({
        hasLowerCase: false,
        hasUpperCase: false,
        hasNumber: false,
        hasSpecialChar: false,
    })

    const form = useForm({
        resolver: zodResolver(changePasswordUserSchema),
        defaultValues: {
            oldPassword: '',
            password: '',
            confirmPassword: '',
        },
    })

    const mutation = useAuth();

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
        setStrongPassword({
            hasLowerCase,
            hasUpperCase,
            hasNumber,
            hasSpecialChar,
        });
    }, []);

    return (
        <Dialog open={true} onOpenChange={() => { }}>
            <DialogContent className="md:max-w-md bg-white" showCloseButton={false}>
                <DialogHeader>
                    <div className="gap-2 flex">
                        <div className="bg-canvas p-3 rounded-md">
                            <Lock className="w-6 h-6" />
                        </div>
                    </div>
                    <DialogTitle className="text-xl text-ink">Ubah Kata Sandi</DialogTitle>
                    <DialogDescription className="text-ink-2">
                        Ini login pertamamu — demi keamanan akun,
                    </DialogDescription>
                    <DialogDescription className="text-ink-2">
                        kamu wajib mengganti kata sandi baru.
                    </DialogDescription>
                </DialogHeader>
                <div className="overflow-y-auto max-h-[calc(100vh-10rem)] no-scrollbar">
                    <div className="bg-warning-soft p-4 rounded-md mt-2 flex gap-2 items-center mb-3">
                        <div className="w-2 h-2 bg-warning rounded-full"></div>
                        <p className="text-warning">Kata sandi lama tidak dapat digunakan kembali</p>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit((values) => {
                            mutation.mutate(values)
                        })} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="oldPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password Lama</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Masukkan password lama" {...field} onChange={(e) => {
                                                field.onChange(e);
                                            }} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password Baru</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Masukkan password baru" {...field} onChange={(e) => {
                                                field.onChange(e);
                                                checkPassword({ password: e.target.value });
                                            }} />
                                        </FormControl>
                                        <FormDescription>Password harus minimal 8 karakter</FormDescription>
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
                                <div className="grid grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className={`w-5 h-5 rounded-[5px] border ${strongPassword.hasLowerCase ? 'bg-success-soft border-success-soft' : 'bg-transparent border-(--color-canvas)'}`}>
                                                {strongPassword.hasLowerCase && <CheckIcon className="w-4 h-4 text-success" />}
                                            </div>
                                            <span>Minimal 8 karakter</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className={`w-5 h-5 rounded-[5px] border ${strongPassword.hasNumber ? 'bg-success-soft border-success-soft' : 'bg-transparent border-(--color-canvas)'}`}>
                                                {strongPassword.hasNumber && <CheckIcon className="w-4 h-4 text-success" />}
                                            </div>
                                            <span>Gabungan huruf & angka</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className={`w-5 h-5 rounded-[5px] border ${strongPassword.hasUpperCase ? 'bg-success-soft border-success-soft' : 'bg-transparent border-(--color-canvas)'}`}>
                                                {strongPassword.hasUpperCase && <CheckIcon className="w-4 h-4 text-success" />}
                                            </div>
                                            <span>Huruf besar & kecil</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <div className={`w-5 h-5 rounded-[5px] border ${strongPassword.hasSpecialChar ? 'bg-success-soft border-success-soft' : 'bg-transparent border-(--color-canvas)'}`}>
                                                {strongPassword.hasSpecialChar && <CheckIcon className="w-4 h-4 text-success" />}
                                            </div>
                                            <span>Karakter khusus (!@#$)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Konfirmasi Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Konfirmasi password baru" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 gap-2 mt-10">
                                {/* <Button type="button" variant="outline" onClick={() => { }}>
                                    Batal
                                </Button> */}
                                <Button type="submit" disabled={mutation.isPending}>
                                    {mutation.isPending ? <>
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                        Memproses...
                                    </> : 'Simpan'}
                                </Button>
                            </div>
                            <div className="text-center text-xs text-ink-3 mt-4">
                                Sesi di perangkat lain akan berakhir setelah diganti
                            </div>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    )
}