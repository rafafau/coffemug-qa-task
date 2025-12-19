import { fakerPL } from '@faker-js/faker';
import { FormFieldInterface } from '../interfaces/FormFieldInterface';
import { AccountDataInterface } from '../interfaces/AccountDataInterface';

export class Account implements AccountDataInterface {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  fax: string;
  company: string;
  address1: string;
  address2: string;
  city: string;
  country: string;
  zone: string;
  postcode: string;
  loginname: string;
  password: string;
  newsletter: boolean;
  agree: boolean;

  constructor(customData?: Partial<AccountDataInterface>) {
    const defaultData: AccountDataInterface = {
      firstName: fakerPL.person.firstName(),
      lastName: fakerPL.person.lastName(),
      email: fakerPL.internet.email(),
      telephone: fakerPL.phone.number(),
      fax: fakerPL.phone.number(),
      company: fakerPL.company.name(),
      address1: fakerPL.location.streetAddress(),
      address2: fakerPL.location.secondaryAddress(),
      city: fakerPL.location.city(),
      country: 'Poland',
      zone: fakerPL.helpers.arrayElement(['Dolnoslaskie', 'Mazowieckie', 'Zachodniopomorskie']),
      postcode: fakerPL.location.zipCode(),
      loginname: fakerPL.internet.username(),
      password: fakerPL.internet.password(),
      newsletter: true,
      agree: true,
    };

    const mergedData = { ...defaultData, ...customData };

    this.firstName = mergedData.firstName;
    this.lastName = mergedData.lastName;
    this.email = mergedData.email;
    this.telephone = mergedData.telephone;
    this.fax = mergedData.fax;
    this.company = mergedData.company;
    this.address1 = mergedData.address1;
    this.address2 = mergedData.address2;
    this.city = mergedData.city;
    this.country = mergedData.country;
    this.zone = mergedData.zone;
    this.postcode = mergedData.postcode;
    this.loginname = mergedData.loginname;
    this.password = mergedData.password;
    this.newsletter = mergedData.newsletter;
    this.agree = mergedData.agree;
  }

  get formFields(): FormFieldInterface[] {
    return [
      { locator: '#AccountFrm_firstname', type: 'textinput', value: this.firstName },
      { locator: '#AccountFrm_lastname', type: 'textinput', value: this.lastName },
      { locator: '#AccountFrm_email', type: 'textinput', value: this.email },
      { locator: '#AccountFrm_telephone', type: 'textinput', value: this.telephone },
      { locator: '#AccountFrm_fax', type: 'textinput', value: this.fax },
      { locator: '#AccountFrm_company', type: 'textinput', value: this.company },
      { locator: '#AccountFrm_address_1', type: 'textinput', value: this.address1 },
      { locator: '#AccountFrm_address_2', type: 'textinput', value: this.address2 },
      { locator: '#AccountFrm_city', type: 'textinput', value: this.city },
      { locator: '#AccountFrm_country_id', type: 'select', label: this.country },
      { locator: '#AccountFrm_zone_id', type: 'select', label: this.zone },
      { locator: '#AccountFrm_postcode', type: 'textinput', value: this.postcode },
      { locator: '#AccountFrm_loginname', type: 'textinput', value: this.loginname },
      { locator: '#AccountFrm_password', type: 'textinput', value: this.password },
      { locator: '#AccountFrm_confirm', type: 'textinput', value: this.password },
      { locator: '#AccountFrm_newsletter1', type: 'checkbox', value: this.newsletter },
      { locator: '#AccountFrm_agree', type: 'checkbox', value: this.agree },
    ];
  }

  get addressBookData(): Partial<AccountDataInterface> {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      company: this.company,
      address1: this.address1,
      address2: this.address2,
      city: this.city,
      country: this.country,
      zone: this.zone,
      postcode: this.postcode,
    };
  }

  static create(customData?: Partial<AccountDataInterface>): Account {
    return new Account(customData);
  }
}
