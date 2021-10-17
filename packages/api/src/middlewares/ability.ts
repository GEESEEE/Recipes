import { NextFunction, Request, Response } from 'express'
import { BaseMiddleware } from 'inversify-express-utils'
import { injectable } from 'inversify'
import defineUserAbilities from '../abilities'
import { NotFoundError } from '../errors'

@injectable()
export default class AbilityMiddleware extends BaseMiddleware {
    public async handler(
        req: Request,
        _res: Response,
        next: NextFunction
    ): Promise<void> {
        if (typeof req.user === 'undefined') {
            throw new NotFoundError('User not found')
        }
        req.user.ability = defineUserAbilities(req.user)
        return next()
    }
}
