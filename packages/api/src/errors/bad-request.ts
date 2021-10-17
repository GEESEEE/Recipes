import BaseError from './base'

export default class BadRequestError extends BaseError {
    public constructor(message?: string) {
        super(message ?? 'Not Found', 400)
    }
}
