import { FC, ReactNode, ReactPortal } from 'react'
import { createPortal } from 'react-dom'

interface PortalProps {
  children: ReactNode
  element?: HTMLElement
}

let element: HTMLElement | null = null

function getPortalElement(): HTMLElement {
  if (element) return element
  element = document.getElementById('modal-root') ?? document.body
  return element
}

export const Portal: FC<PortalProps> = ({
  children,
  element,
}): ReactPortal | null => {
  const container = element ?? getPortalElement()
  return createPortal(children, container)
}
