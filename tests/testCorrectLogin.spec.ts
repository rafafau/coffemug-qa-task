import { test } from '@playwright/test';
import { Ecomm } from '../pageObjects/ecomm';

let ecomm: Ecomm;

test.beforeEach(async ({ page }) => {
  ecomm = new Ecomm(page);
  await ecomm.landing().goToLanding();
});

test('Poprawne zalogowanie do sklepu', async () => {
  await ecomm.menu().goToLogin();
  await ecomm.login().loginToPanel();
  await ecomm.login().checkPassLogin();
});

test.afterEach(async () => {
  await ecomm.menu().logoutUser();
});
