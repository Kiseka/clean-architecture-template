import { isEmpty } from "../lib/helpers/commons";
export interface IUserVerificationCode {
    email: string
    code: string
}

export class UserVerificationCode implements IUserVerificationCode {
    constructor(
        public email: string,
        public code: string
    ) { }

    checkValidationErrors(): string[] {
        let errors:string[] = [];
        if (isEmpty(this.email)) errors.push('Email is missing')
        if (isEmpty(this.code)) errors.push('Code is missing')
        return errors;
    }
}