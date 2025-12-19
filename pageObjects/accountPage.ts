import { expect, Locator, type Page } from '@playwright/test';
import { Account } from '../dataObjects/account';

export class AccountPage {
  protected page: Page;
  addressSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addressSection = this.page.locator('.contentpanel');
  }

  async checkAccountAddressBook(account: Account) {
    await expect(this.page.getByText('Your Account Has Been Created!')).toBeVisible();
    await this.page.getByRole('link', { name: 'Manage Address Book' }).click();

    for (const value of Object.values(account.addressBookData)) {
      if (value) {
        await expect(
          this.addressSection.getByText(value as string, { exact: false })
        ).toBeVisible();
      }
    }
  }
}
