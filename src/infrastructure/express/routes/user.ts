import express from "express";

const userRouter = express.Router();
import { expressMiddlewareAdapter } from "../adapters/express-middleware-adapter";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import userControllerFactory from "@/infrastructure/factories/controllers/user-controller-factory";
import middleWareFactory from "@/infrastructure/factories/middlewares/middleware-factory";
const {isAuthenticatedMiddleware} = middleWareFactory()
const {userProfile} = userControllerFactory()

userRouter.get("/",
    expressMiddlewareAdapter(isAuthenticatedMiddleware),
    expressRouteAdapter(userProfile)
);


export default userRouter