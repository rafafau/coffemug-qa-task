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

  private categoryMenu: Locator;
  private productsHeading: Locator;
  private noResultsMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchButton = this.page.getByRole('button', { name: ' Search' });
    this.descriptionCheckbox = this.page.getByRole('checkbox', {
      name: 'Search in product descriptions',
    });
    this.sortDropdown = this.page.locator('#sort');
    this.categoryDropdown = this.page.locator('#category_id');
    this.categoryMenu = this.page.locator('#categorymenu');
    this.productsHeading = this.page.getByRole('heading', {
      name: 'Products meeting the search criteria',
    });
    this.noResultsMessage = this.page.getByText(
      'There is no product that matches the search criteria.'
    );
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
    await expect(this.productsHeading).toBeVisible();
    await expect(this.noResultsMessage).toBeVisible();
  }

  async goToProductDetails(productName: string) {
    await this.checkProductLinkVisible(productName);
    await this.productLink.click();
  }

  async goToCategoryMenu(menu: string, subMenu: string) {
    await this.categoryMenu.getByRole('link', { name: menu }).hover();
    await this.categoryMenu.getByRole('link', { name: subMenu }).click();
  }
  async goToMenFragranceSets() {
    await this.goToCategoryMenu('Men', 'Fragrance Sets');
  }

  private setProductLink(productName: string) {
    this.productLink = this.page.getByTitle(productName);
  }
}
