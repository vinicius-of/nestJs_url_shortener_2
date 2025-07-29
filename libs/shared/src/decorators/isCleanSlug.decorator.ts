import { registerDecorator, ValidationOptions } from 'class-validator';
import blacklist from '../blacklist.json';

function containsBlacklistWord(value: string): string | undefined {
    const listOfSlugs: string[] = blacklist;
    return listOfSlugs.find(term => new RegExp(term, 'i').test(value));
}

export function isCleanSlug(validationOptions?: ValidationOptions) {
    return (obj: object, propertyName: string) => {
        registerDecorator({
            name: 'isCleanSlug',
            target: obj.constructor,
            options: validationOptions,
            propertyName,
            validator: {
                validate(value: string) {
                    return typeof containsBlacklistWord(value) === 'string' ? false : true;
                },
                defaultMessage(_args) {
                    return `The value ${_args?.value} contains restricted term: ${containsBlacklistWord(_args?.value)}.`;
                },
            },
        });
    };
}
