import { Application } from 'express'
import { createConnection } from 'typeorm'
import { container } from '../config'
import expressLoader from './express'
import passportLoader from './passport'
import oauth2orizeLoader from './oauth2orize'

export async function init(): Promise<Application> {
    await createConnection()
    passportLoader(container)
    oauth2orizeLoader(container)

    const app = expressLoader(container)
    return app
}
