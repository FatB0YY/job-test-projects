import classNames from 'classnames'
import { memo } from 'react'
import { PersonType } from '../../types'
import styles from './PersonListItem.module.css'

interface PersonListItemProps {
  person: PersonType
}

export const PersonListItem = memo(({ person }: PersonListItemProps) => {
  const { height, mass, name } = person

  return (
    <div className={styles.item}>
      <div className={classNames(styles.field, 'system-typo-300')}>
        Имя: {name}
      </div>
      <div className={classNames(styles.field, 'system-typo-300')}>
        Масса: {mass}
      </div>
      <div className={classNames(styles.field, 'system-typo-300')}>
        Рост: {height}
      </div>
    </div>
  )
})
