import { MutableRefObject, useCallback } from 'react'

type RefItem<T> =
  | ((element: T | null) => void) // Функциональный ref
  | MutableRefObject<T | null> // Объектный ref (созданный, например, через useRef)
  | null
  | undefined

export function useCombinedRef<T>(...refs: RefItem<T>[]) {
  const refCb = useCallback((element: T | null) => {
    refs.forEach((ref) => {
      if (!ref) {
        return
      }
      if (typeof ref === 'function') {
        ref(element)
      } else {
        ref.current = element
      }
    })
  }, refs)

  return refCb
}
