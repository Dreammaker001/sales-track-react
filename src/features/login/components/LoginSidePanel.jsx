// src/features/login/components/LoginSidePanel.jsx
import { BarChart3 } from 'lucide-react'

/**
 * Panel kiri halaman Login — akurat sesuai board Penpot (lebar 690px).
 * Logo atas (y=62), headline 34px, deskripsi 15px, footer © bawah (y=748).
 */
export default function LoginSidePanel() {
  return (
    <aside className="relative hidden w-[690px] shrink-0 flex-col justify-between overflow-hidden bg-gradient-to-br from-primary to-[#6D28D9] px-10 pt-14 pb-8 text-white lg:flex">
      {/* Dekorasi — CSS murni */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 -bottom-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/4 right-16 h-24 w-24 rounded-full border border-white/20" />

      {/* Logo — posisi atas */}
      <div className="relative flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-white text-primary">
          <BarChart3 className="h-5 w-5" />
        </span>
        <span className="text-[26px] font-bold tracking-tight">SalesTrack</span>
      </div>

      {/* Headline & deskripsi */}
      <div className="relative">
        <h1 className="text-[34px] leading-[1.3] font-bold">
          Kelola Sales Order
          <br />
          dan Invoice dalam satu platform.
        </h1>
        <p className="mt-6 max-w-[430px] text-[15px] leading-relaxed text-white/80">
          Pantau progres pesanan, status pengiriman, dan faktur — real-time untuk tim sales Anda.
        </p>
      </div>

      {/* Footer */}
      <p className="relative text-[13px] text-white/60">© 2026 SalesTrack</p>
    </aside>
  )
}
