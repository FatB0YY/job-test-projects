import { TodosAddForm } from '@/features/todos-add-form'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

describe('TodosAddForm', () => {
  it('calls onAddTodo when submitted', () => {
    const onAddTodo = vi.fn()
    render(<TodosAddForm onAddTodo={onAddTodo} />)

    fireEvent.change(screen.getByPlaceholderText(/название задачи/i), {
      target: { value: 'Test todo' },
    })

    fireEvent.click(screen.getByText(/добавить/i))
    expect(onAddTodo).toHaveBeenCalled()
  })
})
