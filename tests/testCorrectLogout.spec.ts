import { test } from '@playwright/test';
import { Ecomm } from '../pageObjects/ecomm';

let ecomm: Ecomm;

test.beforeEach(async ({ page }) => {
  ecomm = new Ecomm(page);
  await ecomm.landing().openLandingPage();
  await ecomm.menu().goToLogin();
});

test('Poprawne wylogowanie ze sklepu', async () => {
  await ecomm.login().loginToPanel();
  await ecomm.menu().logoutUser();
  await ecomm.menu().checkUserIsLoggedOut();
});

test.afterEach(async ({ page }) => {
  await page.close();
});
