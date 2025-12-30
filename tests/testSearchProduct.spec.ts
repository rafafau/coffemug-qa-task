import { test } from '@playwright/test';
import { Ecomm } from '../pageObjects/ecomm';
import { productCard } from '../dataObjects/productCard';
import { CategoryType } from '../types/categoryType';
import { SortType } from '../types/sortType';

let ecomm: Ecomm;
const perfume = new productCard();

test.beforeEach(async ({ page }) => {
  ecomm = new Ecomm(page);
  await ecomm.landing().openLandingPage();
});

test('Wyszukiwanie perfum z filtrowaniem i sortowaniem', async () => {
  await ecomm.menu().performSearch('perfume');
  await ecomm.search().setSortAndFilter(CategoryType.Men, SortType.PriceLowToHigh);
  await ecomm.search().checkProductVisible(perfume.productName, perfume.price);
});

test.afterEach(async ({ page }) => {
  await page.close();
});
