import classNames from 'classnames'
import { FC } from 'react'

import styles from './Overlay.module.css'

interface OverlayProps {
  className?: string
  onClick?: () => void
}

export const Overlay: FC<OverlayProps> = ({ className, onClick }) => {
  return (
    <div onClick={onClick} className={classNames(styles.overlay, className)} />
  )
}
