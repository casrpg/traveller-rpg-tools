import React from 'react';
import classNames from 'classnames';
import { Button, type ButtonColor } from './Button'; // Adjusted import

interface RoleSelectorProps {
  roles: string[];
  selectedRole: string | null;
  onRoleSelect: (role: string) => void;
}

const defaultButtonColor: ButtonColor = 'ghost-gray'; // Default color for non-selected buttons
const selectedButtonColor: ButtonColor = 'orange'; // Color for the selected button

const RoleSelector: React.FC<RoleSelectorProps> = ({ roles, selectedRole, onRoleSelect }) => {
  return (
    <div style={styles.container} className="role-selector-container">
      {roles.map((role) => {
        const isSelected = role === selectedRole;
        const buttonLabel = role.charAt(0).toUpperCase() + role.slice(1);

        return (
          <Button
            key={role}
            onClick={() => onRoleSelect(role)}
            color={isSelected ? selectedButtonColor : defaultButtonColor}
            // Use className for any additional styling if needed, e.g., margins
            className={classNames('role-selector-button', { 'selected': isSelected })}
          >
            {buttonLabel}
          </Button>
        );
      })}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row' as 'row',
    flexWrap: 'wrap' as 'wrap',
    gap: '8px', // Spacing between buttons, similar to ButtonBar or typical LCARS layout
    padding: '4px 0', // Some vertical padding for the container
  },
  // Individual button styling is largely handled by the Button component via its 'color' prop.
  // The 'role-selector-button' class can be used for overrides or additional spacing if needed.
  // The 'selected' class is added for potential CSS targeting if direct style overrides via color prop are insufficient,
  // but the primary selection indication is through changing the Button's color prop.
};

// It might be beneficial to add some global CSS for .role-selector-button and .role-selector-button.selected
// if more complex styling is needed beyond what the color prop provides.
// For example, in a global LCARS CSS file:
// .role-selector-button { margin-right: 8px; /* Or use gap in flex container */ }
// .role-selector-button.selected { /* e.g., box-shadow: 0 0 5px var(--lcars-color-highlight); */ }
// However, the current approach relies on the Button's 'color' prop for distinction.

export { RoleSelector };
