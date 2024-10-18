/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react'
import { Heading } from '../lcars/Heading'
import './PlanetDecoder.css'
import { ButtonBar } from '../lcars/ButtonBar'
import Button from '../lcars/Button'
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
      <Heading align="left">Planet Decoder</Heading>
      <div className='planet-decoder--input-block'>
        <input
          type="text"
          value={planetCode}
          onChange={(e) => { setPlanetCode(e.target.value) }}
          placeholder="Enter planet code"
          className="planet-decoder--code-input"
        />
        <ButtonBar alignment='space-between'>
          <Button color="pale-orange" onClick={decodePlanet}>Decode Planet</Button>
        </ButtonBar>
      </div>
      <hr />
      {planetInfo && (
          <ul className='lcars-list'>
            <li data-test-id="name">{planetInfo.name}</li>
            <li data-test-id="size">Size: {planetInfo.size}</li>
            <li data-test-id="atmosphere">Atmosphere: {planetInfo.atmosphere}</li>
            <li data-test-id="hydrographics">Hydrographics: {planetInfo.hydrographics}</li>
            <li data-test-id="population">Population: {planetInfo.population}</li>
            <li data-test-id="government">Government: {planetInfo.government}</li>
            <li data-test-id="lawLevel">Law Level: {planetInfo.lawLevel}</li>
            <li data-test-id="techLevel">Tech Level: {planetInfo.techLevel}</li>
          </ul>
      )}
    </>
  )
}
