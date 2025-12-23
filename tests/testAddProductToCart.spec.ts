import { test } from '@playwright/test';
import { Ecomm } from '../pageObjects/ecomm';
import { productCard } from '../dataObjects/productCard';

let ecomm: Ecomm;
const perfume = new productCard();
const quantity = 3;
const shippingCost = 2.0;
const expectedTotal = Number(perfume.price.replace('$', '')) * quantity + shippingCost;

test.beforeEach(async ({ page }) => {
  ecomm = new Ecomm(page);
  await ecomm.landing().openLandingPage();
  await ecomm.menu().performSearch(perfume.productName);
});

test('Dodanie produktu do koszyka', async () => {
  await ecomm.search().goToProductDetails(perfume.productName);
  await ecomm.productDetails().addToCart(quantity);
  await ecomm
    .shoppingCart()
    .checkShoppingCartItems(`$${expectedTotal.toFixed(2)}`, [perfume.productName]);
});

test.afterEach(async ({ page }) => {
  await page.close();
});
