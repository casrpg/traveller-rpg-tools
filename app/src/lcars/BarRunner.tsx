import { type FC } from 'react'

export type BarKind = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10

export interface BarRunnerProps {
  bars: BarKind[]
}

export const BarRunner: FC<BarRunnerProps> = ({ bars: barValues }) => {
  return (
    <div className="bar-runner">
      {barValues.map((value, index) => (
        <div key={index} className={`bar-${value}`}> </div>
      ))}
    </div>
  )
}
