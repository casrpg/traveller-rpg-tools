/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react'
interface NPC {
  name: string
  occupation: string
  skills: string[]
  equipment: string[]
}

export const NPCGenerator: React.FC = () => {
  const [npc, setNPC] = useState<NPC | null>(null)

  const generateNPC = async () => {
    try {
      const response = await fetch('/api/generate-npc', { method: 'POST' })
      const data: NPC = await response.json()
      setNPC(data)
    } catch (error) {
      console.error('Error generating NPC:', error)
    }
  }

  return (
    <div className="lcars-panel">
      <h2 className="mb-4 text-2xl font-bold lcars-header">NPC Generator</h2>
      <div className="lcars-content">
        <button
          onClick={generateNPC}
          className="mb-4 lcars-button"
        >
          Generate NPC
        </button>
        {npc && (
          <div className="mt-4">
            <div className="lcars-element">{npc.name}</div>
            <div className="lcars-element">Occupation: {npc.occupation}</div>
            <div className="lcars-element">Skills: {npc.skills.join(', ')}</div>
            <div className="lcars-element">Equipment: {npc.equipment.join(', ')}</div>
          </div>
        )}
      </div>
    </div>
  )
}
