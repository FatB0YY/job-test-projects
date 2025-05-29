import { Checkbox } from '@/shared/ui'
import classNames from 'classnames'
import { memo } from 'react'
import { MovieType } from '../../types'
import styles from './MovieListItem.module.css'

interface MovieListItemProps {
  movie: MovieType
  onChange?: (selectedMovie: MovieType) => void
}

export const MovieListItem = memo(({ movie, onChange }: MovieListItemProps) => {
  const { id, isCompleted, title, description } = movie

  const handleClick = () => {
    onChange?.(movie)
  }

  return (
    <div className={styles.item}>
      <div
        className={classNames(styles.field, styles.title, 'system-typo-300')}
      >
        <Checkbox checked={isCompleted} onChange={handleClick} />
        Фильм: {title}
      </div>

      {description && (
        <div className={classNames(styles.field, 'system-typo-300')}>
          Описание: {description}
        </div>
      )}
    </div>
  )
})
