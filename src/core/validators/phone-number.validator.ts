import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function IsPhoneNumberE164(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPhoneNumberE164',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          const phone = parsePhoneNumberFromString(value);
          return phone?.isValid() ?? false;
        },
        defaultMessage(): string {
          return 'Phone number must be valid and in international E.164 format';
        },
      },
    });
  };
}
