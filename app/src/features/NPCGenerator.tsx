import React, { useState } from 'react'
import { Heading } from '../lcars/Heading'
import { RoleSelector } from '../lcars/RoleSelector' // Import RoleSelector
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

const AVAILABLE_ROLES: string[] = [
  "pilot", "navigator", "engineer", "steward", "medic", "marine",
  "gunner", "scout", "technician", "leader", "diplomat",
  "entertainer", "trader", "thug"
];

export const NPCGenerator: React.FC = () => {
  const [npc, setNPC] = useState<NPC | null>(null)
  const [selectedRole, setSelectedRole] = useState<string>(AVAILABLE_ROLES[0]); // Initialize with the first role

  const generateNPC = async () => {
    try {
      // Ensure selectedRole has a value; fallback to first role if somehow null/undefined, though unlikely with init
      const roleToSend = selectedRole || AVAILABLE_ROLES[0];
      const response = await fetch('/api/generate-npc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: roleToSend }),
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
      <RoleSelector
        roles={AVAILABLE_ROLES}
        selectedRole={selectedRole}
        onRoleSelect={setSelectedRole}
      />
      <ButtonBar alignment="space-between" className="mt-1"> {/* Added margin-top for spacing */}
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
