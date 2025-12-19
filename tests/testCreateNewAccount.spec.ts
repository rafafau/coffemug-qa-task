import { test } from '@playwright/test';
import { Ecomm } from '../pageObjects/ecomm';
import { Account } from '../dataObjects/account';

let ecomm: Ecomm;
const account = new Account();

test.beforeEach(async ({ page }) => {
  ecomm = new Ecomm(page);
  await ecomm.landing().openLandingPage();
});

test('Poprawne zarejestrowanie nowego użytkownika', async () => {
  await ecomm.menu().goToLogin();
  await ecomm.register().registerNewAccount(account);
  await ecomm.account().checkAccountAddressBook(account);
});

test.afterEach(async () => {
  await ecomm.menu().logoutUser();
});
