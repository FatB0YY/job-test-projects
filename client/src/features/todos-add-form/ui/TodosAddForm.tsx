import { TodoType } from '@/entities/todo'
import { Button, Input, TextArea } from '@/shared/ui'
import { FC, useState } from 'react'
import styles from './TodosAddForm.module.css'

interface TodosAddFormProps {
  onAddTodo: (todo: TodoType) => void
}

export const TodosAddForm: FC<TodosAddFormProps> = ({ onAddTodo }) => {
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    isCompleted: false,
  })

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.title.trim()) return

    const newItem: TodoType = {
      id: Date.now(),
      ...newTodo,
    }

    onAddTodo(newItem)
    setNewTodo({ title: '', description: '', isCompleted: false })
  }

  return (
    <form onSubmit={handleAddTodo} className={styles.form}>
      <Input
        type="text"
        placeholder="Название задачи"
        value={newTodo.title}
        onChange={(value) => setNewTodo((prev) => ({ ...prev, title: value }))}
      />
      <TextArea
        placeholder="Описание"
        value={newTodo.description}
        onChange={(value) =>
          setNewTodo((prev) => ({ ...prev, description: value }))
        }
      />
      <Button type="submit">Добавить</Button>
    </form>
  )
}
