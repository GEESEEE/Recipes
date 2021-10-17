import { NextFunction, Request, Response } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
export declare type Errors = Array<{
    message: string;
}>;
export default class ErrorMiddleware extends BaseMiddleware {
    handler(req: Request, res: Response, next: NextFunction): Promise<void>;
    sendError(res: Response, statusCode: number, message: string): void;
    private sendErrors;
}
