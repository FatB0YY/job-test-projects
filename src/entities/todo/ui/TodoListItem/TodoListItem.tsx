import { Checkbox } from '@/shared/ui'
import classNames from 'classnames'
import { memo } from 'react'
import { TodoType } from '../../types'
import styles from './TodoListItem.module.css'

interface TodoListItemProps {
  todo: TodoType
  onChange?: (id: number) => void
}

export const TodoListItem = memo(({ todo, onChange }: TodoListItemProps) => {
  const { id, isCompleted, title, description } = todo

  const handleClick = () => {
    onChange?.(id)
  }

  return (
    <div className={styles.item}>
      <div
        className={classNames(styles.field, styles.title, 'system-typo-300')}
      >
        <Checkbox checked={isCompleted} onChange={handleClick} />
        Задача: {title}
      </div>

      {description && (
        <div className={classNames(styles.field, 'system-typo-300')}>
          Описание: {description}
        </div>
      )}
    </div>
  )
})
