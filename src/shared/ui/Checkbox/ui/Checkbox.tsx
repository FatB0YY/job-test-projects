'use client'

import classNames from 'classnames'
import { ChangeEvent, FC, KeyboardEvent, MouseEvent } from 'react'

import { Icon } from '@/shared/ui'

import styles from './Checkbox.module.css'

interface CheckboxProps {
  label?: string
  className?: string
  classNameCheckbox?: string
  disabled?: boolean
  checked: boolean
  onChange: (checked: boolean) => void
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  disabled,
  onChange,
  checked,
  className,
  classNameCheckbox,
}) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLLabelElement>) => {
    if (event.key === 'Enter' && !disabled) {
      onChange(!checked)
    }
  }

  const handleMouseDown = (event: MouseEvent<HTMLLabelElement>) => {
    event.preventDefault()
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  return (
    <label
      className={classNames(
        styles.container,
        { [styles.disabled]: disabled },
        className,
      )}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      onMouseDown={handleMouseDown}
    >
      <div
        className={classNames(
          styles.checkbox,
          { [styles.checked]: checked, [styles.disabled]: disabled },
          classNameCheckbox,
        )}
      >
        {checked && (
          <Icon color={disabled ? '#A6A6A9' : 'white'} name="CheckSmall" />
        )}
      </div>

      {label && (
        <span
          className={classNames(
            styles.labelText,
            { [styles.disabled]: disabled },
            'system-typo-300',
          )}
        >
          {label}
        </span>
      )}

      <input
        data-testId="checkbox"
        tabIndex={-1}
        className={styles.invisibleInput}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
      />
    </label>
  )
}

Checkbox.displayName = 'Checkbox'
