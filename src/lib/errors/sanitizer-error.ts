import { DefaultApplicationError } from "./default-application-error";

export class SanitizerError extends DefaultApplicationError {
  name = 'SanitizerError';
  statusCode = 400;
}
