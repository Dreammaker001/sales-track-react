import { useCallback, useEffect, useReducer, useState } from 'react'
import { useDebounce } from '../../../hooks/useDebounce.js'
import { fetchUsers, toggleUserStatus } from '../api/usersApi.js'

const initialState = { users: [], loading: true, error: null }

function reducer(state, action) {
  switch (action.type) {
    case 'fetch/start':
      return { ...state, loading: true, error: null }
    case 'fetch/success':
      return { users: action.users, loading: false, error: null }
    case 'fetch/error':
      return { ...state, loading: false, error: action.error }
    case 'toggle/optimistic':
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.id
            ? { ...u, status: u.status === 'Aktif' ? 'Nonaktif' : 'Aktif' }
            : u,
        ),
      }
    case 'toggle/replace':
      return {
        ...state,
        users: state.users.map((u) => (u.id === action.id ? action.user : u)),
      }
    case 'toggle/rollback':
      return { ...state, users: action.users }
    default:
      return state
  }
}

/**
 * State halaman Admin Users:
 * - filter (query/role/status) dengan debounce → fetch ke API
 * - toggle status dengan optimistic update + rollback saat gagal
 */
export default function useUsers(initialQuery = '') {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [query, setQuery] = useState(initialQuery)
  const [role, setRole] = useState('Semua')
  const [status, setStatus] = useState('Semua')

  const debouncedQuery = useDebounce(query, 250)

  useEffect(() => {
    let active = true
    dispatch({ type: 'fetch/start' })

    fetchUsers({ query: debouncedQuery, role, status })
      .then((users) => {
        if (active) dispatch({ type: 'fetch/success', users })
      })
      .catch((err) => {
        if (active) dispatch({ type: 'fetch/error', error: err.message })
      })

    return () => {
      active = false
    }
  }, [debouncedQuery, role, status])

  const toggleStatus = useCallback(
    async (id) => {
      const previous = state.users
      dispatch({ type: 'toggle/optimistic', id })

      try {
        const updated = await toggleUserStatus(id)
        dispatch({ type: 'toggle/replace', id, user: updated })
      } catch (err) {
        dispatch({ type: 'toggle/rollback', users: previous })
        dispatch({ type: 'fetch/error', error: err.message })
      }
    },
    [state.users],
  )

  return {
    users: state.users,
    loading: state.loading,
    error: state.error,
    query,
    setQuery,
    role,
    setRole,
    status,
    setStatus,
    toggleStatus,
  }
}
