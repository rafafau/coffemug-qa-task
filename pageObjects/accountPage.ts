import { expect, Locator, type Page } from '@playwright/test';
import { Account } from '../dataObjects/account';

export class AccountPage {
  protected page: Page;
  addressSection: Locator;
  private successMessage: Locator;
  private manageAddressLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addressSection = this.page.locator('.contentpanel');
    this.successMessage = this.page.getByText('Your Account Has Been Created!');
    this.manageAddressLink = this.page.getByRole('link', { name: 'Manage Address Book' });
  }

  async checkAccountAddressBook(account: Account) {
    await expect(this.successMessage).toBeVisible();
    await this.manageAddressLink.click();

    for (const value of Object.values(account.addressBookData)) {
      if (value) {
        await expect(
          this.addressSection.getByText(value as string, { exact: false })
        ).toBeVisible();
      }
    }
  }
}
