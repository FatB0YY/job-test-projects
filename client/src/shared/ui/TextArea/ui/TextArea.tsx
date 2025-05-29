'use client'

import classNames from 'classnames'
import {
  ChangeEvent,
  FC,
  TextareaHTMLAttributes,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import styles from './TextArea.module.css'

interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  className?: string
  title?: string
  placeholder?: string
  value?: string
  error?: string
  onChange?: (value: string) => void
  disabled?: boolean
  isAutoFocus?: boolean
  resize?: 'horizontal' | 'vertical' | 'both'
  maxLength?: number
}

export const TextArea: FC<TextAreaProps> = ({
  className,
  disabled,
  isAutoFocus,
  onChange,
  placeholder,
  title,
  value,
  error,
  resize,
  maxLength = 1024,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(isAutoFocus || false)
  const [currentValue, setCurrentValue] = useState(value || '')
  const ref = useRef<HTMLTextAreaElement>(null)

  const onChangeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    if (!onChange) return
    onChange(event.target.value)
    setCurrentValue(event.target.value)
  }

  useLayoutEffect(() => {
    setCurrentValue(value || '')
  }, [value])

  useLayoutEffect(() => {
    if (!(isAutoFocus && ref.current)) return
    ref.current.focus()
  }, [isAutoFocus])

  const onFocusHandler = () => setIsFocused(true)
  const onBlurHandler = () => setIsFocused(false)

  const resizeClassMap: {
    [key in NonNullable<TextAreaProps['resize']>]: string
  } = {
    vertical: styles.verticalResize,
    horizontal: styles.horizontalResize,
    both: styles.bothResize,
  }

  const resizeClass = resize ? resizeClassMap[resize] : styles.defaultResize

  return (
    <div className={classNames(styles.wrapper, className)}>
      {title && (
        <span
          className={classNames(
            styles.title,
            { [styles.disabled]: disabled },
            'system-typo-300',
          )}
        >
          {title}
        </span>
      )}
      <label className={styles.textareaWrapper}>
        <textarea
          role="textbox"
          aria-label={title}
          disabled={disabled}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          onChange={onChangeHandler}
          className={classNames(
            styles.text,
            resizeClass,
            {
              [styles.error]: error,
              [styles.disabled]: disabled,
              [styles.focused]: isFocused,
            },
            'system-typo-300',
          )}
          value={currentValue}
          placeholder={placeholder}
          ref={ref}
          maxLength={maxLength}
          {...props}
        />
        <span
          className={classNames(
            styles.count,
            { [styles.disabled]: disabled },
            'system-typo-100',
          )}
        >
          {currentValue.length}/{maxLength}
        </span>
      </label>
      {error && (
        <span className={classNames(styles.error, 'system-typo-100')}>
          {error}
        </span>
      )}
    </div>
  )
}
