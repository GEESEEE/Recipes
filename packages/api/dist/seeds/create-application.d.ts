import type { Factory, Seeder } from '@zchapple/typeorm-seeding';
import type { Connection } from 'typeorm';
export default class CreateApplication implements Seeder {
    run(_factory: Factory, connection: Connection): Promise<any>;
}
