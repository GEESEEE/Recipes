import '../controllers'
import express, { Application, NextFunction, Request, Response } from 'express'
import { Container } from 'inversify'
import { InversifyExpressServer } from 'inversify-express-utils'
import helmet from 'helmet'
import hpp from 'hpp'
import logger from 'morgan'
import { constants } from '@/utils'
import { ErrorMiddleware } from '@/middlewares'
import { NotFoundError } from '@/errors'

const { TYPES } = constants

export default function init(container: Container): Application {
    return new InversifyExpressServer(container)
        .setConfig((app) => {
            app.set('container', container)

            app.use(logger('dev'))
            app.use(express.json())
            app.use(express.urlencoded({ extended: false }))
            app.use(helmet())
            app.use(hpp())
        })
        .setErrorConfig((app) => {
            const errorMiddleware = container.get<ErrorMiddleware>(
                TYPES.ErrorMiddleware
            )

            app.use(() => {
                throw new NotFoundError()
            })

            app.use(
                (
                    err: any,
                    _req: Request,
                    res: Response,
                    _next: NextFunction
                ) => {
                    errorMiddleware.sendError(
                        res,
                        err.statusCode ?? err.status ?? 500,
                        err.message ?? 'Internal Server Error'
                    )
                }
            )
        })
        .build()
}
