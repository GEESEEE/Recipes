import BaseError from './base';
export default class UnauthorizedError extends BaseError {
    constructor(message?: string);
}
