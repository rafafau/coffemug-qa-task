import { test } from '@playwright/test';
import { Ecomm } from '../pageObjects/ecomm';
import { productCard } from '../dataObjects/productCard';

let ecomm: Ecomm;
const perfume = new productCard();
const quantity = 4;
const shippingCost = 2.0;
const expectedTotal = Number(perfume.price.replace('$', '')) * quantity + shippingCost;

test.beforeEach(async ({ page }) => {
  ecomm = new Ecomm(page);
  await ecomm.landing().openLandingPage();
  await ecomm.menu().performSearch(perfume.productName);
  await ecomm.search().goToProductDetails(perfume.productName);
});

test('Modyfikacja ilości produktu w koszyku', async () => {
  await ecomm.productDetails().addToCart();
  await ecomm.shoppingCart().modifyProductQuantity(perfume.productName, quantity.toString());
  await ecomm
    .shoppingCart()
    .checkShoppingCartItems(`$${expectedTotal.toFixed(2)}`, [perfume.productName]);
});

test.afterEach(async ({ page }) => {
  await page.close();
});
