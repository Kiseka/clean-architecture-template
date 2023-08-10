import { ResponseModel } from "../types/response";

export type ErrorParams = {
  name?: string;
  message?: string;
  statusCode?: number;
  messages?: string[];
  stack?: Error['stack'];
};

export type ErrorResponseModel = Omit<ResponseModel<ErrorParams>, 'body'>;

export class DefaultApplicationError
  extends Error
  implements ErrorResponseModel {
  public statusCode = 500;
  public messages: any[] = [];

  constructor(message?: string) {
    super(message);
    this.message = message || this.name;
    this.name = 'DefaultApplicationError';
    this.messages.push(this.message);
  }
}
