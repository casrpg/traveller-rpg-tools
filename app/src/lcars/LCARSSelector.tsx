import React, { useState } from 'react';
import { Button } from './Button'; // Assuming Button can be used
// import './LCARSSelector.css'; // If you create a separate CSS file

interface LCARSSelectorProps {
  options: string[];
  selectedOption: string | null;
  onOptionSelect: (option: string) => void;
  label?: string;
  color?: string; // LCARS components often have color props
}

export const LCARSSelector: React.FC<LCARSSelectorProps> = ({
  options,
  selectedOption,
  onOptionSelect,
  label,
  color = 'orange', // Default LCARS color
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onOptionSelect(option);
    setIsOpen(false);
  };

  return (
    <div className={`lcars-selector-container lcars-color-${color}`}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        color={color}
        kind="default" // Or another appropriate kind
      >
        {label ? `${label}: ` : ''}{selectedOption || 'Select...'}
      </Button>
      {isOpen && (
        <div className="lcars-selector-options-list">
          {options.map((option) => (
            <Button
              key={option}
              onClick={() => handleSelect(option)}
              color={selectedOption === option ? 'blue' : color} // Highlight selected
              kind="default"
            >
              {option}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
