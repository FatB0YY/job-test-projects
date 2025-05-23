import { useEffect, useMemo } from 'react'
import { useEvent } from './useEvent'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useDebounce<Fn extends (...args: any[]) => any>(
  fn: Fn,
  ms: number,
) {
  const memoizedFn = useEvent(fn)

  const debouncedFn = useMemo(
    () =>
      debounce((...args: Parameters<Fn>) => {
        memoizedFn(...args)
      }, ms),
    [memoizedFn, ms],
  )

  useEffect(
    () => () => {
      debouncedFn.cancel()
    },
    [debouncedFn],
  )

  return debouncedFn
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function debounce<T extends (...args: any[]) => any>(fn: T, ms: number) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  function debounced(...args: Parameters<T>) {
    if (typeof timeoutId === 'number') {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      timeoutId = null
      fn(...args)
    }, ms)
  }

  debounced.cancel = () => {
    if (typeof timeoutId !== 'number') {
      return
    }
    clearTimeout(timeoutId)
  }

  return debounced
}
