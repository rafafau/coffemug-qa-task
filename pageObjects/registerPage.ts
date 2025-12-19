import { fakerPL } from '@faker-js/faker';
import { expect, type Page } from '@playwright/test';

export class RegisterPage {
  protected page: Page;
  private address1: string = '';
  private address2: string = '';
  private city: string = '';
  private zone: string = '';
  private postcode: string = '';
  private country: string = 'Poland';

  constructor(page: Page) {
    this.page = page;
  }

  async registerNewAccount() {
    await expect(this.page.locator('#accountFrm')).toBeVisible();
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await expect(this.page.getByText('Your Personal Details')).toBeVisible();
    await this.page.locator('#AccountFrm_firstname').fill(fakerPL.person.firstName());
    await this.page.locator('#AccountFrm_lastname').fill(fakerPL.person.lastName());
    await this.page.locator('#AccountFrm_email').fill(fakerPL.internet.email());
    await this.page.locator('#AccountFrm_telephone').fill(fakerPL.phone.number());
    await this.page.locator('#AccountFrm_fax').fill(fakerPL.phone.number());
    await this.page.locator('#AccountFrm_company').fill(fakerPL.company.name());
    this.address1 = fakerPL.location.streetAddress();
    this.address2 = fakerPL.location.secondaryAddress();
    this.city = fakerPL.location.city();
    this.zone = fakerPL.helpers.arrayElement(['Dolnoslaskie', 'Mazowieckie', 'Zachodniopomorskie']);
    this.postcode = fakerPL.location.zipCode();
    await this.page.locator('#AccountFrm_address_1').fill(this.address1);
    await this.page.locator('#AccountFrm_address_2').fill(this.address2);
    await this.page.locator('#AccountFrm_city').fill(this.city);
    await this.page.locator('#AccountFrm_country_id').selectOption({ label: this.country });
    await this.page.locator('#AccountFrm_zone_id').selectOption({ label: this.zone });
    await this.page.locator('#AccountFrm_postcode').fill(this.postcode);
    await this.page.locator('#AccountFrm_loginname').fill(fakerPL.internet.username());
    const randomPassword = fakerPL.internet.password();
    await this.page.locator('#AccountFrm_password').fill(randomPassword);
    await this.page.locator('#AccountFrm_confirm').fill(randomPassword);
    await this.page.locator('#AccountFrm_newsletter1').check();
    await this.page.locator('#AccountFrm_agree').check();

    const requestPromise = this.page.waitForRequest(
      'https://automationteststore.com/index.php?rt=account/create'
    );
    await this.page.getByRole('button', { name: 'Continue' }).click();
    const request = await requestPromise;
    const response = await request.response();
    expect(response).not.toBeNull();
    expect(response!.status()).toBe(302);
  }

  async checkRegisteredAccount() {
    await expect(this.page.getByText('Your Account Has Been Created!')).toBeVisible();
    await this.page.getByRole('link', { name: 'Manage Address Book' }).click();

    await expect(this.page.getByText(this.address1)).toBeVisible();
    await expect(this.page.getByText(this.address2)).toBeVisible();
    await expect(this.page.getByText(this.city)).toBeVisible();
    await expect(this.page.getByText(this.zone)).toBeVisible();
    await expect(this.page.getByText(this.postcode)).toBeVisible();
    await expect(this.page.getByText(this.country)).toBeVisible();
  }
}
