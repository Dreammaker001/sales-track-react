# SalesTrack — React Frontend

Pedoman kerja untuk agent AI (Hermes, OpenCode, Claude Code, Codex) di repo ini.
Baca sebelum mengerjakan tugas apa pun. UI sistem berbahasa Indonesia.

## Stack

- Vite 8 + React 19 + React Router 8 (createBrowserRouter) + Tailwind CSS v4 (CSS-first, via `@theme` di `src/styles/variables.css`)
- TanStack Query (data fetching + cache), React Hook Form + Zod (form & validasi), dayjs (tanggal)
- shadcn/ui-style components (Radix) di `src/components/ui/`, ikon `lucide-react`
- JavaScript (.jsx), bukan TypeScript. Import alias `@/` → `src/`
- Vite proxy: `/api` → `http://127.0.0.1:8001` (backend Go). Jangan panggil URL absolut.

## Struktur (feature-based)

```
src/
  api/            client axios global (interceptor auth, refresh token)
  components/
    layout/       AppLayout, Sidebar, Topbar
    ui/           komponen UI siap pakai (lihat daftar di bawah)
    auth/         RequireAuth, RequireRole
    common/       DataPagination
  features/<fitur>/
    components/   komponen spesifik fitur
    hooks/        useQuery/useMutation per fitur
    api/          fungsi fetch per fitur
    forms/        schema Zod + default values
  pages/          halaman route (biasanya pembungkus tipis di atas komponen fitur)
  routes/         index.jsx — satu-satunya tempat definisi route
  hooks/          useDebounce, useLocalStorage, useMediaQuery
  utils/          format.js (formatRupiah, formatDate, initials), validators.js
  services/       storage.js (localStorage helper)
```

Pola standar halaman list: `Page` (state + useSearchParams) → `FilterBar` → `Table`/`Card` → row components, data via hook `useXxx` (TanStack Query), mutation dengan optimistic update.

## Komponen UI yang sudah ada (pakai ini, JANGAN buat baru)

`src/components/ui/`: `Card`, `Button`, `Input`, `Badge` (variant: success | warning | gray | danger), `Chip` (filter aktif/nonaktif), `Avatar`, `Toggle`, `DropdownMenu` (Trigger/Content/Item), `Dialog`, `Select`, `Pagination`, `Form/FormField/FormItem/FormLabel/FormControl/FormMessage`, `Checkbox`, `Sonner` (toast). `src/components/common/DataPagination` untuk pagination list.

Contoh penggunaan: `import Card from '@/components/ui/Card.jsx'`, `import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu.jsx'`.

## Design tokens (Tailwind v4 @theme — JANGAN hardcode hex)

Warna jadi utility class langsung: `bg-canvas` (#F6F7FB), `bg-surface` (putih), `text-ink` / `text-ink-2` / `text-ink-3`, `border-line`, `bg-primary-soft` / `text-primary` (indigo #4F46E5), `bg-gray-soft`, status: `success`/`warning`/`danger`/`info` + varian `-soft` (mis. `bg-success-soft text-success`). Radius: `rounded-sm`=8px, `rounded-md`=12px, `rounded-lg`=16px. Font: Inter. Shadow kartu: `shadow-card`.

## Aturan kerja

1. **Jangan ubah file di luar scope tugas** — jangan sentuh layout, routes, AuthContext, atau fitur lain kecuali diminta.
2. Route terpusat di `src/routes/index.jsx`; setiap route punya `handle: { title, subtitle }` yang dibaca Topbar. Halaman admin dibungkus `<RequireRole roles={['admin']}>`, halaman umum `<RequireAuth>`.
3. Data selalu lewat hook fitur (TanStack Query) — jangan fetch langsung di komponen. Query key berisi filter (mis. `['users', filters]`).
4. Mutation: optimistic update + rollback (lihat `useUsers.js`) atau invalidate queryKey setelah sukses. Gunakan `sonner` untuk toast.
5. Bahasa UI: Indonesia. Format angka `formatRupiah`/`Intl`, tanggal via `dayjs` atau `formatDate` (id-ID).
6. Responsif mobile-first: gunakan breakpoint Tailwind (`sm`=640, `lg`=1024). Tabel desktop + kartu mobile memakai pola `hidden lg:block` / `lg:hidden`.
7. Jangan install package baru tanpa persetujuan.
8. Verifikasi: `npm run build` harus sukses sebelum menyatakan selesai (jangan `npm run dev` untuk verifikasi). Perubahan dibiarkan sebagai working tree kecuali diminta commit.
