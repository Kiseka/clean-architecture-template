export interface ResponseModel<T> {
    body: T;
    statusCode: number;
    message?:string
}
  