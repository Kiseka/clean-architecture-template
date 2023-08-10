import { IUserRepository } from "../../../domain/repository-interfaces/user-repository";
import { UnauthorizedError } from "../../../lib/errors/unauthorized-error";
import { validateFields } from "../../../lib/helpers/validation-helper";
import { IAuthService } from "../../abstractions/auth-service";

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