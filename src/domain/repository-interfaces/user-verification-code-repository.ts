import { IUserVerificationCode } from "../user-verification-token";
export interface IUserVerificationCodeRepository {
    create(userVerificationCode: IUserVerificationCode): Promise<IUserVerificationCode>;
    getVerificationCodeByEmailAndCode(email: string, code: string): Promise<IUserVerificationCode | null>;
}
