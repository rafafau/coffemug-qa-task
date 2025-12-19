import { expect, Locator, type Page } from '@playwright/test';

export class MenuPage {
  protected page: Page;
  protected topNavMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.topNavMenu = this.page.locator('#topnav');
  }

  async goToLogin() {
    await expect(async () => {
      await this.topNavMenu
        .getByTestId('menu_account')
        .getByRole('link', { name: 'Account' })
        .hover();
      await expect(this.topNavMenu.getByTestId('menu_login')).toBeVisible({ timeout: 1000 });
    }).toPass({ timeout: 10000 });
    await this.topNavMenu.getByTestId('menu_login').getByRole('link', { name: 'Login' }).click();
    await expect(this.page.locator('#loginFrm')).toBeVisible();
  }
  async logoutUser() {
    await this.topNavMenu
      .getByTestId('menu_account')
      .getByRole('link', { name: 'Account' })
      .hover();
    await expect(this.topNavMenu.getByTestId('menu_logout')).toBeVisible();
    await this.topNavMenu.getByTestId('menu_logout').getByRole('link', { name: 'Logout' }).click();
    await expect(
      this.page.getByText(
        'You have been logged off your account. It is now safe to leave the computer.'
      )
    ).toBeVisible();
    await this.page.close();
  }
}
