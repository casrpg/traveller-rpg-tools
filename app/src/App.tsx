import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { Rocket, Users } from 'lucide-react'
import { NPCGenerator } from './components/NPCGenerator'
import { PlanetDecoder } from './components/PlanetDecoder'

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-black text-[#ff9900]">
        <header className="bg-[#000033] p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-bold text-[#ff9900]">Traveller RPG Tools</h1>
            <ul className="flex space-x-4">
              <li>
                <Link to="/npc-generator" className="lcars-button">
                  <Users className="inline-block mr-2" />
                  NPC Generator
                </Link>
              </li>
              <li>
                <Link to="/planet-decoder" className="lcars-button">
                  <Rocket className="inline-block mr-2" />
                  Planet Decoder
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/npc-generator" element={<NPCGenerator />} />
            <Route path="/planet-decoder" element={<PlanetDecoder />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

const Home: React.FC = () => (
  <div className="text-center lcars-panel">
    <h2 className="text-4xl font-bold mb-4 lcars-header">Welcome to Traveller RPG Tools</h2>
    <p className="mb-4 lcars-content">Select a tool from the navigation menu to get started.</p>
  </div>
)

export default App
