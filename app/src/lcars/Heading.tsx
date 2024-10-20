import type { FC, HTMLAttributes, PropsWithChildren } from 'react'
import classNames from 'classnames'

export interface HeadingProps extends HTMLAttributes<HTMLSpanElement> {
  align: 'left' | 'right'
}

export const Heading: FC<PropsWithChildren<HeadingProps>> = ({ align, children, ...props }) => {
  return (
    <div role="heading" className={classNames('lcars-text-bar', { 'the-end': align === 'right' })}><span {...props}>{children}</span></div>
  )
}
