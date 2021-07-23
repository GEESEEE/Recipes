export enum APIErrorType {
    NOT_FOUND,
    DEFAULT,
}

export class APIError {
    type: APIErrorType

    message: string

    constructor(type: APIErrorType, message: string) {
        this.type = type
        this.message = message
    }
}
