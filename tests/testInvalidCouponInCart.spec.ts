import { test } from '@playwright/test';
import { Ecomm } from '../pageObjects/ecomm';
import { productCard } from '../dataObjects/productCard';

let ecomm: Ecomm;
const perfume = new productCard();
const shippingCost = 2.0;
const expectedTotal = Number(perfume.price.replace('$', '')) + shippingCost;

test.beforeEach(async ({ page }) => {
  ecomm = new Ecomm(page);
  await ecomm.landing().openLandingPage();
  await ecomm.menu().performSearch(perfume.productName);
});

test('Próba dodania nieprawidłowego kuponu do koszyka', async () => {
  await ecomm.search().goToProductDetails(perfume.productName);
  await ecomm.productDetails().addToCart();
  await ecomm.shoppingCart().applyCouponCode('INVALIDCOUPON');
  await ecomm
    .shoppingCart()
    .verifyInvalidCouponMessage(`$${expectedTotal.toFixed(2)}`, [perfume.productName]);
});

test.afterEach(async ({ page }) => {
  await page.close();
});
