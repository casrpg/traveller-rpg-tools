import { type FC, type PropsWithChildren } from 'react'
import classNames from 'classnames'

export type ListItemColor = 'dark-gray' | 'medium-dark-gray' | 'light-gray' | 'ghost-gray' | 'starlight' | 'cyan' | 'orange' | 'light-orange' | 'pale-orange' | 'blue' | 'medium-dark-blue' | 'dark-blue' | 'green' | 'black-cherry'

export interface ListItemProps {
  color?: ListItemColor
  className?: string
};

const classColor = (color: ListItemColor) => {
  switch (color) {
    case 'dark-gray': return 'bullet-dark-gray'
    case 'medium-dark-gray': return 'bullet-medium-dark-gray'
    case 'light-gray': return 'bullet-light-gray'
    case 'ghost-gray': return 'bullet-ghost-gray'
    case 'starlight': return 'bullet-starlight'
    case 'cyan': return 'bullet-cyan'
    case 'orange': return 'bullet-orange'
    case 'light-orange': return 'bullet-light-orange'
    case 'pale-orange': return 'bullet-pale-orange'
    case 'blue': return 'bullet-blue'
    case 'medium-dark-blue': return 'bullet-medium-dark-blue'
    case 'dark-blue': return 'bullet-dark-blue'
    case 'green': return 'bullet-green'
    case 'black-cherry': return 'bullet-black-cherry'
    default: return ''
  }
}

export const ListItem: FC<PropsWithChildren<ListItemProps>> = ({ color, className, children }) => {
  return (
      <li className={classNames(classColor(color ?? 'dark-gray'), className)}>
        {children}
      </li>
  )
}
