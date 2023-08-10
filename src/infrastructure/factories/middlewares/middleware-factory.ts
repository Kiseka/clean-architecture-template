import { IsAuthenticatedMiddleware } from "../../../presentation/middlewares/is-authenticated";
import { AuthService } from "../../services/auth-service";

const middleWareFactory = () => {
  const authService = new AuthService()
  const isAuthenticatedMiddleware = new IsAuthenticatedMiddleware(authService);
  return {
    isAuthenticatedMiddleware,
  };
};

export default middleWareFactory
