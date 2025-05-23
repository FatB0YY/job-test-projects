import { FC, SVGProps } from 'react'

import * as Icons from '../assets'

type IconNameType = keyof typeof Icons

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconNameType
  size?: number | string
  color?: string
  className?: string
}

export const Icon: FC<IconProps> = ({
  name,
  size = 24,
  color = 'currentColor',
  className,
  ...props
}) => {
  const IconComponent = Icons[name]

  if (!IconComponent) {
    return null
  }
  return (
    <IconComponent
      width={size}
      height={size}
      fill={color}
      className={className}
      {...props}
    />
  )
}
