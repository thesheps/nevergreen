import React, { ReactElement, SVGProps } from 'react'
import styles from './icon.scss'
import cn from 'classnames'

/**
 * Icons from: https://icomoon.io/app
 * Optimise using: https://react-svgr.com/playground/?icon=true&typescript=true
 */
export function Icon({
  children,
  className,
  ...props
}: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      aria-hidden
      className={cn(className, styles.icon)}
      {...props}
    >
      {children}
    </svg>
  )
}
