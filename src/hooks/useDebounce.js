import { useEffect, useState } from 'react'

/** Tunda eksekusi value sampai `delay` ms setelah perubahan terakhir. */
export function useDebounce(value, delay = 250) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
