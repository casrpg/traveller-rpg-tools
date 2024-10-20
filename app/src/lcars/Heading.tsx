import { type FC, type PropsWithChildren } from 'react'
import classNames from 'classnames'

export interface HeadingProps {
  align: 'left' | 'right'
}

export const Heading: FC<PropsWithChildren<HeadingProps>> = ({ align, children }) => {
  return (
    <div role="heading" className={classNames('lcars-text-bar', { 'the-end': align === 'right' })}><span>{children}</span></div>
  )
}
