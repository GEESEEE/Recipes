import { ValidationError as ValidError } from 'class-validator';
export default class ValidationError extends Error {
    data: ValidError[];
    constructor(data: ValidError[]);
}
