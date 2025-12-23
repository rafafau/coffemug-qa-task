import { expect, Locator, type Page } from '@playwright/test';
import * as dotenv from 'dotenv';

export class LoginPage {
  protected page: Page;
  private loginForm: Locator;
  private loginNameInput: Locator;
  private passwordInput: Locator;
  private loginButton: Locator;
  private mainContainer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginForm = this.page.locator('#loginFrm');
    this.loginNameInput = this.page.locator('#loginFrm_loginname');
    this.passwordInput = this.page.locator('#loginFrm_password');
    this.loginButton = this.page.getByRole('button', { name: 'Login' });
    this.mainContainer = this.page.locator('#maincontainer');
  }

  async loginToPanel() {
    if (!process.env.CI) {
      dotenv.config();
    }
    await expect(this.loginForm).toBeVisible();
    await this.loginNameInput.fill(process.env.LOGIN!);
    await this.passwordInput.fill(process.env.PASSWORD!);

    const requestPromise = this.page.waitForRequest('/index.php?rt=account/login');
    await this.loginButton.click();
    const request = await requestPromise;
    const response = await request.response();
    expect(response).not.toBeNull();
    expect(response!.status()).toBe(302);
  }

  async checkUserIsLoggedIn() {
    await expect(this.mainContainer.getByText(process.env.USERNAME!)).toBeVisible();
    await this.page.reload();
    await this.page.waitForLoadState('domcontentloaded');
    await expect(this.mainContainer.getByText(process.env.USERNAME!)).toBeVisible();
  }
}
