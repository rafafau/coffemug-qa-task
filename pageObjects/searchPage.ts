import { expect, Locator, type Page } from '@playwright/test';

export class SearchPage {
  protected page: Page;
  searchInput: Locator;
  searchButton: Locator;
  descriptionCheckbox: Locator;
  sortDropdown: Locator;
  categoryDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = this.page.getByRole('textbox', { name: 'Search Keywords' });
    this.searchButton = this.page.getByRole('button', { name: ' Search' });
    this.descriptionCheckbox = this.page.getByRole('checkbox', {
      name: 'Search in product descriptions',
    });
    this.sortDropdown = this.page.locator('#sort');
    this.categoryDropdown = this.page.locator('#category_id');
  }

  async performSearch(keyword: string) {
    await this.searchInput.click();
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
  }

  async setSortAndFilter(sortOption: string, categoryId: string) {
    await this.sortDropdown.selectOption(sortOption);
    await this.categoryDropdown.selectOption(categoryId);
    await this.descriptionCheckbox.check();
    await this.searchButton.click();
  }

  async checkProductVisible(productName: string, expectedPrice: string) {
    const productLink = this.page.getByTitle(productName);
    await expect(productLink).toBeVisible();
    const productCard = this.page.locator('div.row > div').filter({ has: productLink });
    await expect(productCard.locator('.oneprice')).toHaveText(expectedPrice);
  }
}
