import { useVirtualizer } from '@tanstack/react-virtual'
import { useRef } from 'react'
import { TodoType } from '../../types'
import { TodoListItem } from '../TodoListItem'
import styles from './TodosList.module.css'

interface TodosListProps {
  todos: TodoType[]
  // для инфинити-скролла, но в данном случае не надо, так как все локально
  setLoadMoreCbRef?: (element: HTMLElement | null) => void
  onChange?: (id: number) => void
}

export const TodosList = ({
  todos,
  setLoadMoreCbRef,
  onChange,
}: TodosListProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: todos.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 100,
    overscan: 1,
    gap: 8,
    measureElement: (el) => el.getBoundingClientRect().height,
  })

  if (!todos.length) {
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
          const todo = todos[virtualItem.index]
          const isLast = virtualItem.index === todos.length - 1

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
              <TodoListItem todo={todo} onChange={onChange} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
