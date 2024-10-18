/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react'
import { Heading } from '../lcars/Heading'
import './PlanetDecoder.css'
import { Panel } from '../lcars/Panel'

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
    <>
      <Heading align="right">Planet Decoder</Heading>
      <Panel kind="2" className='planet-decoder--input-block'>
        <input
          type="text"
          value={planetCode}
          onChange={(e) => { setPlanetCode(e.target.value) }}
          placeholder="Enter planet code"
          className="planet-decoder--code-input"
        />
        <button
          onClick={decodePlanet}
          className="mb-4 lcars-button"
        >
          Decode Planet
        </button>
      </Panel>
      <div className="lcars-content">
        {planetInfo && (
          <div className="mt-4">
            <div className="lcars-element" data-test-id="name">{planetInfo.name}</div>
            <div className="lcars-element" data-test-id="size">Size: {planetInfo.size}</div>
            <div className="lcars-element" data-test-id="atmosphere">Atmosphere: {planetInfo.atmosphere}</div>
            <div className="lcars-element" data-test-id="hydrographics">Hydrographics: {planetInfo.hydrographics}</div>
            <div className="lcars-element" data-test-id="population">Population: {planetInfo.population}</div>
            <div className="lcars-element" data-test-id="government">Government: {planetInfo.government}</div>
            <div className="lcars-element" data-test-id="lawLevel">Law Level: {planetInfo.lawLevel}</div>
            <div className="lcars-element" data-test-id="techLevel">Tech Level: {planetInfo.techLevel}</div>
          </div>
        )}
      </div>
    </>
  )
}
