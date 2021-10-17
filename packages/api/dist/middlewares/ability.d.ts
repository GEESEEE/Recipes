import { NextFunction, Request, Response } from 'express';
import { BaseMiddleware } from 'inversify-express-utils';
export default class AbilityMiddleware extends BaseMiddleware {
    handler(req: Request, _res: Response, next: NextFunction): Promise<void>;
}
