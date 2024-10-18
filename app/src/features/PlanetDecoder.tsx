/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import React, { useState } from 'react'
import { Heading } from '../lcars/Heading'
import './PlanetDecoder.css'
import { ButtonBar } from '../lcars/ButtonBar'
import Button from '../lcars/Button'
import { List } from '../lcars/List'
import { ListItem } from '../lcars/ListItem'
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
            <Heading align="right">{planetInfo.name}</Heading>
            <List>
              <ListItem color="pale-orange" data-test-id="size">Size: <span className='pale-orange'>{planetInfo.size}</span></ListItem>
              <ListItem color="starlight" data-test-id="atmosphere">Atmosphere: <span className='starlight'>{planetInfo.atmosphere}</span></ListItem>
              <ListItem color="cyan" data-test-id="hydrographics">Hydrographics: <span className='cyan'>{planetInfo.hydrographics}</span></ListItem>
              <ListItem color="black-cherry" data-test-id="population">Population: <span className='black-cherry'>{planetInfo.population}</span></ListItem>
              <ListItem color="ghost-gray" data-test-id="government">Government: <span className='ghost-gray'>{planetInfo.government}</span></ListItem>
              <ListItem color="light-orange" data-test-id="lawLevel">Law Level: <span className='light-orange'>{planetInfo.lawLevel}</span></ListItem>
              <ListItem color="blue" data-test-id="techLevel">Tech Level: <span className='blue'>{planetInfo.techLevel}</span></ListItem>
            </List>
          </>
      )}
    </>
  )
}
