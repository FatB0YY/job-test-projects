import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'
import { MovieType } from '../../types'
import { MovieListItem } from '../MovieListItem'
import styles from './MoviesList.module.css'

interface MoviesListProps {
  movies: MovieType[]
  // для инфинити-скролла, но в данном случае не надо, так как все локально
  setLoadMoreCbRef?: (element: HTMLElement | null) => void
  onChange?: (selectedMovie: MovieType) => void
}

export const MoviesList = ({
  movies,
  setLoadMoreCbRef,
  onChange,
}: MoviesListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: movies.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 100,
    overscan: 1,
    gap: 8,
    measureElement: (el) => el.getBoundingClientRect().height,
  })

  if (!movies.length) {
    return <div className="system-typo-300">Ничего не найдено</div>
  }

  const virtualItems = virtualizer.getVirtualItems()

  return (
    <div ref={scrollRef} className={styles.scroll}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
        className={styles.wrapper}
      >
        {virtualItems.map((virtualItem) => {
          const movie = movies[virtualItem.index]
          const isLast = virtualItem.index === movies.length - 1

          return (
            <div
              ref={(el) => {
                if (el) virtualizer.measureElement(el)
                if (isLast && setLoadMoreCbRef) setLoadMoreCbRef(el)
              }}
              data-index={virtualItem.index}
              key={virtualItem.key}
              className={styles.item}
              style={{
                position: 'absolute',
                top: 0,
                transform: `translateY(${virtualItem.start}px)`,
                width: '100%',
              }}
            >
              <MovieListItem movie={movie} onChange={onChange} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
