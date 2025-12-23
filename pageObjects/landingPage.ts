import { expect, Locator, type Page } from '@playwright/test';

export class LandingPage {
  protected page: Page;
  private storeLogo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.storeLogo = this.page.getByTitle('Automation Test Store');
  }

  async openLandingPage() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.storeLogo).toBeVisible();
  }
}
