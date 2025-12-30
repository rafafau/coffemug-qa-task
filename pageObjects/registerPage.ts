import { expect, Locator, type Page } from '@playwright/test';
import { Account } from '../dataObjects/account';

export class RegisterPage {
  protected page: Page;
  submitButton: Locator;
  private accountForm: Locator;
  private personalDetailsText: Locator;
  private errorInput: Locator;
  private helpBlock: Locator;

  constructor(page: Page) {
    this.page = page;
    this.submitButton = this.page.getByRole('button', { name: 'Continue' });
    this.accountForm = this.page.locator('#accountFrm');
    this.personalDetailsText = this.page.getByText('Your Personal Details');
    this.errorInput = this.page.locator('div.has-error input');
    this.helpBlock = this.page.locator('.help-block');
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
    await expect(this.accountForm).toBeVisible();
    await this.submitButton.click();
    await expect(this.personalDetailsText).toBeVisible();
  }

  protected async fillRegistrationForm(account: Account) {
    for (const field of account.formFields) {
      const locator = this.page.locator(field.locator);

      if (field.type === 'textInput') {
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
    await expect(this.errorInput.first()).toBeVisible();
    await expect(this.helpBlock.filter({ hasText: errorMessage })).toBeVisible();
  }

  protected async submitRegistrationForm() {
    const requestPromise = this.page.waitForRequest('/index.php?rt=account/create');
    await this.submitButton.click();
    const request = await requestPromise;
    const response = await request.response();
    expect(response).not.toBeNull();
    expect(response!.status()).toBe(302);
  }
}
