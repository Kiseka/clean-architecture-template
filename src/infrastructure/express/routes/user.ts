import express from "express";

const userRouter = express.Router();
import { expressMiddlewareAdapter } from "../adapters/express-middleware-adapter";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import middleWareFactory from "../../factories/middlewares/middleware-factory";
import userControllerFactory from "../../factories/controllers/user-controller-factory";
const {isAuthenticatedMiddleware} = middleWareFactory()
const {userProfile} = userControllerFactory()

userRouter.get("/",
    expressMiddlewareAdapter(isAuthenticatedMiddleware),
    expressRouteAdapter(userProfile)
);


export default userRouter