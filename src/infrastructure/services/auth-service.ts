import { AuthToken, IAuthService } from "../../application/abstractions/auth-service";
import { IUser } from "../../domain/user";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../../lib/errors/unauthorized-error";
import { InternalServerError } from "../../lib/errors/internal-server-error";

export class AuthService implements IAuthService {

    async verifyToken(token: string): Promise<IUser> {
        if (process.env.ACCESS_TOKEN) {
            try {
                const authUser = jwt.verify(token, process.env.ACCESS_TOKEN);
                return authUser as IUser
            } catch (error) {
                throw new UnauthorizedError("Unauthorized");
            }
        } else {
            throw new InternalServerError("Something went wrong");
        }
    }

    async encryptPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, 10)
    }

    async authorize(user: IUser, requestPassword: string): Promise<AuthToken> {
        const isPasswordCorrect = await bcrypt.compare(requestPassword, user.password);
        if (isPasswordCorrect === true) {
            const authTokens = await this.getAuthTokens(user)
            return authTokens
        } else {
            throw new UnauthorizedError("Invalid login credentials");
        }
    }

    async getAuthTokens(user: IUser) {
        if (process.env.ACCESS_TOKEN && process.env.REFRESH_TOKEN) {
            let token = jwt.sign(
                JSON.parse(JSON.stringify(user)),
                process.env.ACCESS_TOKEN,
                {
                    expiresIn: process.env.JWT_EXPIRES_IN,
                }
            );

            let refreshToken = jwt.sign(
                JSON.parse(JSON.stringify(user)),
                process.env.REFRESH_TOKEN,
                {
                    expiresIn: process.env.JWT_EXPIRES_REFRESH_IN,
                }
            );

            return {
                'accessToken': token,
                'refreshToken': refreshToken
            }
        } else {
            throw new InternalServerError("Something went wrong");
        }
    }
}
