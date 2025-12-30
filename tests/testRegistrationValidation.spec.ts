import { test } from '@playwright/test';
import { Ecomm } from '../pageObjects/ecomm';
import { Account } from '../dataObjects/account';
import { RegistrationValidationInterface } from '../interfaces/RegistrationValidationInterface';

let ecomm: Ecomm;

const validationTestCases: RegistrationValidationInterface[] = [
  {
    description: 'pusty First Name',
    accountData: { firstName: '', agree: true },
    expectedError: 'First Name must be between 1 and 32 characters!',
  },
  {
    description: 'zbyt długi First Name (33 znaki)',
    accountData: { firstName: 'A'.repeat(33), agree: true },
    expectedError: 'First Name must be between 1 and 32 characters!',
  },
  {
    description: 'pusty Last Name',
    accountData: { lastName: '', agree: true },
    expectedError: 'Last Name must be between 1 and 32 characters!',
  },
  {
    description: 'zbyt długi Last Name (33 znaki)',
    accountData: { lastName: 'B'.repeat(33), agree: true },
    expectedError: 'Last Name must be between 1 and 32 characters!',
  },
  {
    description: 'nieprawidłowy format email',
    accountData: { email: 'cwesd', agree: true },
    expectedError: 'Email Address does not appear to be valid!',
  },
  {
    description: 'pusty Address 1',
    accountData: { address1: '', agree: true },
    expectedError: 'Address 1 must be between 3 and 128 characters!',
  },
  {
    description: 'zbyt krótki Address 1 (2 znaki)',
    accountData: { address1: 'AB', agree: true },
    expectedError: 'Address 1 must be between 3 and 128 characters!',
  },
  {
    description: 'zbyt długi Address 1 (129 znaków)',
    accountData: { address1: 'A'.repeat(129), agree: true },
    expectedError: 'Address 1 must be between 3 and 128 characters!',
  },
  {
    description: 'pusty City',
    accountData: { city: '', agree: true },
    expectedError: 'City must be between 3 and 128 characters!',
  },
  {
    description: 'zbyt krótki City (2 znaki)',
    accountData: { city: 'AB', agree: true },
    expectedError: 'City must be between 3 and 128 characters!',
  },
  {
    description: 'zbyt długi City (129 znaków)',
    accountData: { city: 'C'.repeat(129), agree: true },
    expectedError: 'City must be between 3 and 128 characters!',
  },
  {
    description: 'pusty ZIP Code',
    accountData: { postcode: '', agree: true },
    expectedError: 'Zip/postal code must be between 3 and 10 characters!',
  },
  {
    description: 'zbyt krótki ZIP Code (2 znaki)',
    accountData: { postcode: '12', agree: true },
    expectedError: 'Zip/postal code must be between 3 and 10 characters!',
  },
  {
    description: 'pusty login',
    accountData: { loginname: '', agree: true },
    expectedError: 'Login name must be alphanumeric only and between 5 and 64 characters!',
  },
  {
    description: 'zbyt krótki login (4 znaki)',
    accountData: { loginname: 'abcd', agree: true },
    expectedError: 'Login name must be alphanumeric only and between 5 and 64 characters!',
  },
  {
    description: 'zbyt długi login (65 znaków)',
    accountData: { loginname: 'a'.repeat(65), agree: true },
    expectedError: 'Login name must be alphanumeric only and between 5 and 64 characters!',
  },
  {
    description: 'login ze znakami specjalnymi',
    accountData: { loginname: 'user@123', agree: true },
    expectedError: 'Login name must be alphanumeric only and between 5 and 64 characters!',
  },
  {
    description: 'puste hasło',
    accountData: { password: '', agree: true },
    expectedError: 'Password must be between 4 and 20 characters!',
  },
];

test.beforeEach(async ({ page }) => {
  ecomm = new Ecomm(page);
  await ecomm.landing().openLandingPage();
});

for (const testCase of validationTestCases) {
  test(`Sprawdzenie błędu walidacji rejestracji dla: ${testCase.description}`, async () => {
    const account = new Account(testCase.accountData);
    await ecomm.menu().goToLogin();
    await ecomm.register().registerNewAccountWithErrors(account);
    await ecomm.register().checkValidationError(testCase.expectedError);
  });
}

test.afterEach(async ({ page }) => {
  await page.close();
});
