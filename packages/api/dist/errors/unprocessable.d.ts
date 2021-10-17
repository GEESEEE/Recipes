import BaseError from './base';
export default class UnprocessableError extends BaseError {
    constructor(message?: string);
}
