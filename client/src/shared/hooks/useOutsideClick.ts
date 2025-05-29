import { RefObject, useEffect } from 'react'
import { useEvent } from './useEvent'

type UseOutsideClickProps<T extends HTMLElement> = {
  elementRef: RefObject<HTMLDivElement>
  onOutsideClick:
    | ((event: MouseEvent | TouchEvent | KeyboardEvent) => void)
    | VoidFunction
  attached?: boolean
  triggerRef?: RefObject<T>
}

export function useOutsideClick<T extends HTMLElement>({
  elementRef,
  onOutsideClick,
  attached = true,
  triggerRef,
}: UseOutsideClickProps<T>): void {
  const eventHandleOutsideClick = useEvent(onOutsideClick)

  useEffect(() => {
    if (!attached) return

    const getIgnoreElements = (): HTMLElement[] => {
      const elements: HTMLElement[] = []
      if (elementRef && elementRef.current) elements.push(elementRef.current)
      if (triggerRef && triggerRef.current) elements.push(triggerRef.current)
      return elements
    }

    const handleClick = (event: MouseEvent | TouchEvent) => {
      if (!elementRef || !elementRef.current) return
      if (!(event.target instanceof Node)) return

      const ignoreElements = getIgnoreElements()

      if (
        !ignoreElements.some((element) =>
          element.contains(event.target as Node),
        )
      ) {
        eventHandleOutsideClick(event)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Enter') return

      const ignoreElements = getIgnoreElements()
      const activeElement = document.activeElement

      if (
        activeElement &&
        !ignoreElements.some((element) => element.contains(activeElement))
      ) {
        eventHandleOutsideClick(event)
      }
    }

    document.addEventListener('mousedown', handleClick)
    document.addEventListener('touchstart', handleClick)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('touchstart', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [elementRef, triggerRef, eventHandleOutsideClick, attached])
}
