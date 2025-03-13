import { test, expect } from '@playwright/test';

const nameLocator = '[data-test-id="name"]'
const astroportLocator = '[data-test-id="astroport"]'
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
  await page.getByPlaceholder('Enter planet code').fill('AA7294718');
  await page.getByRole('button', { name: 'Decode Planet' }).click();
  await expect(page.locator(nameLocator)).toHaveText('Planet AA7294718');
  await expect(page.locator(astroportLocator)).toHaveText('quality: Excelent, docking price: 1D x 1.000 Cr, fuel: Refined, services: Repairs and all shipyard');
  await expect(page.locator(sizeLocator)).toHaveText('diameter: 16.000 Km');
  await expect(page.locator(atmosphereLocator)).toHaveText('Standard / Tainted');
  await expect(page.locator(hydrographicsLocator)).toHaveText('90% water');
  await expect(page.locator(populationLocator)).toHaveText('Millions');
  await expect(page.locator(governmentLocator)).toHaveText('Balkanization');
  await expect(page.locator(lawLevelLocator)).toHaveText('Level 1');
  await expect(page.locator(techLevelLocator)).toHaveText('TL8');
});

