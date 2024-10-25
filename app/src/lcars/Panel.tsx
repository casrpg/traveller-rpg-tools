import classNames from 'classnames'
import { type FC, type PropsWithChildren } from 'react'

export type PanelKind = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '20' | '21' | '23' | '24' | '25' | '26' | '27' | 'base'

export interface PanelProps {
  kind: PanelKind
  className?: string
}

export const Panel: FC<PropsWithChildren<PanelProps>> = ({ kind, className, children }) => {
  return (
    <div className={classNames(`panel-${kind}`, className)}>
      {children}
    </div>
  )
}
