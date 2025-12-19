import { expect, Locator, type Page } from '@playwright/test';
import { Account } from '../dataObjects/account';

export class RegisterPage {
  protected page: Page;
  submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.submitButton = this.page.getByRole('button', { name: 'Continue' });
  }

  async registerNewAccount(account: Account) {
    await this.goToRegistrationForm();
    await this.fillRegistrationForm(account);
    await this.submitRegistrationForm();
  }

  async registerNewAccountWithErrors(account: Account) {
    await this.goToRegistrationForm();
    await this.fillRegistrationForm(account);
    await this.submitButton.click();
  }

  protected async goToRegistrationForm() {
    await expect(this.page.locator('#accountFrm')).toBeVisible();
    await this.submitButton.click();
    await expect(this.page.getByText('Your Personal Details')).toBeVisible();
  }

  protected async fillRegistrationForm(account: Account) {
    for (const field of account.formFields) {
      const locator = this.page.locator(field.locator);

      if (field.type === 'textinput') {
        await locator.fill(field.value as string);
      } else if (field.type === 'select') {
        if (field.label) {
          await locator.selectOption({ label: field.label as string });
        }
      } else if (field.type === 'checkbox') {
        if (field.value) {
          await locator.check();
        }
      }
    }
  }

  async checkValidationError(errorMessage: string) {
    await expect(this.page.locator('div.has-error input').first()).toBeVisible();
    await expect(this.page.locator('.help-block', { hasText: errorMessage })).toBeVisible();
  }

  protected async submitRegistrationForm() {
    const requestPromise = this.page.waitForRequest(
      'https://automationteststore.com/index.php?rt=account/create'
    );
    await this.submitButton.click();
    const request = await requestPromise;
    const response = await request.response();
    expect(response).not.toBeNull();
    expect(response!.status()).toBe(302);
  }
}
