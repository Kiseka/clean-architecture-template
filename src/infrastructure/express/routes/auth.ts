
import express from "express";
import authControllerFactory from "@/infrastructure/factories/controllers/auth-controller-factory";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
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