import classNames from 'classnames'
import { type FC, type PropsWithChildren } from 'react'

export type ButtonsAlignment = 'center' | 'right' | 'space-evenly' | 'space-between' | 'space-around'

export interface ButtonBarProps {
  alignment?: ButtonsAlignment
  className?: string
}

export const ButtonBar: FC<PropsWithChildren<ButtonBarProps>> = ({ alignment, className, children }) => {
  return (
    <div className={classNames('buttons', className, {
      'jc-center': alignment === undefined || alignment === 'center',
      'jc-flex-end': alignment === 'right',
      'jc-space-evenly': alignment === 'space-evenly',
      'jc-space-between': alignment === 'space-between',
      'jc-space-around': alignment === 'space-around'
    })}>
      {children}
    </div>
  )
}
