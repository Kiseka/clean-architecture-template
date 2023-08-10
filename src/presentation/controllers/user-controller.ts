import { GetProfileUseCase } from "../../application/use-cases/users/get-profile";
import { HTTP_STATUS_CODE } from "../../lib/config/constants";
import { apiErrorResponse, apiSuccessResponse } from "../../lib/helpers/response-helpers";
import { RequestModel } from "../../lib/types/request";

export default class UserController {
    public constructor(private getProfileUseCase: GetProfileUseCase) { }
    public userProfile = async (request: RequestModel) => {
        try {
            const { authId } = request.headers
            const user = await this.getProfileUseCase.execute(authId as number);
            return apiSuccessResponse({ data: user, message: "User Profile", status: HTTP_STATUS_CODE.OK })
        } catch (error: any) {
            return apiErrorResponse({ error: error, message: error.message })
        }
    }
}
