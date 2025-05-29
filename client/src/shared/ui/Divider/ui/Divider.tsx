import classNames from 'classnames'
import { CSSProperties, FC } from 'react'

import styles from './Divider.module.css'

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical'
  color?: string
  size?: '100' | '200' | '300'
  className?: string
}

export const Divider: FC<DividerProps> = ({
  orientation = 'horizontal',
  color = 'var(--system-color-action-300)',
  size = '100',
  className,
}) => {
  const sizeStyle = styles[`size-${size}`]
  const orientationStyle = styles[`orientation-${orientation}`]
  const variablesStyle = {
    '--divider-color': color,
  } as CSSProperties

  return (
    <div
      className={classNames(
        styles.container,
        orientationStyle,
        sizeStyle,
        className,
      )}
      style={variablesStyle}
      data-testid="ui-divider"
    />
  )
}
