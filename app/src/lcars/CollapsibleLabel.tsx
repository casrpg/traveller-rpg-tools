import { type FC, type PropsWithChildren } from 'react'
import classnames from 'classnames'

export interface CollapsibleLabelProps {
  className?: string
}

export const CollapsibleLabel: FC<PropsWithChildren<CollapsibleLabelProps>> = ({ className, children }) => {
  return (
    <><span className={classnames('hop', className)}>{children}</span></>
  )
}
