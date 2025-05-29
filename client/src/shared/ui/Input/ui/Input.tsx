import classNames from 'classnames'
import {
  ChangeEvent,
  forwardRef,
  InputHTMLAttributes,
  MouseEvent,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import { useCombinedRef } from '@/shared/hooks'
import styles from './Input.module.css'

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  className?: string
  placeholder?: string
  value?: string | number
  error?: string
  onChange?: (value: string) => void
  rightSection?: ReactNode
  leftSection?: ReactNode
  isAutoFocus?: boolean
  disabled?: boolean
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    placeholder,
    className,
    error,
    onChange,
    value,
    rightSection,
    leftSection,
    isAutoFocus,
    disabled,
    type,
    ...props
  },
  outsideRef,
) {
  const [isFocused, setIsFocused] = useState(isAutoFocus || false)
  const ref = useRef<HTMLInputElement>(null)

  // объединенные рефы в cb-ref
  const combinedInputRef = useCombinedRef(ref, outsideRef)

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    onChange?.(value)
  }

  useLayoutEffect(() => {
    if (!(isAutoFocus && ref.current)) return
    ref.current.focus()
  }, [isAutoFocus])

  const onFocusHandler = () => setIsFocused(true)
  const onBlurHandler = () => setIsFocused(false)

  const onMouseDownHandler = (event: MouseEvent<HTMLLabelElement>) => {
    if (!ref.current || ref.current.value.length === 0) {
      event.preventDefault()
      ref.current?.focus()
    }
  }

  return (
    <div className={classNames(styles.wrapper, className)}>
      <label
        onMouseDown={onMouseDownHandler}
        className={classNames(styles.container, {
          [styles.focused]: isFocused,
          [styles.error]: error,
          [styles.disabled]: disabled,
        })}
      >
        {leftSection}
        <input
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          value={value}
          placeholder={placeholder}
          ref={combinedInputRef}
          className={classNames(styles.text, 'system-typo-300', {
            [styles.error]: error,
            [styles.disabled]: disabled,
          })}
          type={type}
          disabled={disabled}
          {...props}
        />
        {rightSection}
      </label>
      {error && (
        <span className={classNames(styles.error, 'system-typo-100')}>
          {error}
        </span>
      )}
    </div>
  )
})
