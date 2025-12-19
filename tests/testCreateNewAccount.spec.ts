import { test } from '@playwright/test';
import { Ecomm } from '../pageObjects/ecomm';


let ecomm: Ecomm

test.beforeEach(async ({ page }) => {
  ecomm = new Ecomm(page);
  await ecomm.landing().goToLanding();
})

test('Poprawne zarejestrowanie nowego uzytkownika', async () => {
  await ecomm.menu().goToLogin();
  await ecomm.register().registerNewAccount();
  // await ecomm.login().checkPassLogin();
});

test.afterEach(async () => {
  // await ecomm.menu().logoutUser();
});