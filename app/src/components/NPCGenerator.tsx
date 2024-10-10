import React, { useState } from 'react';

interface NPC {
  name: string;
  age: number;
  occupation: string;
  skills: string[];
}

export const NPCGenerator: React.FC = () => {
  const [npc, setNPC] = useState<NPC | null>(null);

  const generateNPC = async () => {
    try {
      const response = await fetch('/api/generate-npc');
      const data: NPC = await response.json();
      setNPC(data);
    } catch (error) {
      console.error('Error generating NPC:', error);
    }
  };

  return (
    <div className="lcars-panel">
      <h2 className="text-2xl font-bold mb-4 lcars-header">NPC Generator</h2>
      <div className="lcars-content">
        <button
          onClick={generateNPC}
          className="lcars-button mb-4"
        >
          Generate NPC
        </button>
        {npc && (
          <div className="mt-4">
            <div className="lcars-element">{npc.name}</div>
            <div className="lcars-element">Age: {npc.age}</div>
            <div className="lcars-element">Occupation: {npc.occupation}</div>
            <div className="lcars-element">Skills: {npc.skills.join(', ')}</div>
          </div>
        )}
      </div>
    </div>
  );
};
