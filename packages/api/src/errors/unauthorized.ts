import BaseError from './base'

export default class UnauthorizedError extends BaseError {
    public constructor(message?: string) {
        super(message ?? 'Not Found', 401)
    }
}
