import { faker } from '@faker-js/faker';

export class RandomDataUtils {

    static generateRandomFirstName(): string {
        return faker.person.firstName();
    }
    static generateRandomLastName(): string {
        return faker.person.lastName();
    }

    static generateRandomEmail(): string {
        return faker.internet.email();
    }

    static generateRandomTelephone(): string {
        return faker.phone.number();
    }
    static generateRandomPassword(): string {
        return faker.internet.password();
    }

    static getRandomeUserName(): string {
        return faker.internet.username();
    }

    static getRandomCountry(): string {
        return faker.location.country();
    }

    static getRandomState(): string {
        return faker.location.state();
    }

    static getRandomCity(): string {
        return faker.location.city();
    }

    static getRandomAddress(): string {
        return faker.location.streetAddress();
    }

    static getRandomZipCode(): string {
        return faker.location.zipCode();
    }

    static getRandomPassword(length: number = 10): string {
        return faker.internet.password({ length });
    }

    static getRandomAlphanumericString(length: number = 10): string {
        return faker.string.alphanumeric(length);
    }

    static getRandomNumeric(length: number): string {
        return faker.string.numeric(length);
    }

    static getRandomUUID(): string {
        return faker.string.uuid();
    }

}