import { test } from '@playwright/test';
import { Ecomm } from '../pageObjects/ecomm';
import { CategoryType } from '../types/categoryType';

let ecomm: Ecomm;

test.beforeEach(async ({ page }) => {
  ecomm = new Ecomm(page);
  await ecomm.landing().openLandingPage();
});

test('Wyszukiwanie produktu, który nie istnieje', async () => {
  await ecomm.menu().performSearch('electronics');
  await ecomm.search().setSortAndFilter(CategoryType.Books);
  await ecomm.search().checkIsProductNonExistent();
});

test.afterEach(async ({ page }) => {
  await page.close();
});
