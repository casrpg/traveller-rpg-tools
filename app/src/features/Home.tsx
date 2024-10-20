import type { FC } from 'react'
import { Panel } from '../lcars/Panel'

export const Home: FC = () => (
    <Panel kind="1">
      <img src="/sfcmd.png" className="sfc" />
      <div className="lcars-heading">Traveller RPG Tools</div>
      <div className="lcars-access">
        user authorization code <span className="blink medium-dark-blue">accepted</span>
      </div>
    </Panel>
)
