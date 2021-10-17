import BaseError from './base'

export default class ConflictError extends BaseError {
    public constructor(message?: string) {
        super(message ?? 'Not Found', 409)
    }
}
