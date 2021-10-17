export default class BaseError extends Error {
    statusCode: number;
    constructor(message: string, statusCode: number);
}
