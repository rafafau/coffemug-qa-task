import { expect, type Page } from '@playwright/test';

export class LandingPage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToLanding() {
    await this.page.goto('/');
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page.getByTitle('Automation Test Store')).toBeVisible();
  }
}
