import classNames from 'classnames'
import React, { ButtonHTMLAttributes, forwardRef } from 'react'

import { Icon } from '../../Icon'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: '100' | '200' | '300'
  leftSection?: React.ReactNode
  children: React.ReactNode
  rightSection?: React.ReactNode
  className?: string
  unstyled?: boolean
  loading?: boolean
  disabled?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = '300',
      leftSection,
      children,
      rightSection,
      className,
      unstyled = false,
      loading,
      onClick,
      disabled,
      ...props
    },
    ref,
  ) {
    const variantStyle = !unstyled && styles[`variant-${variant}`]
    const sizeStyle = !unstyled && styles[`size-${size}`]

    return (
      <button
        ref={ref}
        className={classNames(
          styles.container,
          'system-typo-300',
          variantStyle,
          sizeStyle,
          className,
        )}
        onClick={!loading ? onClick : undefined}
        disabled={loading || disabled}
        {...props}
      >
        {leftSection && (
          <span
            className={classNames(styles.section, {
              [styles.hiddenSection]: loading,
            })}
          >
            {leftSection}
          </span>
        )}
        <span
          className={classNames(styles.section, {
            [styles.hiddenSection]: loading,
          })}
        >
          {children}
        </span>
        {rightSection && (
          <span
            className={classNames(styles.section, {
              [styles.hiddenSection]: loading,
            })}
          >
            {rightSection}
          </span>
        )}

        {loading && (
          <span className={styles.loading}>
            <Icon name="Preloader" size="75%" />
          </span>
        )}
      </button>
    )
  },
)
