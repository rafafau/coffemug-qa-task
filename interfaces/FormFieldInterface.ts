import { FieldType } from '../types/fieldType';

export interface FormFieldInterface {
  locator: string;
  type: FieldType;
  value?: string | boolean;
  label?: string;
}
