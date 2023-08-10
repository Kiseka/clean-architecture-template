import { RequestValidationError } from "../lib/errors/request-validation-error"
import { isEmpty } from "../lib/helpers/commons"
import { ValidationResult, validationErrors } from "../lib/helpers/validation-helper"

export interface IUser {
    id?: number
    firstName: string
    lastName: string
    email: string
    phone: string
    password: string,
    accountVerified?:boolean
}

export class User implements IUser {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public phone: string,
        public password: string
    ) { }

    checkValidationErrors(): ValidationResult[] {
        const errors = validationErrors({
            firstName: { value: this.firstName, required: true },
            lastName: { value: this.lastName, required: true },
            email: { value: this.email, required: true },
            password: { value: this.password, required: true , minLength: 6},
        });
        return errors;
    }
}