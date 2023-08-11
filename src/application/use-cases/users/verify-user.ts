import { IUserRepository } from "@/domain/repositories/user-repository";
import { IUserVerificationCodeRepository } from "@/domain/repositories/user-verification-code-repository";
import { BadRequestError } from "@/application/exceptions/bad-request-error";
import { NotFoundError } from "@/application/exceptions/not-found-error";

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