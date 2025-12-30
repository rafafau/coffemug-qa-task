import { expect, Locator, type Page } from '@playwright/test';

export class ShoppingCartPage {
  protected page: Page;
  private totalsTable: Locator;
  private cart: Locator;
  private emptyCartMessage: Locator;
  private cartUpdateButton: Locator;
  private couponInput: Locator;
  private applyCouponButton: Locator;
  private errorAlert: Locator;

  constructor(page: Page) {
    this.page = page;
    this.totalsTable = this.page.locator('#totals_table');
    this.cart = this.page.locator('#cart');
    this.emptyCartMessage = this.page.getByText('Your shopping cart is empty!');
    this.cartUpdateButton = this.page.locator('#cart_update');
    this.couponInput = this.page.locator('#coupon_coupon');
    this.applyCouponButton = this.page.getByTitle('Apply Coupon');
    this.errorAlert = this.page.locator('.alert-danger');
  }

  async checkShoppingCartItems(expectedTotal: string, expectedProducts: string[]) {
    await expect(this.totalsTable).toContainText(expectedTotal);
    for (const productName of expectedProducts) {
      await expect(this.cart.getByRole('link', { name: productName })).toBeVisible();
    }
  }

  async removeProductFromCart(productName: string) {
    const productRow = this.page.getByRole('row').filter({
      has: this.page.getByRole('link', { name: productName }),
    });

    const requestPromise = this.page.waitForRequest('/index.php?rt=r/checkout/cart/recalc_totals');
    await productRow.locator('.fa-trash-o').click();
    const request = await requestPromise;
    const response = await request.response();
    expect(response?.status()).toBe(200);
  }

  async checkCartIsEmpty() {
    await expect(this.emptyCartMessage).toBeVisible();
    await this.page.reload();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.emptyCartMessage).toBeVisible();
  }

  async modifyProductQuantity(productName: string, newQuantity: string) {
    const productRow = this.page.getByRole('row').filter({
      has: this.page.getByRole('link', { name: productName }),
    });

    const quantityInput = productRow.locator('input[name^="quantity"]');
    await quantityInput.fill(newQuantity);
    const requestPromise = this.page.waitForRequest('/index.php?rt=r/checkout/cart/recalc_totals');
    await this.cartUpdateButton.click();
    const request = await requestPromise;
    const response = await request.response();
    expect(response?.status()).toBe(200);
  }
  async applyCouponCode(couponCode: string) {
    await this.couponInput.fill(couponCode);
    await this.applyCouponButton.click();
    await this.page.waitForLoadState('domcontentloaded');
  }

  async verifyInvalidCouponMessage(expectedTotal: string, expectedProducts: string[]) {
    await expect(
      this.errorAlert.filter({
        hasText: "Error: Coupon is either invalid, expired or reached it's usage limit!",
      })
    ).toBeVisible();
    await this.checkShoppingCartItems(expectedTotal, expectedProducts);
  }
}
