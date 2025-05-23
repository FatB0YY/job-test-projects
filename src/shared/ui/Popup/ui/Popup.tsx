import classNames from 'classnames'
import { CSSProperties, FC, ReactNode } from 'react'

import { useModal } from '@/shared/hooks'
import { Overlay, Portal } from '@/shared/ui'

import styles from './Popup.module.css'

interface PopupProps {
  classNameContainer?: string
  classNameChildren?: string
  classNameBody?: string
  children: ReactNode
  isOpen: boolean
  onClose: () => void
  toggleDuration?: number
}

export const Popup: FC<PopupProps> = ({
  classNameContainer,
  classNameBody,
  classNameChildren,
  children,
  isOpen,
  onClose,
  toggleDuration: toggleDurationProp,
}) => {
  const { closeHandler, isMounted, toggleDuration } = useModal({
    isOpen,
    onClose,
    toggleDuration: toggleDurationProp,
  })

  if (!isMounted) {
    return null
  }

  const variablesStyle = {
    '--popup-toggle-duration': `${toggleDuration}ms`,
  } as CSSProperties

  return (
    <Portal>
      <div
        className={classNames(
          styles.container,
          {
            [styles.opened]: isOpen,
            [styles.mounted]: isMounted,
            [styles.animationFlashIn]: isOpen,
            [styles.animationFlashOut]: !isOpen,
          },
          classNameContainer,
        )}
        style={variablesStyle}
      >
        <Overlay onClick={closeHandler} />
        <div className={classNames(styles.body, classNameBody)}>
          <div className={classNames(styles.children, classNameChildren)}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}
