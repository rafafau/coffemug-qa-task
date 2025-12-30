import { expect, Locator, type Page } from '@playwright/test';

export class MenuPage {
  protected page: Page;
  protected topNavMenu: Locator;
  protected searchInput: Locator;
  protected loginForm: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topNavMenu = this.page.locator('#topnav');
    this.searchInput = this.page.getByRole('textbox', { name: 'Search Keywords' });
    this.loginForm = this.page.locator('#loginFrm');
  }

  async goToLogin() {
    await expect(async () => {
      await this.menuItem('Account').hover();
      await expect(this.menuItem('Login')).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 10000 });
    await this.menuItem('Login').click();
    await expect(this.loginForm).toBeVisible();
  }
  async logoutUser() {
    await this.menuItem('Account').hover();
    await expect(this.menuItem('Logout')).toBeVisible();
    await this.menuItem('Logout').click();
  }

  async checkUserIsLoggedOut() {
    await expect(
      this.page.getByText(
        'You have been logged off your account. It is now safe to leave the computer.'
      )
    ).toBeVisible();
    await this.goToLogin();
  }

  async performSearch(keyword: string) {
    await this.searchInput.click();
    await this.searchInput.fill(keyword);
    await this.searchInput.press('Enter');
  }

  menuItem(name: string): Locator {
    return this.topNavMenu.getByRole('link', { name });
  }
}
