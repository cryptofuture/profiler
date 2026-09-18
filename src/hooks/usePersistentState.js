import { useCallback, useEffect, useState } from 'preact/hooks'
import { loadState, saveState } from '../lib/storage.js'

const initial = {
  version: 1,
  locale: 'en',
  answers: {},
  skillLevels: {},
  targetCareer: null,
  weeklyHours: 10,
  completedTasks: {},
  ai: null
}

export function usePersistentState () {
  const [state, setState] = useState(() => ({ ...initial, ...(loadState() || {}) }))
  // Persist in the update itself so navigation or an immediate reload cannot
  // outrun Preact's deferred effects.
  const updateState = useCallback(update => {
    setState(current => {
      const next = typeof update === 'function' ? update(current) : update
      saveState(next)
      return next
    })
  }, [])
  useEffect(() => {
    document.documentElement.lang = state.locale
  }, [state.locale])
  return [state, updateState, initial]
}
