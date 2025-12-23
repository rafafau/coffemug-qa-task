import { expect, type Page } from '@playwright/test';

export class ProductDetailsPage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkProductDetails(expectedDetails: {
    productName: string;
    price: string;
    model: string;
    manufacturer: string;
  }) {
    await expect(this.page.locator('h1')).toHaveText(expectedDetails.productName);
    await expect(this.page.locator('.productfilneprice')).toHaveText(expectedDetails.price);
    await expect(this.page.locator('li:has-text("Model")')).toHaveText(
      `Model: ${expectedDetails.model}`
    );
    await expect(this.page.getByTitle(expectedDetails.manufacturer)).toBeVisible();
  }

  async addToCart(quantity: number = 1) {
    await expect(this.page.getByRole('link', { name: 'Add to Cart' })).toBeVisible();
    await this.page.locator('#product_quantity').fill(quantity.toString());
    await this.page.getByRole('link', { name: 'Add to Cart' }).click();
    await expect(this.page.locator('h1')).toHaveText('Shopping Cart');
  }
}
