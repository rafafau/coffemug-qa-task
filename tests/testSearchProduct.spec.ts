import { test } from '@playwright/test';
import { Ecomm } from '../pageObjects/ecomm';
import { productCard } from '../dataObjects/productCard';

let ecomm: Ecomm;
const perfume = new productCard();

test.beforeEach(async ({ page }) => {
  ecomm = new Ecomm(page);
  await ecomm.landing().openLandingPage();
});

test('Wyszukiwanie perfum z filtrowaniem i sortowaniem', async () => {
  await ecomm.search().performSearch(perfume.keyword);
  await ecomm.search().setSortAndFilter(perfume.sortOption, perfume.categoryId);
  await ecomm.search().checkProductVisible(perfume.productName, perfume.price);
});

test.afterEach(async ({ page }) => {
  await page.close();
});
