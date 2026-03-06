import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";

export function IsIpRangeValid(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isIpRangeValid",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(_: any, args: ValidationArguments) {
          const entity: any = args.object;
          return isValidIpRange(entity.ipFrom, entity.ipTo);
        },
        defaultMessage(args: ValidationArguments) {
          return `ipTo must be >= ipFrom and of the same IP version`;
        },
      },
    });
  };
}

function isValidIpRange(ipFrom: any, ipTo: any): boolean | Promise<boolean> {
    throw new Error("Function not implemented.");
}

