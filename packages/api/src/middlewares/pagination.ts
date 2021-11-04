import { NextFunction, Request, Response } from 'express'
import { BaseMiddleware } from 'inversify-express-utils'
import { PaginationObject } from '@recipes/api-types/v1'
import { BaseQueryBuilder } from '@/repositories/base'

export default class PaginationMiddleware extends BaseMiddleware {
    public async handler(
        req: Request,
        _res: Response,
        next: NextFunction
    ): Promise<void> {
        BaseQueryBuilder.prototype.paginate = async function (
            perPage?: number
        ): Promise<PaginationObject> {
            const currentPage = getPage(req)
            const pageSize =
                typeof perPage === 'undefined'
                    ? getPerPage(req)
                    : getPerPage(req, perPage)
            return await this.pagination(currentPage, pageSize)
        }

        return next()
    }
}

function getPage(req: Request, defaultPage = 1): number {
    if (typeof req.query.page !== 'undefined') {
        return parseInt(req.query.page as string)
    }
    return defaultPage
}

function getPerPage(req: Request, defaultPerPage = 15): number {
    if (req.query.per_page != null) {
        return parseInt(req.query.per_page as string)
    }
    return defaultPerPage
}
