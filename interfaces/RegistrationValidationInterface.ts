import { AccountDataInterface } from './AccountDataInterface';

export interface RegistrationValidationInterface {
  description: string;
  accountData: Partial<AccountDataInterface>;
  expectedError: string;
}
