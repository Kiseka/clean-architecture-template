import { IUser } from "../../domain/entities/user";

export type AuthToken = {
    accessToken: string,
    refreshToken: string
}
export interface IAuthService {
    authorize(user: IUser, requestPassword: string): Promise<AuthToken>
    encryptPassword(password:string):Promise<string>,
    verifyToken(token:string):Promise<IUser>
}
