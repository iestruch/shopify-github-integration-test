import 'dotenv/config'
import { test, expect } from '@playwright/test';

// You need to create an env file.
const SHOP_URL = process.env.E2E_SHOP_URL;
const SHOP_PASS = process.env.E2E_SHOP_PASS;

test('Access test', async ({ page }) => {
  if (!SHOP_URL || !SHOP_PASS) return
  await page.goto(SHOP_URL);
  // Click input[name="password"]
  await page.locator('input[name="password"]').click();
  // Fill input[name="password"]
  await page.locator('input[name="password"]').fill(SHOP_PASS);
  // Press enter
  await page.keyboard.press("Enter"); 

  await expect(await page.locator('[id*=__rich_text] .rich-text__heading span')).toHaveText('Talk about your brand');
});