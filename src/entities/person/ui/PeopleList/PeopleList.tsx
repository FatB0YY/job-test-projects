import { PersonListItem, PersonType } from '@/entities/person'
import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'
import styles from './PeopleList.module.css'

interface PeopleListProps {
  people: PersonType[]
  setLoadMoreCbRef?: (element: HTMLElement | null) => void
}

export const PeopleList = ({ people, setLoadMoreCbRef }: PeopleListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: people.length,
    estimateSize: () => 94,
    getScrollElement: () => scrollRef.current,
    overscan: 3,
    gap: 8,
  })

  if (!people.length) {
    return <div className="system-typo-300">Ничего не найдено</div>
  }

  const virtualItems = virtualizer.getVirtualItems()

  return (
    <div ref={scrollRef} className={styles.scroll}>
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
        }}
        className={styles.wrapper}
      >
        {virtualItems.map((virtualItem) => {
          const person = people[virtualItem.index]
          const isLast = virtualItem.index === people.length - 1

          return (
            <div
              ref={isLast ? setLoadMoreCbRef : null}
              data-index={virtualItem.index}
              className={styles.item}
              key={virtualItem.key}
              style={{
                height: `${virtualItem.size}px`,
                transform: `translateY(${virtualItem.start}px)`,
              }}
            >
              <PersonListItem person={person} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
