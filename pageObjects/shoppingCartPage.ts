import { expect, type Page } from '@playwright/test';

export class ShoppingCartPage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkShoppingCartItems(expectedTotal: string, expectedProducts: string[]) {
    await expect(this.page.locator('#totals_table')).toContainText(expectedTotal);
    for (const productName of expectedProducts) {
      await expect(
        this.page.locator('#cart').getByRole('link', { name: productName })
      ).toBeVisible();
    }
  }

  async removeProductFromCart(productName: string) {
    const productRow = this.page.getByRole('row').filter({
      has: this.page.getByRole('link', { name: productName }),
    });

    const requestPromise = this.page.waitForRequest(
      'https://automationteststore.com/index.php?rt=r/checkout/cart/recalc_totals'
    );
    await productRow.locator('.fa-trash-o').click();
    const request = await requestPromise;
    const response = await request.response();
    expect(response!.status()).toBe(200);
  }

  async checkCartIsEmpty() {
    await expect(this.page.getByText('Your shopping cart is empty!')).toBeVisible();
    await this.page.reload();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page.getByText('Your shopping cart is empty!')).toBeVisible();
  }

  async modifyProductQuantity(productName: string, newQuantity: string) {
    const productRow = this.page.getByRole('row').filter({
      has: this.page.getByRole('link', { name: productName }),
    });

    const quantityInput = productRow.locator('input[name^="quantity"]');
    await quantityInput.fill(newQuantity);
    const requestPromise = this.page.waitForRequest(
      'https://automationteststore.com/index.php?rt=r/checkout/cart/recalc_totals'
    );
    await this.page.locator('#cart_update').click();
    const request = await requestPromise;
    const response = await request.response();
    expect(response!.status()).toBe(200);
  }
}
