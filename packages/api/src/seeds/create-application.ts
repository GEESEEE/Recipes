import type { Factory, Seeder } from '@zchapple/typeorm-seeding'
import type { Connection } from 'typeorm'
import { Application } from '@/entities'

export default class CreateApplication implements Seeder {
    public async run(_factory: Factory, connection: Connection): Promise<any> {
        const applicationRepository = await connection.getRepository(
            Application
        )

        await applicationRepository.save({
            name: 'RecipesApp',
            uid: '11a8fa16-ca02-4a7e-bbd8-5aa4bd92a8ef',
            secret: '',
            scopes: '',
            redirectUri: '',
            confidential: true,
        })
    }
}
