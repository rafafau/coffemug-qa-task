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
}
