
import express from "express";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import authControllerFactory from "../../factories/controllers/auth-controller-factory";
const authRouter = express.Router();
const { registerUser, verifyUser, loginUser } = authControllerFactory()


authRouter.post("/login",
    expressRouteAdapter(loginUser)
);

authRouter.post("/register",
    expressRouteAdapter(registerUser)
);

authRouter.post("/verify",
    expressRouteAdapter(verifyUser)
);

export default authRouter