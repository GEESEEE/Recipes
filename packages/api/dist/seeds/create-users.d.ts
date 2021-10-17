import type { Factory, Seeder } from '@zchapple/typeorm-seeding';
import type { Connection } from 'typeorm';
export default class CreateUsers implements Seeder {
    run(factory: Factory, _connection: Connection): Promise<any>;
}
