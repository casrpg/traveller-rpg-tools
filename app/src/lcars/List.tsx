import { type FC, type PropsWithChildren } from 'react'
import classNames from 'classnames'

export interface ListProps {
  className?: string
};

export const List: FC<PropsWithChildren<ListProps>> = ({ className, children }) => {
  return (
    <ul className={classNames('lcars-list', className)}>
      {children}
    </ul>
  )
}
