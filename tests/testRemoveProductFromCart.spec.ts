import { test } from '@playwright/test';
import { Ecomm } from '../pageObjects/ecomm';
import { productCard } from '../dataObjects/productCard';

let ecomm: Ecomm;
const perfume = new productCard();

test.beforeEach(async ({ page }) => {
  ecomm = new Ecomm(page);
  await ecomm.landing().openLandingPage();
  await ecomm.menu().performSearch(perfume.productName);
  await ecomm.search().goToProductDetails(perfume.productName);
});

test('Usunięcie produktu z koszyka', async () => {
  await ecomm.productDetails().addToCart();
  await ecomm.shoppingCart().removeProductFromCart(perfume.productName);
  await ecomm.shoppingCart().checkCartIsEmpty();
});

test.afterEach(async ({ page }) => {
  await page.close();
});
