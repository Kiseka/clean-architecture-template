import { NextFunction, Request, Response } from 'express';
import { DefaultApplicationError } from '@/application/exceptions/default-application-error';
import { Middleware } from '@/presentation/middlewares/middlewares.types';

export const expressMiddlewareAdapter = (middleware: Middleware) => {
  return async (request: Request, response: Response, next: NextFunction) => {
    return Promise.resolve(
      middleware.handleRequest({
        query: request.query,
        params: request.params,
        body: request.body,
        headers: request.headers,
        method: request.method,
      }),
    )
      .then(() => {
        return next();
      })
      .catch((error: DefaultApplicationError) => {
        return response
        .status(error.statusCode)
        .json({
          message: error.message,
          error: error,
        });
        // return next(error);
      });
  };
};
