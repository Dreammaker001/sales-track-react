import { useState } from 'react'
import { storage } from '../services/storage'

/** State yang tersinkron ke localStorage. */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => storage.get(key, initialValue))

  const set = (next) => {
    setValue((prev) => {
      const resolved = typeof next === 'function' ? next(prev) : next
      storage.set(key, resolved)
      return resolved
    })
  }

  return [value, set]
}
