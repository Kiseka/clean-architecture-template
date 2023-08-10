import { NextFunction, Request, Response } from 'express';
import { RequestModel } from '../../../lib/types/request';
import { ResponseModel } from '../../../lib/types/response';
import { DefaultApplicationError } from '../../../lib/errors/default-application-error';

type handleRequest = (requestModel: RequestModel) => Promise<ResponseModel<any>>;
export const expressRouteAdapter = (handleRequest: handleRequest) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    return Promise.resolve(
      handleRequest({
        query: request.query,
        params: request.params,
        body: request.body,
        headers: request.headers,
      }),
    )
      .then((controllerResponse) => {
        return response
          .status(controllerResponse.statusCode)
          .json(controllerResponse.body);
        // return next();
      })
      .catch((error: DefaultApplicationError) => {
        return next(error);
      });
  };
};
