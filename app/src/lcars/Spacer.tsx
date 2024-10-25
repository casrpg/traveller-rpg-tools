import { type FC } from 'react'

export type SpacerKind = 1 | 2 | 3 | 4

export interface SpacerProps {
  spacers: SpacerKind[]
}

export const Spacer: FC<SpacerProps> = ({ spacers: spacerValues }) => {
  return (
    <div className="spacer">
      {spacerValues.map((value, index) => (
        <div key={index} className={`space-${value}`}> </div>
      ))}
    </div>
  )
}
