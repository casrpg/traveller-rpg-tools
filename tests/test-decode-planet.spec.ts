import { test, expect } from '@playwright/test';

const nameLocator = '[data-test-id="name"]'
const sizeLocator = '[data-test-id="size"]'
const atmosphereLocator = '[data-test-id="atmosphere"]'
const hydrographicsLocator = '[data-test-id="hydrographics"]'
const populationLocator = '[data-test-id="population"]'
const governmentLocator = '[data-test-id="government"]'
const lawLevelLocator = '[data-test-id="lawLevel"]'
const techLevelLocator = '[data-test-id="techLevel"]'

test('test decode planet', async ({ page }) => {
  await page.goto('http://localhost:8080/');
  await page.getByRole('link', { name: 'Planet Decoder' }).click();
  await page.getByPlaceholder('Enter planet code').click();
  await page.getByPlaceholder('Enter planet code').fill('A7294718');
  await page.getByRole('button', { name: 'Decode Planet' }).click();
  await expect(page.locator(nameLocator)).toHaveText('Planet A7294718');
  await expect(page.locator(sizeLocator)).toHaveText('Size: Unknown'); //TODO fix
  await expect(page.locator(atmosphereLocator)).toHaveText('Atmosphere: Exotic');
  await expect(page.locator(hydrographicsLocator)).toHaveText('Hydrographics: 90% water');
  await expect(page.locator(populationLocator)).toHaveText('Population: Millions');
  await expect(page.locator(governmentLocator)).toHaveText('Government: Balkanization');
  await expect(page.locator(lawLevelLocator)).toHaveText('Law Level: Level 1');
  await expect(page.locator(techLevelLocator)).toHaveText('Tech Level: TLNaN'); //TODO fix
});

