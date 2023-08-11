import { IAuthService } from "@/application/abstractions/auth-service";
import { Middleware, MiddlewareRequestModel } from "./middlewares.types";
import { UnauthorizedError } from "@/application/exceptions/unauthorized-error";

export class IsAuthenticatedMiddleware implements Middleware {
  constructor(private authService: IAuthService) { }
  async handleRequest(request: MiddlewareRequestModel): Promise<void> | never {
    let token =
      request.body.token || request.query.token || request.headers["x-access-token"] || request.headers['authorization'] || '';

    if (!token) {
      throw new UnauthorizedError("Unauthorized");
    }

    try {
      if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      const user = await this.authService.verifyToken(token);
      request.headers.authId = user.id;
    } catch (error: any) {
      const unauthorizedError = new UnauthorizedError(error.message);
      unauthorizedError.stack = error.stack;
      throw unauthorizedError;
    }
  }
}
