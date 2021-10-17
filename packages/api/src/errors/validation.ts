import { ValidationError as ValidError } from 'class-validator'

export default class ValidationError extends Error {
    public data: ValidError[]

    public constructor(data: ValidError[]) {
        super('Validation Error')
        this.data = data
    }
}
