import { expect, Locator, type Page } from '@playwright/test';

export class ProductDetailsPage {
  protected page: Page;
  private productTitle: Locator;
  private productPrice: Locator;
  private productModel: Locator;
  private productQuantity: Locator;
  private addToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productTitle = this.page.locator('h1');
    this.productPrice = this.page.locator('.productfilneprice');
    this.productModel = this.page.locator('li:has-text("Model")');
    this.productQuantity = this.page.locator('#product_quantity');
    this.addToCartButton = this.page.getByRole('link', { name: 'Add to Cart' });
  }

  async checkProductDetails(expectedDetails: {
    productName: string;
    price: string;
    model: string;
    manufacturer: string;
  }) {
    await expect(this.productTitle).toHaveText(expectedDetails.productName);
    await expect(this.productPrice).toHaveText(expectedDetails.price);
    await expect(this.productModel).toHaveText(`Model: ${expectedDetails.model}`);
    await expect(this.page.getByTitle(expectedDetails.manufacturer)).toBeVisible();
  }

  async addToCart(quantity: number = 1) {
    await expect(this.addToCartButton).toBeVisible();
    await this.productQuantity.fill(quantity.toString());
    await this.addToCartButton.click();
    await expect(this.productTitle).toHaveText('Shopping Cart');
  }
}
