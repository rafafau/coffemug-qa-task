import { expect, Locator, type Page } from '@playwright/test';
import { CategoryType } from '../types/categoryType';
import { SortType } from '../types/sortType';

export class SearchPage {
  protected page: Page;
  searchButton: Locator;
  descriptionCheckbox: Locator;
  sortDropdown: Locator;
  categoryDropdown: Locator;
  productLink!: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchButton = this.page.getByRole('button', { name: ' Search' });
    this.descriptionCheckbox = this.page.getByRole('checkbox', {
      name: 'Search in product descriptions',
    });
    this.sortDropdown = this.page.locator('#sort');
    this.categoryDropdown = this.page.locator('#category_id');
  }

  async setSortAndFilter(category: CategoryType, sortOption?: SortType) {
    if (sortOption) await this.sortDropdown.selectOption(sortOption);
    await this.categoryDropdown.selectOption(category);
    await this.descriptionCheckbox.check();
    await this.searchButton.click();
  }

  async checkProductLinkVisible(productName: string) {
    this.setProductLink(productName);
    await expect(this.productLink).toBeVisible();
  }

  async checkProductVisible(productName: string, expectedPrice: string) {
    this.checkProductLinkVisible(productName);
    const productCard = this.page.locator('div.row > div').filter({ has: this.productLink });
    await expect(productCard.locator('.oneprice')).toHaveText(expectedPrice);
  }

  async checkIsProductNonExistent() {
    await expect(
      this.page.getByRole('heading', { name: 'Products meeting the search criteria' })
    ).toBeVisible();
    await expect(
      this.page.getByText('There is no product that matches the search criteria.')
    ).toBeVisible();
  }

  async goToProductDetails(productName: string) {
    await this.checkProductLinkVisible(productName);
    await this.productLink.click();
  }

  async goToCategoryMenu(menu: string, subMenu: string) {
    await this.page.locator('#categorymenu').getByRole('link', { name: menu }).hover();
    await this.page.locator('#categorymenu').getByRole('link', { name: subMenu }).click();
  }
  async goToMenFragranceSets() {
    await this.goToCategoryMenu('Men', 'Fragrance Sets');
  }

  private setProductLink(productName: string) {
    this.productLink = this.page.getByTitle(productName);
  }
}
