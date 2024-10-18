import { type FC, type PropsWithChildren } from 'react'
import classNames from 'classnames'

export type ButtonColor = 'blue' | 'orange' | 'ghost-gray' | 'pale-orange'

interface ButtonProps {
  color: ButtonColor
  className?: string
  onClick?: () => void
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({ color, className, onClick, children }) => {
  return (
        <a
            role="button"
            className={classNames('', className, {
              'bc-blue': color === 'blue',
              'bc-orange': color === 'orange',
              'bc-ghost-gray': color === 'ghost-gray',
              'bc-pale-orange': color === 'pale-orange'
            })}
            onClick={onClick}
        >
            {children}
        </a>
  )
}

export default Button
