import { test, expect, type Page } from '@playwright/test';

const AVAILABLE_ROLES: string[] = [
  "pilot", "navigator", "engineer", "steward", "medic", "marine",
  "gunner", "scout", "technician", "leader", "diplomat",
  "entertainer", "trader", "thug"
];

const CAPITALIZED_AVAILABLE_ROLES: string[] = AVAILABLE_ROLES.map(
  role => role.charAt(0).toUpperCase() + role.slice(1)
);

const DEFAULT_SELECTED_ROLE_LABEL = CAPITALIZED_AVAILABLE_ROLES[0]; // "Pilot"
const DEFAULT_SELECTED_ROLE_VALUE = AVAILABLE_ROLES[0]; // "pilot"

const SELECTED_BUTTON_CLASS = 'bc-orange';
const DEFAULT_BUTTON_CLASS = 'bc-ghost-gray';

// Mock NPC data structure
const mockNPCData = (role: string) => ({
  name: 'Test NPC ' + role,
  occupation: role.charAt(0).toUpperCase() + role.slice(1),
  characteristics: {
    STR: { value: 10, modifier: 1 },
    DEX: { value: 11, modifier: 1 },
    END: { value: 12, modifier: 2 },
    INT: { value: 9, modifier: 1 },
    EDU: { value: 8, modifier: 0 },
    SOC: { value: 7, modifier: 0 },
  },
  skills: ['Test Skill 1', 'Test Skill 2'],
  equipment: ['Test Equipment 1', 'Test Equipment 2'],
});

test.describe('NPCGenerator Feature', () => {
  test.beforeEach(async ({ page }) => {
    // Mock the API endpoint
    await page.route('/api/generate-npc', async route => {
      const request = route.request();
      const postData = request.postDataJSON();
      const role = postData?.role || DEFAULT_SELECTED_ROLE_VALUE; // Use default if no role sent
      await route.fulfill({ json: mockNPCData(role) });
    });

    // Navigate to the page where NPCGenerator is rendered (assuming it's the root)
    await page.goto('/');
  });

  test('RoleSelector visibility and default state', async ({ page }) => {
    // Verify RoleSelector container is visible (using a data-testid or a class if available)
    // For now, we'll check if its children (buttons) are visible.
    // const roleSelectorContainer = page.locator('.role-selector-container'); // Assuming this class exists from RoleSelector.tsx
    // await expect(roleSelectorContainer).toBeVisible();

    // Check that all expected roles are displayed as buttons
    for (const roleLabel of CAPITALIZED_AVAILABLE_ROLES) {
      await expect(page.getByRole('button', { name: roleLabel, exact: true })).toBeVisible();
    }

    // Verify the default selected role ("Pilot") has the selected style
    const defaultSelectedButton = page.getByRole('button', { name: DEFAULT_SELECTED_ROLE_LABEL, exact: true });
    await expect(defaultSelectedButton).toHaveClass(new RegExp(SELECTED_BUTTON_CLASS));

    // Verify other roles have the default style (checking one example)
    if (CAPITALIZED_AVAILABLE_ROLES.length > 1) {
      const anotherRoleLabel = CAPITALIZED_AVAILABLE_ROLES[1];
      const anotherButton = page.getByRole('button', { name: anotherRoleLabel, exact: true });
      await expect(anotherButton).toHaveClass(new RegExp(DEFAULT_BUTTON_CLASS));
    }
  });

  test('Role selection interaction', async ({ page }) => {
    const roleToSelectLabel = CAPITALIZED_AVAILABLE_ROLES[2]; // "Engineer"
    const roleToSelectButton = page.getByRole('button', { name: roleToSelectLabel, exact: true });

    const defaultSelectedButton = page.getByRole('button', { name: DEFAULT_SELECTED_ROLE_LABEL, exact: true });

    // Initially, "Engineer" should not be selected
    await expect(roleToSelectButton).toHaveClass(new RegExp(DEFAULT_BUTTON_CLASS));
    // And "Pilot" should be selected
    await expect(defaultSelectedButton).toHaveClass(new RegExp(SELECTED_BUTTON_CLASS));

    // Click on "Engineer"
    await roleToSelectButton.click();

    // Verify "Engineer" is now selected
    await expect(roleToSelectButton).toHaveClass(new RegExp(SELECTED_BUTTON_CLASS));
    // Verify "Pilot" is no longer selected
    await expect(defaultSelectedButton).toHaveClass(new RegExp(DEFAULT_BUTTON_CLASS));
  });

  test('NPC generation with selected role', async ({ page }) => {
    const roleToSelectValue = AVAILABLE_ROLES[4]; // "medic"
    const roleToSelectLabel = CAPITALIZED_AVAILABLE_ROLES[4]; // "Medic"
    const roleToSelectButton = page.getByRole('button', { name: roleToSelectLabel, exact: true });

    // Select "Medic"
    await roleToSelectButton.click();
    await expect(roleToSelectButton).toHaveClass(new RegExp(SELECTED_BUTTON_CLASS));

    // Click the "Generate NPC" button
    await page.getByRole('button', { name: 'Generate NPC' }).click();

    // Wait for NPC data to appear and assert occupation
    // The text for occupation is "Occupation: <Role>"
    const expectedOccupationText = `Occupation: ${roleToSelectLabel}`;
    // Using a locator that finds an element containing this text.
    // The ListItem component renders "Occupation: " and then the value in a span.
    // We'll look for the ListItem that contains the occupation.
    // A more specific locator might be needed if the structure is complex.
    // For now, page.getByText should work if the text is unique enough.
    await expect(page.getByText(expectedOccupationText)).toBeVisible();

    // Also check the name to be sure the mock with the correct role was used
    const expectedNameText = `Name: Test NPC ${roleToSelectValue}`;
    await expect(page.getByText(expectedNameText)).toBeVisible();
  });
});
