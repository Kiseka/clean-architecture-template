import { AuthService } from "@/infrastructure/services/auth-service";
import { IsAuthenticatedMiddleware } from "@/presentation/middlewares/is-authenticated";

const middleWareFactory = () => {
  const authService = new AuthService()
  const isAuthenticatedMiddleware = new IsAuthenticatedMiddleware(authService);
  return {
    isAuthenticatedMiddleware,
  };
};

export default middleWareFactory
