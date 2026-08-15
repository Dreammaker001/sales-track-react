import { useSyncExternalStore } from 'react'

/**
 * Deteksi media query (mis. mobile/tablet/desktop).
 * Memakai useSyncExternalStore — pola resmi untuk external store,
 * konsisten dengan Strict Mode & React Compiler.
 */
function subscribe(query, callback) {
  const mql = window.matchMedia(query)
  mql.addEventListener('change', callback)
  return () => mql.removeEventListener('change', callback)
}

export function useMediaQuery(query) {
  return useSyncExternalStore(
    (onChange) => subscribe(query, onChange),
    () => window.matchMedia(query).matches,
  )
}
