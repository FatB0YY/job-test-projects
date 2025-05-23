import { useCallback, useLayoutEffect, useRef } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useEvent<T extends (...args: any[]) => any>(fn: T) {
  const fnRef = useRef(fn)

  useLayoutEffect(() => {
    fnRef.current = fn
  }, [fn])

  const eventCb = useCallback(
    (...args: Parameters<T>): ReturnType<T> => {
      return fnRef.current(...args)
    },
    [fnRef],
  )

  return eventCb
}
