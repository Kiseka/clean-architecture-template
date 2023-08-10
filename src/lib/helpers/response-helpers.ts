import { HTTP_STATUS_CODE, MESSAGE_SUCCESS } from "../config/constants";

type TypeSuccessResponse = {
    message: any,
    data: any,
    status:any
}
export const apiSuccessResponse = ({ message, data,status=200 }: TypeSuccessResponse) => {
    return {
        body:{
            "status": MESSAGE_SUCCESS,
            "message": message,
            "data": data
        },
        statusCode:status
    };
};

type TypeErrorResponse = {
    message: any,
    error: any,
}
export const apiErrorResponse = ({  message, error }: TypeErrorResponse) => {
    return {
        body:{
            "error":error,
            "message":message
        },
        statusCode:error.statusCode ? error.statusCode : HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR,
    };
};
