import { DefaultApplicationError } from "./default-application-error";

export class ConflictError extends DefaultApplicationError {
  statusCode = 409;
  name = 'ConflictError';
}
