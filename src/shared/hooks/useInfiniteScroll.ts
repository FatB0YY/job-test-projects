import { useCallback, useRef } from 'react'
import { EntryStatusObj, EntryStatusObjKeys } from '../constants'

interface UseInfiniteScrollProps {
  loadMore: VoidFunction
  hasMore: boolean
  status: EntryStatusObjKeys
}

export const useInfiniteScroll = ({
  loadMore,
  hasMore,
  status,
}: UseInfiniteScrollProps) => {
  const observer = useRef<IntersectionObserver | null>(null)

  const setLoadMoreCbRef = useCallback(
    (element: HTMLElement | null) => {
      if (observer.current) {
        observer.current.disconnect() // отключить предыдущий наблюдаемый элемент
      }

      if (element) {
        observer.current = new IntersectionObserver(
          ([entry]) => {
            if (
              entry.isIntersecting &&
              hasMore &&
              status !== EntryStatusObj.LOADING
            ) {
              loadMore()
            }
          },
          { threshold: 0.5 },
        )
        observer.current.observe(element)
      }
    },
    [hasMore, loadMore, status],
  )

  return setLoadMoreCbRef
}
