import { useEffect, useRef } from 'preact/hooks'
import { X } from 'lucide-preact'

/** Native modal semantics provide focus containment, Escape, and an inert background. */
export function Dialog ({ title, description, closeLabel, onClose, children }) {
  const ref = useRef(null)
  useEffect(() => {
    const dialog = ref.current
    const trigger = document.activeElement
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (trigger?.isConnected) trigger.focus()
    }
  }, [])

  return (
    <dialog ref={ref} class='app-dialog' aria-labelledby='dialog-title' aria-describedby='dialog-description' onCancel={event => { event.preventDefault(); onClose() }}>
      <button class='dialog-close' aria-label={closeLabel} onClick={onClose}><X size={20} /></button>
      <div class='dialog-accent' aria-hidden='true' />
      <h2 id='dialog-title'>{title}</h2>
      <p id='dialog-description'>{description}</p>
      <div class='dialog-actions'>{children}</div>
    </dialog>
  )
}
