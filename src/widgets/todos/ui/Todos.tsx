import { TodosList, TodoType } from '@/entities/todo'
import { SearchInput } from '@/features/search-input'
import { TodosAddForm } from '@/features/todos-add-form'
import {
  FilterValueObj,
  FilterValueObjKeys,
  TodosFilter,
} from '@/features/todos-filter'
import { Button, Divider } from '@/shared/ui'
import classNames from 'classnames'
import { FC, useMemo, useState } from 'react'
import { DEFAULT_TODOS } from '../constants'
import styles from './Todos.module.css'

export const Todos: FC = () => {
  const [todos, setTodos] = useState<TodoType[]>(() => DEFAULT_TODOS)
  const [filter, setFilter] = useState<FilterValueObjKeys>(FilterValueObj.ALL)
  const [searchQuery, setSearchQuery] = useState('')

  const handleAddTodo = (todo: TodoType) => {
    setTodos((prev) => [todo, ...prev])
  }

  const handleSearchTodo = (value: string) => {
    setSearchQuery(value.toLowerCase())
  }

  const handleToggleComplete = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    )
  }

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const isActive = !todo.isCompleted
      const isCompleted = todo.isCompleted

      const isFilteredIn =
        filter === FilterValueObj.ALL ||
        (filter === FilterValueObj.ACTIVE && isActive) ||
        (filter === FilterValueObj.COMPLETED && isCompleted)

      const todoText = `${todo.title} ${todo.description ?? ''}`.toLowerCase()
      const matchesSearch = todoText.includes(searchQuery)

      return isFilteredIn && matchesSearch
    })
  }, [todos, filter, searchQuery])

  const resultsCount = filteredTodos.length
    ? `${filteredTodos.length} todos`
    : null

  return (
    <div className={styles.container}>
      {/* Форма добавления */}
      <section className={styles.wrapper}>
        <TodosAddForm onAddTodo={handleAddTodo} />
      </section>

      <Divider />

      {/* Поиск и результат */}
      <section className={styles.wrapper}>
        <div className={styles.searchBlock}>
          <SearchInput
            onSearchChange={handleSearchTodo}
            placeholder="Искать задачи"
          />
          {resultsCount && (
            <p className={classNames(styles.resultsCount, 'system-typo-200')}>
              {resultsCount}
            </p>
          )}
        </div>
      </section>

      <Divider />

      {/* Список задач */}
      <section className={styles.wrapper}>
        <TodosList todos={filteredTodos} onChange={handleToggleComplete} />
      </section>

      <Divider />

      {/* Фильтры */}
      <section className={styles.wrapper}>
        <TodosFilter activeFilter={filter} onChange={setFilter} />
        <Button size="100" variant="danger" onClick={() => setTodos([])}>
          Удалить все
        </Button>
      </section>
    </div>
  )
}
