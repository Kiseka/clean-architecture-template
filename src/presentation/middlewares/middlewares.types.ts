import { RequestModel } from "../../lib/types/request";

export interface MiddlewareRequestModel extends RequestModel {
    method?: string;
}

export interface Middleware {
    handleRequest(requestModel: MiddlewareRequestModel): Promise<void> | never;
}
