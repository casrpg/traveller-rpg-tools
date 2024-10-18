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
  await expect(page.locator(sizeLocator)).toHaveText('diameter: 16.000 Km, jump distance: 1.600.000 Km, jump rapid distance: 1.440.000, gravity: 1,4g , e.g.: Much more than Earth');  //maybe fixed???
  await expect(page.locator(atmosphereLocator)).toHaveText('Exotic');
  await expect(page.locator(hydrographicsLocator)).toHaveText('90% water');
  await expect(page.locator(populationLocator)).toHaveText('Millions');
  await expect(page.locator(governmentLocator)).toHaveText('Balkanization');
  await expect(page.locator(lawLevelLocator)).toHaveText('Level 1');
  await expect(page.locator(techLevelLocator)).toHaveText('TLNaN'); //TODO fix
});

