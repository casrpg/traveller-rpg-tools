/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react'

interface PlanetInfo {
  name: string
  size: number
  atmosphere: number
  hydrographics: number
  population: number
  government: number
  lawLevel: number
  techLevel: number
}

export const PlanetDecoder: React.FC = () => {
  const [planetCode, setPlanetCode] = useState('')
  const [planetInfo, setPlanetInfo] = useState<PlanetInfo | null>(null)

  const decodePlanet = async () => {
    try {
      const response = await fetch('/api/decode-planet', {
        method: 'POST',
        body: JSON.stringify({ planetCode })
      })
      const data: PlanetInfo = await response.json()
      setPlanetInfo(data)
    } catch (error) {
      console.error('Error decoding planet:', error)
    }
  }

  return (
    <div className="lcars-panel">
      <h2 className="mb-4 text-2xl font-bold lcars-header">Planet Decoder</h2>
      <div className="lcars-content">
        <input
          type="text"
          value={planetCode}
          onChange={(e) => { setPlanetCode(e.target.value) }}
          placeholder="Enter planet code"
          className="w-full p-2 mb-4 bg-[#000033] text-[#ff9900] rounded"
        />
        <button
          onClick={decodePlanet}
          className="mb-4 lcars-button"
        >
          Decode Planet
        </button>
        {planetInfo && (
          <div className="mt-4">
            <div className="lcars-element">{planetInfo.name}</div>
            <div className="lcars-element">Size: {planetInfo.size}</div>
            <div className="lcars-element">Atmosphere: {planetInfo.atmosphere}</div>
            <div className="lcars-element">Hydrographics: {planetInfo.hydrographics}</div>
            <div className="lcars-element">Population: {planetInfo.population}</div>
            <div className="lcars-element">Government: {planetInfo.government}</div>
            <div className="lcars-element">Law Level: {planetInfo.lawLevel}</div>
            <div className="lcars-element">Tech Level: {planetInfo.techLevel}</div>
          </div>
        )}
      </div>
    </div>
  )
}
