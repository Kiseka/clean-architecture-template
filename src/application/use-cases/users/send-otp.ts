import { IUserVerificationCodeRepository } from "../../../domain/repository-interfaces/user-verification-code-repository";
import { IUser } from "../../../domain/user";
import { IUserVerificationCode } from "../../../domain/user-verification-token";
import { generateOTP } from "../../../lib/helpers/commons";
import { IEmailService } from "../../abstractions/email-service";

export class SendOtpUseCase {
    constructor(
        private userVerificationCodeRepository: IUserVerificationCodeRepository,
        private emailService: IEmailService,
    ) { }

    async execute(user: IUser): Promise<IUserVerificationCode> {
        const code = generateOTP()
        const userVerificationCode: IUserVerificationCode = {
            email: user.email,
            code: code,
        }
        const createdUserVerificationCode = await this.userVerificationCodeRepository
            .create(userVerificationCode);
        const data = {
            'name': user.firstName,
            'otp': code
        }
        await this.emailService.sendEmail('verifyAccountEmail', data, user.email, "Verify Account")

        return createdUserVerificationCode;
    }
}
