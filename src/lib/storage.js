const KEY = 'profiler-top-state-v1'

export function loadState () {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(KEY) || 'null')
    return parsed?.version === 1 ? parsed : null
  } catch {
    return null
  }
}

export function saveState (state) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ ...state, version: 1 }))
    return true
  } catch {
    return false
  }
}

export function clearState () {
  try {
    window.localStorage.removeItem(KEY)
  } catch {}
}
