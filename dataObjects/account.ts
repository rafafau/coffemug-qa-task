import { fakerPL } from '@faker-js/faker';
import { FormFieldInterface } from '../interfaces/FormFieldInterface';
import { AccountDataInterface } from '../interfaces/AccountDataInterface';

export class Account implements AccountDataInterface {
  firstName: string = fakerPL.person.firstName();
  lastName: string = fakerPL.person.lastName();
  email: string = fakerPL.internet.email();
  telephone: string = fakerPL.phone.number();
  fax: string = fakerPL.phone.number();
  company: string = fakerPL.company.name();
  address1: string = fakerPL.location.streetAddress();
  address2: string = fakerPL.location.secondaryAddress();
  city: string = fakerPL.location.city();
  country: string = 'Poland';
  zone: string = fakerPL.helpers.arrayElement([
    'Dolnoslaskie',
    'Mazowieckie',
    'Zachodniopomorskie',
  ]);
  postcode: string = fakerPL.location.zipCode();
  loginname: string = fakerPL.internet.username();
  password: string = fakerPL.internet.password();
  newsletter: boolean = true;
  agree: boolean = true;

  constructor(customData?: Partial<AccountDataInterface>) {
    if (customData) Object.assign(this, customData);
  }

  get formFields(): FormFieldInterface[] {
    return [
      { locator: '#AccountFrm_firstname', type: 'textInput', value: this.firstName },
      { locator: '#AccountFrm_lastname', type: 'textInput', value: this.lastName },
      { locator: '#AccountFrm_email', type: 'textInput', value: this.email },
      { locator: '#AccountFrm_telephone', type: 'textInput', value: this.telephone },
      { locator: '#AccountFrm_fax', type: 'textInput', value: this.fax },
      { locator: '#AccountFrm_company', type: 'textInput', value: this.company },
      { locator: '#AccountFrm_address_1', type: 'textInput', value: this.address1 },
      { locator: '#AccountFrm_address_2', type: 'textInput', value: this.address2 },
      { locator: '#AccountFrm_city', type: 'textInput', value: this.city },
      { locator: '#AccountFrm_country_id', type: 'select', label: this.country },
      { locator: '#AccountFrm_zone_id', type: 'select', label: this.zone },
      { locator: '#AccountFrm_postcode', type: 'textInput', value: this.postcode },
      { locator: '#AccountFrm_loginname', type: 'textInput', value: this.loginname },
      { locator: '#AccountFrm_password', type: 'textInput', value: this.password },
      { locator: '#AccountFrm_confirm', type: 'textInput', value: this.password },
      { locator: '#AccountFrm_newsletter1', type: 'checkbox', value: this.newsletter },
      { locator: '#AccountFrm_agree', type: 'checkbox', value: this.agree },
    ];
  }

  get addressBookData(): Partial<AccountDataInterface> {
    const { firstName, lastName, company, address1, address2, city, country, zone, postcode } =
      this;
    return { firstName, lastName, company, address1, address2, city, country, zone, postcode };
  }
}
