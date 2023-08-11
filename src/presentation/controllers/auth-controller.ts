import { CreateUserUseCase } from "@/application/use-cases/users/create-user";
import { LoginUserUseCase } from "@/application/use-cases/users/login-user";
import { SendOtpUseCase } from "@/application/use-cases/users/send-otp";
import { VerifyUserUserCase } from "@/application/use-cases/users/verify-user";
import { IUser } from "@/domain/entities/user";
import { HTTP_STATUS_CODE } from "@/lib/config/constants";
import { apiErrorResponse, apiSuccessResponse } from "@/lib/helpers/response-helpers";
import { RequestModel } from "@/lib/types/request";


export default class AuthController {

    public constructor(
        private createUserUseCase: CreateUserUseCase,
        private sendOtpUseCase: SendOtpUseCase,
        private verifyUserUserCase: VerifyUserUserCase,
        private loginUserUseCase: LoginUserUseCase
    ) { }
    
    public loginUser = async (request: RequestModel) => {
        try {
            const { email, password } = request.body;
            const authentication = await this.loginUserUseCase.execute(email,password)
            return apiSuccessResponse({ data: authentication, message: "User Verified", status: HTTP_STATUS_CODE.OK })
        } catch (error: any) {
            return apiErrorResponse({ error: error, message: error.message })
        }
    }

    public registerUser = async (request: RequestModel) => {
        try {
            const { firstName, lastName, email, phone, password } = request.body;
            const user: IUser = {
                firstName,
                lastName,
                email,
                phone,
                password,
            };
            const createdUser = await this.createUserUseCase.execute(user);
            //send verification otp code to user
            await this.sendOtpUseCase.execute(createdUser);
            return apiSuccessResponse({ data: createdUser, message: "User Registered", status: HTTP_STATUS_CODE.CREATED })
        } catch (error: any) {
            return apiErrorResponse({ error: error, message: error.message })
        }
    }

    public verifyUser = async (request: RequestModel) => {
        try {
            const { email, code } = request.body;
            const updatedUser = await this.verifyUserUserCase.execute(email, code);
            return apiSuccessResponse({ data: updatedUser, message: "User Verified", status: HTTP_STATUS_CODE.OK })
        } catch (error: any) {
            return apiErrorResponse({ error: error, message: error.message })
        }
    }
}
