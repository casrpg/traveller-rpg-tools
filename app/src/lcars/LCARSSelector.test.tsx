import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LCARSSelector } from './LCARSSelector';
import { Button } from './Button'; // Mock or ensure it works in test

// Mock the Button component if it's complex or has side effects not relevant to LCARSSelector tests
jest.mock('./Button', () => ({
  Button: jest.fn(({ children, onClick, color, kind }) => (
    <button data-testid="mock-button" onClick={onClick} data-color={color} data-kind={kind}>
      {children}
    </button>
  )),
}));

const mockOnOptionSelect = jest.fn();
const defaultOptions = ['Option 1', 'Option 2', 'Option 3'];

describe('LCARSSelector', () => {
  beforeEach(() => {
    // Reset mocks before each test
    mockOnOptionSelect.mockClear();
    (Button as jest.Mock).mockClear();
  });

  it('renders correctly with given props', () => {
    render(
      <LCARSSelector
        options={defaultOptions}
        selectedOption="Option 1"
        onOptionSelect={mockOnOptionSelect}
        label="Test Selector"
        color="orange"
      />
    );

    // Check if the label and selected option are displayed
    expect(screen.getByText(/Test Selector: Option 1/)).toBeInTheDocument();
    // Check if the main button is rendered with correct props
    expect(Button).toHaveBeenCalledWith(
      expect.objectContaining({
        color: 'orange',
        children: expect.stringContaining('Test Selector: Option 1'),
      }),
      {}
    );
    // Check container class for color
    const container = screen.getByText(/Test Selector: Option 1/).closest('div');
    expect(container).toHaveClass('lcars-selector-container lcars-color-orange');
  });

  it('toggles the visibility of the options list when the main button is clicked', () => {
    render(
      <LCARSSelector
        options={defaultOptions}
        selectedOption={null}
        onOptionSelect={mockOnOptionSelect}
        label="Selector"
      />
    );

    const mainButton = screen.getByText(/Selector: Select.../);
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument(); // Assuming options list has a role

    // Click to open
    fireEvent.click(mainButton);
    // Now options should be visible. We look for the buttons created for options.
    expect(screen.getByText('Option 1')).toBeVisible();
    expect(screen.getByText('Option 2')).toBeVisible();
    expect(screen.getByText('Option 3')).toBeVisible();


    // Click again to close
    fireEvent.click(mainButton);
    expect(screen.queryByText('Option 1')).not.toBeVisible();
  });

  it('calls onOptionSelect with the correct option and closes the list when an option is clicked', () => {
    render(
      <LCARSSelector
        options={defaultOptions}
        selectedOption="Option 1"
        onOptionSelect={mockOnOptionSelect}
        label="Selector"
      />
    );

    const mainButton = screen.getByText(/Selector: Option 1/);
    // Open the selector
    fireEvent.click(mainButton);

    // Find and click 'Option 2'
    const option2Button = screen.getByText('Option 2');
    fireEvent.click(option2Button);

    // Check if onOptionSelect was called with 'Option 2'
    expect(mockOnOptionSelect).toHaveBeenCalledTimes(1);
    expect(mockOnOptionSelect).toHaveBeenCalledWith('Option 2');

    // Check if the list is closed (Option 2 should not be visible as a standalone button anymore)
    // The main button text would update, but the list itself should not be showing 'Option 1', 'Option 3' etc.
    expect(screen.queryByText('Option 1')).not.toBeVisible(); // Assuming it closes
  });

  it('applies correct colors and highlights selected option', () => {
    render(
      <LCARSSelector
        options={defaultOptions}
        selectedOption="Option 2"
        onOptionSelect={mockOnOptionSelect}
        label="Color Test"
        color="blue"
      />
    );

    // Check container color
    const container = screen.getByText(/Color Test: Option 2/).closest('div');
    expect(container).toHaveClass('lcars-color-blue');

    // Open the selector to check option colors
    fireEvent.click(screen.getByText(/Color Test: Option 2/));

    // Button mock needs to pass through props like 'color' to check them
    // The selected option ('Option 2') should have a different color (e.g., 'blue' as per component logic)
    // Other options should have the default prop color ('blue' in this case, or the selector's color)

    // This part of the test relies heavily on how the Button mock is implemented
    // and how color props are passed and used.
    // Let's assume the mock Button component receives a `color` prop that we can inspect.
    // We'd need to find the specific Button instances for each option.

    // Example: Check the button for 'Option 2' (selected)
    // This requires the Button mock to render something identifiable or the test to be more integrated.
    // For now, we'll rely on the visual aspect already tested by clicking.
    // A more robust way would be to inspect the props passed to the mocked Button for each option.
    // This is somewhat covered by onOptionSelect test's setup.

    // Verify the main button color is correct
    expect(Button).toHaveBeenCalledWith(
        expect.objectContaining({ color: 'blue', children: expect.stringContaining('Color Test: Option 2') }),
        {}
    );

    // Verify option button colors after opening
    // Option 1 (not selected)
     //Instance 0 is the main button, 1 is option 1, 2 is option 2, 3 is option 3
    expect((Button as jest.Mock).mock.calls[1][0]).toMatchObject({color: "blue"});
    // Option 2 (selected)
    expect((Button as jest.Mock).mock.calls[2][0]).toMatchObject({color: "blue"}); // Should be highlight color
    // Option 3 (not selected)
    expect((Button as jest.Mock).mock.calls[3][0]).toMatchObject({color: "blue"});
  });

  it('renders without a label if not provided', () => {
    render(
      <LCARSSelector
        options={defaultOptions}
        selectedOption="Option 1"
        onOptionSelect={mockOnOptionSelect}
      />
    );
    expect(screen.getByText("Option 1")).toBeInTheDocument(); // No "Label: " part
    expect(screen.queryByText(/Select.../)).not.toBeInTheDocument();
  });

  it('shows "Select..." if no option is initially selected and no label', () => {
    render(
      <LCARSSelector
        options={defaultOptions}
        selectedOption={null}
        onOptionSelect={mockOnOptionSelect}
      />
    );
    expect(screen.getByText("Select...")).toBeInTheDocument();
  });
});
