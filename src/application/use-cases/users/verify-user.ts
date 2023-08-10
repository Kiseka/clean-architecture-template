import { IUserRepository } from "../../../domain/repository-interfaces/user-repository";
import { IUserVerificationCodeRepository } from "../../../domain/repository-interfaces/user-verification-code-repository";
import { BadRequestError } from "../../../lib/errors/bad-request-error";
import { NotFoundError } from "../../../lib/errors/not-found-error";
export class VerifyUserUserCase {
    constructor(
        private userRepository: IUserRepository,
        private userVerificationCodeRepository: IUserVerificationCodeRepository
    ) { }

    async execute(email: string, code: string): Promise<any> {
        const verificationCodeDetails = await this.userVerificationCodeRepository
            .getVerificationCodeByEmailAndCode(email, code)

        if (verificationCodeDetails === null) {
            throw new BadRequestError('Invalid OTP Verification Code.');
        }
        const user = await this.userRepository.getUserByEmail(email)

        if (!user) {
            throw new NotFoundError('User not found.');
        }

        const updatedUser = await this.userRepository.updateVerification(user.id as number, true, new Date())
        return updatedUser
    }
}