import { Application } from 'express'
import { createConnection } from 'typeorm'
import expressLoader from './express'
import passportLoader from './passport'
import oauth2orizeLoader from './oauth2orize'
import { container } from '@/config'

export async function init(): Promise<Application> {
    await createConnection()
    passportLoader(container)
    oauth2orizeLoader(container)

    const app = expressLoader(container)
    return app
}
