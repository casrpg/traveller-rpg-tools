import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { NPCGenerator } from './features/NPCGenerator'
import { PlanetDecoder } from './features/PlanetDecoder'
import { BarRunner } from './ui/BarRunner'
import { Spacer } from './ui/Spacer'

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
        <div className="left-frame" data-id-test="menu-container">
          <div>
            <div className="panel-3">Traveller RPG <span className="hop">Tools</span></div>
            {nav}
          </div>
          <div className="panel-4">04<span className="hop">-41969</span></div>
          <div className="panel-5">05<span className="hop">-1701D</span></div>
          <div className="panel-6">06<span className="hop">-071984</span></div>
          <div className="panel-7">07<span className="hop">-47148</span></div>
          <div>
            <div className="panel-8">08<span className="hop">-091966</span></div>
          </div>
        </div>
        <div className="right-frame">
          <BarRunner bars={[1, 2, 3, 4, 5]} />
          <Spacer spacers={[2, 2, 3, 4]}/>

          <main>
            {routes}
          </main>

        </div>
      </div>
    </Router>
  )
}

const Home: React.FC = () => (
  <>
    <img src="/sfcmd.png" className="sfc" />
    <div className="lcars-heading">Traveller RPG Tools</div>
    <div className="lcars-access">
      user authorization code <span className="blink medium-dark-blue">accepted</span>
    </div>
  </>
)

export default App
