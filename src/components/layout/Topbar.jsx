import { useState } from 'react'
import { useMatches, useNavigate } from 'react-router'
import Avatar from '../ui/Avatar.jsx'

/**
 * Topbar: judul halaman (dari route handle) + search global + avatar.
 * Search global mengarahkan ke /admin/users?q=...
 */
export default function Topbar() {
  const matches = useMatches()
  const handle = matches.at(-1)?.handle ?? {}
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const submit = (e) => {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/admin/users?q=${encodeURIComponent(q)}` : '/admin/users')
  }

  return (
    <header className="flex items-start justify-between px-6 pb-5 pt-6">
      <div>
        <h1 className="text-[22px] font-bold leading-tight">
          {handle.title ?? 'SalesTrack'}
        </h1>
        <p className="mt-0.5 text-[13px] text-ink-2">{handle.subtitle ?? ''}</p>
      </div>

      <div className="flex items-center gap-3">
        <form className="relative" onSubmit={submit} role="search">
          <span
            className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-ink-3"
            aria-hidden="true"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
          </span>
          <input
            className="h-[38px] w-[220px] rounded-full border border-line bg-surface pl-9 text-sm outline-none transition-colors placeholder:text-ink-3 focus:border-primary focus:ring-[3px] focus:ring-primary-soft"
            placeholder="Cari pengguna..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Pencarian global"
          />
        </form>
        <Avatar initials="AW" size={38} variant="primary" />
      </div>
    </header>
  )
}
