import { useMatches } from 'react-router'
import { Button } from '../ui/button.jsx'
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react'

/**
 * Topbar: judul halaman (dari route handle) + search global + avatar.
 * Search global mengarahkan ke /admin/users?q=...
 */
export default function Topbar({ openSidebar, setOpenSidebar }) {
  const matches = useMatches()
  const handle = matches.at(-1)?.handle ?? {}

  return (
    <header className="flex items-center gap-3 px-4 pb-5 pt-6 lg:px-6">
      <Button
        onClick={() => setOpenSidebar((prev) => !prev)}
        className="h-8 w-8 rounded-sm p-0 text-ink-3 hover:opacity-80 cursor-pointer"
      >
        {openSidebar ? (
          <PanelLeftClose className="h-5 w-5 text-white" />
        ) : (
          <PanelLeftOpen className="h-5 w-5 text-white" />
        )}
      </Button>
      <div>
        <h1 className="text-[22px] font-bold leading-tight">{handle.title ?? 'SalesTrack'}</h1>
        {/* <p className="mt-0.5 text-[13px] text-ink-2">{handle.subtitle ?? ''}</p> */}
      </div>
    </header>
  )
}
