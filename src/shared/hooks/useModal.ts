import { useEffect, useId, useState } from 'react'
import { useEvent } from './useEvent'

interface UseModalProps {
  isOpen: boolean
  onClose: () => void
  toggleDuration?: number
}

const openModalsStack: string[] = []

export function useModal({
  isOpen = false,
  onClose,
  toggleDuration = 200,
}: UseModalProps) {
  const [isMounted, setIsMounted] = useState(false)
  const modalId = useId()
  const onCloseStable = useEvent(onClose)

  useEffect(() => {
    if (isOpen) {
      openModalsStack.push(modalId)
      setIsMounted(true)
      document.body.style.overflow = 'hidden'
    } else {
      const idx = openModalsStack.indexOf(modalId)
      if (idx !== -1) {
        openModalsStack.splice(idx, 1)
      }
      const timer = setTimeout(() => {
        if (openModalsStack.length === 0) {
          document.body.style.overflow = 'auto'
        }
        setIsMounted(false)
      }, toggleDuration)
      return () => clearTimeout(timer)
    }
  }, [isOpen, modalId, toggleDuration])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        const topModalId = openModalsStack[openModalsStack.length - 1]
        if (topModalId === modalId) {
          onCloseStable()
        }
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, modalId, onCloseStable])

  return { isMounted, closeHandler: onCloseStable, toggleDuration }
}
