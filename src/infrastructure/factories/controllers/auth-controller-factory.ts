import { CreateUserUseCase } from "../../../application/use-cases/users/create-user";
import { LoginUserUseCase } from "../../../application/use-cases/users/login-user";
import { SendOtpUseCase } from "../../../application/use-cases/users/send-otp";
import { VerifyUserUserCase } from "../../../application/use-cases/users/verify-user";
import AuthController from "../../../presentation/controllers/auth-controller";
import { UserRepository } from "../../persistence/repositories/user-repository";
import { UserVerificationCodeRepository } from "../../persistence/repositories/user-verification-code-repository";
import { AuthService } from "../../services/auth-service";
import { NodemailerEmailService } from "../../services/email-service";

const authControllerFactory = () => {
    const userRepository = new UserRepository()
    const userVerificationCodeRepository = new UserVerificationCodeRepository()
    const emailService = new NodemailerEmailService()
    const authService = new AuthService()

    const createUserUseCase = new CreateUserUseCase(userRepository,authService)
    const sendOtpUseCase = new SendOtpUseCase(userVerificationCodeRepository, emailService)
    const verifyUserUseCase = new VerifyUserUserCase(userRepository, userVerificationCodeRepository);
    const loginUserUseCase = new LoginUserUseCase(userRepository, authService);
    const authController = new AuthController(
        createUserUseCase,
        sendOtpUseCase,
        verifyUserUseCase,
        loginUserUseCase
    )

    return authController;
}

export default authControllerFactory;