import { IAuthService } from "@/application/abstractions/auth-service";
import { IUserRepository } from "@/domain/repositories/user-repository";
import { UnauthorizedError } from "@/application/exceptions/unauthorized-error";
import { validateFields } from "@/application/validation/validation-helpers";

export class LoginUserUseCase {
    constructor(
        private userRepository: IUserRepository,
        private authService: IAuthService
    ) { }

    async execute(email: string, password: string) {
        validateFields({
            email: { value: email, required: true },
            password: { value: password, required: true },
        });
        const user = await this.userRepository.getUserByEmail(email);
        if (!user) {
            throw new UnauthorizedError("User with email does not exist")
        }

        if (!user.accountVerified) {
            throw new UnauthorizedError("Account not verified yet!")
        }

        try {
            const authorize = await this.authService.authorize(user, password)
            return {
                user: user,
                ...authorize
            }
        } catch (error) {
            throw new UnauthorizedError("Invalid login credentials");
        }
    }
}