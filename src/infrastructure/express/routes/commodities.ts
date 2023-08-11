import express from "express";
const commoditiesRouter = express.Router();
import middleWareFactory from "@/infrastructure/factories/middlewares/middleware-factory";
import commodityControllerFactory from "@/infrastructure/factories/controllers/commodity-controller-factory";
import { expressRouteAdapter } from "../adapters/express-route-adapter";
import { expressMiddlewareAdapter } from "../adapters/express-middleware-adapter";
const {isAuthenticatedMiddleware} = middleWareFactory()
const {getCommodities, createCommodity, createCommodityPrice} = commodityControllerFactory()

commoditiesRouter.get("/",
    expressMiddlewareAdapter(isAuthenticatedMiddleware),
    expressRouteAdapter(getCommodities)
);

commoditiesRouter.get("/create",
    expressMiddlewareAdapter(isAuthenticatedMiddleware),
    expressRouteAdapter(createCommodity)
);

commoditiesRouter.get("/create-price",
    expressMiddlewareAdapter(isAuthenticatedMiddleware),
    expressRouteAdapter(createCommodityPrice)
);


export default commoditiesRouter