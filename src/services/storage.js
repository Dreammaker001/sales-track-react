/**
 * Bungkus localStorage/sessionStorage dengan serialisasi JSON otomatis.
 */
const withNamespace = (key) => `salestrack.${key}`

export const storage = {
  get(key, fallback = null) {
    try {
      const raw = localStorage.getItem(withNamespace(key))
      return raw === null ? fallback : JSON.parse(raw)
    } catch {
      return fallback
    }
  },

  set(key, value) {
    localStorage.setItem(withNamespace(key), JSON.stringify(value))
  },

  remove(key) {
    localStorage.removeItem(withNamespace(key))
  },

  clear() {
    Object.keys(localStorage)
      .filter((k) => k.startsWith('salestrack.'))
      .forEach((k) => localStorage.removeItem(k))
  },
}
