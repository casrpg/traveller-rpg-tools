import React, { useState } from 'react'
import { Heading } from '../lcars/Heading'
import { LCARSSelector } from '../lcars/LCARSSelector';
import { List } from '../lcars/List'
import { ListItem } from '../lcars/ListItem'
import { ButtonBar } from '../lcars/ButtonBar'
import { Button } from '../lcars/Button'

type Characteristic = 'STR' | 'DEX' | 'END' | 'INT' | 'EDU' | 'SOC'
interface NPC {
  name: string
  occupation: string
  characteristics: Record<Characteristic, { value: number, modifier: number }>
  skills: string[]
  equipment: string[]
}

const allCharacteristics: Characteristic[] = ['STR', 'DEX', 'END', 'INT', 'EDU', 'SOC']

const availableRoles = [
  "pilot", "navigator", "engineer", "steward", "medic", "marine",
  "gunner", "scout", "technician", "leader", "diplomat",
  "entertainer", "trader", "thug"
];

export const NPCGenerator: React.FC = () => {
  const [npc, setNPC] = useState<NPC | null>(null)
  const [selectedRole, setSelectedRole] = useState<string | null>(availableRoles[0]);

  const generateNPC = async () => {
    try {
      const response = await fetch('/api/generate-npc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: selectedRole }), // Add the selected role
      })
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
        <LCARSSelector
          label="Role"
          options={availableRoles}
          selectedOption={selectedRole}
          onOptionSelect={setSelectedRole}
          color="blue" // Or another LCARS color
        />
        <Button color="orange" onClick={generateNPC}>Generate NPC</Button>
      </ButtonBar>
      {npc && (
        <List>
          <ListItem color="orange" >Name: {npc.name}</ListItem>
          <ListItem color="cyan">Occupation: <span className="cyan">{npc.occupation}</span></ListItem>
          <ListItem color="blue">Characteristics:
            {allCharacteristics
              .map((characteristic) => [characteristic, npc.characteristics[characteristic].value, npc.characteristics[characteristic].modifier])
              .map(([characteristic, value, modifier], index) => (
                <>
                  <span key={characteristic} className="blue"> {characteristic} {value} </span>
                  <span className="medium-dark-blue">
                    ({Number(modifier)>0?'+':''}{modifier})
                  </span>
                  {index === allCharacteristics.length - 1?' ':', '}
                </>
              ))}
          </ListItem>
          <ListItem color="green">Skills: <span className="green">{npc.skills.join(', ')}</span></ListItem>
          <ListItem color="pale-orange">Equipment: <span className="pale-orange">{npc.equipment.join(', ')}</span></ListItem>
        </List>
      )}
    </>
  )
}
