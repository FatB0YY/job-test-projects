import { ValueOf } from '@/shared/types'
import { Button } from '@/shared/ui'
import { FC } from 'react'
import styles from './TodosFilter.module.css'

export const FilterValueObj = {
  ALL: 'ALL',
  ACTIVE: 'ACTIVE',
  COMPLETED: 'COMPLETED',
} as const

export type FilterValueObjKeys = ValueOf<typeof FilterValueObj>

interface TodosFilterProps {
  activeFilter: FilterValueObjKeys
  onChange: (value: FilterValueObjKeys) => void
}

export const TodosFilter: FC<TodosFilterProps> = ({
  activeFilter,
  onChange,
}) => {
  return (
    <div className={styles.wrapper}>
      <Button
        variant={activeFilter === FilterValueObj.ALL ? 'primary' : 'secondary'}
        size="100"
        onClick={() => onChange(FilterValueObj.ALL)}
      >
        Все
      </Button>
      <Button
        variant={
          activeFilter === FilterValueObj.ACTIVE ? 'primary' : 'secondary'
        }
        size="100"
        onClick={() => onChange(FilterValueObj.ACTIVE)}
      >
        Активные
      </Button>
      <Button
        variant={
          activeFilter === FilterValueObj.COMPLETED ? 'primary' : 'secondary'
        }
        size="100"
        onClick={() => onChange(FilterValueObj.COMPLETED)}
      >
        Выполненные
      </Button>
    </div>
  )
}
