import BaseError from './base';
export default class BadRequestError extends BaseError {
    constructor(message?: string);
}
