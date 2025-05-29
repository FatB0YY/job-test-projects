import { FilterValueObj, TodosFilter } from '@/features/todos-filter'
import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

describe('TodosFilter', () => {
  it('calls onChange when filter buttons are clicked', () => {
    const onChange = vi.fn()
    render(
      <TodosFilter activeFilter={FilterValueObj.ALL} onChange={onChange} />,
    )

    fireEvent.click(screen.getByText(/выполненные/i))
    expect(onChange).toHaveBeenCalledWith('COMPLETED')
  })
})
