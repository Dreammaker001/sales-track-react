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

  return (
    <header className="flex items-start justify-between px-6 pb-5 pt-6">
      <div>
        <h1 className="text-[22px] font-bold leading-tight">
          {handle.title ?? 'SalesTrack'}
        </h1>
        <p className="mt-0.5 text-[13px] text-ink-2">{handle.subtitle ?? ''}</p>
      </div>
    </header>
  )
}
