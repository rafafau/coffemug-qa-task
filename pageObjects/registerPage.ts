import { expect, type Page } from '@playwright/test';
import { Account } from '../dataObjects/account';

export class RegisterPage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async registerNewAccount(account: Account) {
    await this.goToRegistrationForm();
    await this.fillRegistrationForm(account);
    await this.submitRegistrationForm();
  }

  protected async goToRegistrationForm() {
    await expect(this.page.locator('#accountFrm')).toBeVisible();
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await expect(this.page.getByText('Your Personal Details')).toBeVisible();
  }

  protected async fillRegistrationForm(account: Account) {
    for (const field of account.formFields) {
      const locator = this.page.locator(field.locator);

      if (field.type === 'textinput') {
        await locator.fill(field.value as string);
      } else if (field.type === 'select') {
        await locator.selectOption({ label: field.label as string });
      } else if (field.type === 'checkbox') {
        if (field.value) {
          await locator.check();
        }
      }
    }
  }

  protected async submitRegistrationForm() {
    const requestPromise = this.page.waitForRequest(
      'https://automationteststore.com/index.php?rt=account/create'
    );
    await this.page.getByRole('button', { name: 'Continue' }).click();
    const request = await requestPromise;
    const response = await request.response();
    expect(response).not.toBeNull();
    expect(response!.status()).toBe(302);
  }
}
