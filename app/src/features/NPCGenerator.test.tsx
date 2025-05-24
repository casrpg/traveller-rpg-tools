import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NPCGenerator } from './NPCGenerator';
import { LCARSSelector } from '../lcars/LCARSSelector'; // Real component for interaction

// Mock fetch
global.fetch = jest.fn();

// Mock LCARSSelector only if needed to simplify, but for interaction it's better to use the real one.
// For this test, we want to interact with LCARSSelector to change roles.
// If LCARSSelector itself had complex dependencies, we might mock it.

const mockNpcData = {
  name: 'Test NPC',
  occupation: 'Test Pilot',
  characteristics: {
    STR: { value: 10, modifier: 1 },
    DEX: { value: 11, modifier: 1 },
    END: { value: 9, modifier: 0 },
    INT: { value: 12, modifier: 2 },
    EDU: { value: 8, modifier: -1 },
    SOC: { value: 7, modifier: 0 },
  },
  skills: ['Piloting', 'Gunnery'],
  equipment: ['Laser Pistol', 'Commdot'],
};

const availableRoles = [
  "pilot", "navigator", "engineer", "steward", "medic", "marine",
  "gunner", "scout", "technician", "leader", "diplomat",
  "entertainer", "trader", "thug"
];

describe('NPCGenerator', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockNpcData,
    });
  });

  it('renders correctly and shows the LCARSSelector with default role', () => {
    render(<NPCGenerator />);
    expect(screen.getByText('NPC Generator')).toBeInTheDocument();
    expect(screen.getByText(/Role: pilot/)).toBeInTheDocument(); // Default role is "pilot"
    expect(screen.getByText('Generate NPC')).toBeInTheDocument();
  });

  it('calls fetch with the default selected role when "Generate NPC" is clicked', async () => {
    render(<NPCGenerator />);
    const generateButton = screen.getByText('Generate NPC');

    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('/api/generate-npc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: availableRoles[0] }), // Default role "pilot"
      });
    });

    // Check if NPC data is displayed (basic check)
    await screen.findByText(/Name: Test NPC/);
    expect(screen.getByText(/Occupation: Test Pilot/)).toBeInTheDocument();
  });

  it('updates selected role when LCARSSelector changes and uses it in the API call', async () => {
    render(<NPCGenerator />);

    // --- Change role using LCARSSelector ---
    // 1. Click the selector to open it
    const roleSelectorButton = screen.getByText(`Role: ${availableRoles[0]}`); // e.g., "Role: pilot"
    fireEvent.click(roleSelectorButton);

    // 2. Click on a new role, e.g., "engineer" (which is availableRoles[2])
    const engineerOption = screen.getByText(availableRoles[2]); // "engineer"
    fireEvent.click(engineerOption);

    // 3. Verify the selector display updates
    expect(screen.getByText(`Role: ${availableRoles[2]}`)).toBeInTheDocument(); // "Role: engineer"

    // --- Click Generate NPC ---
    const generateButton = screen.getByText('Generate NPC');
    fireEvent.click(generateButton);

    // --- Verify fetch call ---
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(fetch).toHaveBeenCalledWith('/api/generate-npc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: availableRoles[2] }), // "engineer"
      });
    });

    // Check if NPC data is displayed
    await screen.findByText(/Name: Test NPC/);
  });

  it('handles API error gracefully', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    // Suppress console.error for this test
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    render(<NPCGenerator />);
    const generateButton = screen.getByText('Generate NPC');
    fireEvent.click(generateButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Ensure no NPC data is displayed
    expect(screen.queryByText(/Name: Test NPC/)).not.toBeInTheDocument();
    // Check if the error was logged
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error generating NPC:', expect.any(Error));

    consoleErrorSpy.mockRestore();
  });
});
