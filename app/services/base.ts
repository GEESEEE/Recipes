import { Method } from "axios";
import applicationAdapter from "../adapters/application";
import { APIError, APIErrorType } from "../config/constants";

export default async function handleError<T>(
    method: Method,
    pathName: string,
    {body, headers}  :
    {body?: Record<string, unknown>,
    headers?: Record<string, unknown>,} = {}
): Promise<T | APIError> {
    try {
        return (await applicationAdapter(method, pathName, headers, body)).data;
    } catch (err) {
        if (err.response.status === 404) {
            return new APIError(APIErrorType.NOT_FOUND, err.response.data.errors[0].message ?? err.message)
        }
        return new APIError(APIErrorType.DEFAULT, err.response.data.errors[0].message ?? err.message)
    }
}
