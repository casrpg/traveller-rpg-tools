/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react'
import { Heading } from '../lcars/Heading'
import './PlanetDecoder.css'
import { ButtonBar } from '../lcars/ButtonBar'
import Button from '../lcars/Button'
import { List } from '../lcars/List'
import { ListItem } from '../lcars/ListItem'
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
  const [planetCode, setPlanetCode] = useState<string>('')
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
      {planetInfo && (
          <>
            <Heading align="right"><span data-test-id="name">{planetInfo.name}</span></Heading>
            <List>
              <ListItem color="pale-orange">Size: <span className='pale-orange' data-test-id="size">{planetInfo.size}</span></ListItem>
              <ListItem color="starlight">Atmosphere: <span className='starlight' data-test-id="atmosphere">{planetInfo.atmosphere}</span></ListItem>
              <ListItem color="cyan">Hydrographics: <span className='cyan' data-test-id="hydrographics">{planetInfo.hydrographics}</span></ListItem>
              <ListItem color="black-cherry">Population: <span className='black-cherry' data-test-id="population">{planetInfo.population}</span></ListItem>
              <ListItem color="ghost-gray">Government: <span className='ghost-gray' data-test-id="government">{planetInfo.government}</span></ListItem>
              <ListItem color="light-orange">Law Level: <span className='light-orange' data-test-id="lawLevel">{planetInfo.lawLevel}</span></ListItem>
              <ListItem color="blue">Tech Level: <span className='blue' data-test-id="techLevel">{planetInfo.techLevel}</span></ListItem>
            </List>
          </>
      )}
    </>
  )
}
