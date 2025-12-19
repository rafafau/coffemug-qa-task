import { expect, type Page } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

export class LoginPage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async loginToPanel() {
    await expect(this.page.locator('#loginFrm')).toBeVisible();
    await this.page.locator('#loginFrm_loginname').fill(process.env.LOGIN!);
    await this.page.locator('#loginFrm_password').fill(process.env.PASSWORD!);

    const requestPromise = this.page.waitForRequest(
      'https://automationteststore.com/index.php?rt=account/login'
    );
    await this.page.getByRole('button', { name: 'Login' }).click();
    const request = await requestPromise;
    const response = await request.response();
    expect(response).not.toBeNull();
    expect(response!.status()).toBe(302);
  }

  async checkPassLogin() {
    await expect(this.page.locator('#maincontainer').getByText('Rafal')).toBeVisible();
    await this.page.reload();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.page.locator('#maincontainer').getByText('Rafal')).toBeVisible();
  }
}
