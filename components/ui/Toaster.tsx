'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './Toaster.module.css'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

let addToastFn: ((toast: Omit<Toast, 'id'>) => void) | null = null

export const addToast = (toast: Omit<Toast, 'id'>) => {
  addToastFn?.(toast)
}

export const toast = {
  success: (message: string) => addToast({ message, type: 'success' }),
  error: (message: string) => addToast({ message, type: 'error' }),
  info: (message: string) => addToast({ message, type: 'info' }),
}

export function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Date.now().toString()
    setToasts((prev) => [...prev, { ...toast, id }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }, [])

  useEffect(() => {
    addToastFn = addToast
    return () => { addToastFn = null }
  }, [addToast])

  return (
    <div className={styles.toaster} aria-live="polite" aria-label="Notifications">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.toast} ${styles[toast.type]}`}
          role="alert"
        >
          {toast.type === 'success' && <span className={styles.icon}>✓</span>}
          {toast.type === 'error' && <span className={styles.icon}>✕</span>}
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  )
}
