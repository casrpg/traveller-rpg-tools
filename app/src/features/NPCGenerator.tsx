import React, { useState } from 'react'
import { Heading } from '../lcars/Heading'
import { List } from '../lcars/List'
import { ListItem } from '../lcars/ListItem'
import { ButtonBar } from '../lcars/ButtonBar'
import Button from '../lcars/Button'
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
    <>
      <Heading align="left">NPC Generator</Heading>
      <ButtonBar alignment="space-between">
        <Button color="orange" onClick={generateNPC}>Generate NPC</Button>
      </ButtonBar>
      {npc && (
        <List>
          <ListItem color="orange" >Name: {npc.name}</ListItem>
          <ListItem color="cyan">Occupation: <span className="cyan">{npc.occupation}</span></ListItem>
          <ListItem color="green">Skills: <span className="green">{npc.skills.join(', ')}</span></ListItem>
          <ListItem color="pale-orange">Equipment: <span className="pale-orange">{npc.equipment.join(', ')}</span></ListItem>
        </List>
      )}
    </>
  )
}
