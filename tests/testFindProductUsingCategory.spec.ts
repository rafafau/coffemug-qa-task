import { test } from '@playwright/test';
import { Ecomm } from '../pageObjects/ecomm';
import { productCard } from '../dataObjects/productCard';

let ecomm: Ecomm;
const perfume = new productCard();

test.beforeEach(async ({ page }) => {
  ecomm = new Ecomm(page);
  await ecomm.landing().openLandingPage();
});

test('Wyszukiwanie męskich perfum uzywajac kategorii', async () => {
  await ecomm.search().goToMenFragranceSets();
  await ecomm.search().goToProductDetails(perfume.productName);
  await ecomm.productDetails().checkProductDetails(perfume.productDetails);
});

test.afterEach(async ({ page }) => {
  await page.close();
});
