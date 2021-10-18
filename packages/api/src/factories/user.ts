import Faker from 'faker'
import { define } from '@zchapple/typeorm-seeding'
import { User } from '@/entities'

define(User, (faker: typeof Faker) => {
    const user = new User()
    user.name = faker.name.firstName()
    user.password = faker.name.prefix()
    user.email = faker.internet.email()
    return user
})
