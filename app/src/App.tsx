import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { NPCGenerator } from './features/NPCGenerator'
import { PlanetDecoder } from './features/PlanetDecoder'
import { BarRunner } from './lcars/BarRunner'
import { Spacer } from './lcars/Spacer'
import { Panel } from './lcars/Panel'
import { CollapsibleLabel } from './lcars/CollapsibleLabel'
import { Home } from './features/Home'
import './App.css'

const App: React.FC = () => {
  const nav = (
    <nav id="secondary-nav">
      <Link to="/">Tool Index</Link>
      <Link to="/planet-decoder">Planet Decoder</Link>
      <Link to="/npc-generator">NPC generator</Link>
    </nav>
  )

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const routes = (
    <Routes>
      <Route path="/npc-generator" element={<NPCGenerator />} />
      <Route path="/planet-decoder" element={<PlanetDecoder />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )

  return (
    <Router>
      <div className="wrap-everything">
        <div className="wrap" id="column-3">
          <div className="left-frame" data-id-test="menu-container">
            <div>
              <Panel kind="3">Traveller RPG <span className="hop">Tools</span></Panel>
              {nav}
            </div>
            <Panel kind="4">04<CollapsibleLabel>-41969</CollapsibleLabel></Panel>
            <Panel kind="5">05<CollapsibleLabel>-1701D</CollapsibleLabel></Panel>
            <Panel kind="6">06<CollapsibleLabel>-071984</CollapsibleLabel></Panel>
            <Panel kind="7">07<CollapsibleLabel>-47148</CollapsibleLabel></Panel>
            <div className="panel-wrapper">
              <Panel kind="8">08<span className="hop">-091966</span></Panel>
            </div>
          </div>
          <div className="right-frame">
            <BarRunner bars={[1, 2, 3, 4, 5]} />
            <Spacer spacers={[1, 2, 3, 4]}/>

            <main className="content-panel--main-area">
              {routes}
            </main>

          </div>
        </div>
      </div>
    </Router>
  )
}

export default App
