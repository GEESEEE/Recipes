import Faker from 'faker'
import { define } from '@zchapple/typeorm-seeding'
import { Section } from '@/entities'

define(Section, (faker: typeof Faker) => {
    const section = new Section()
    section.name = faker.name.title()
    section.description = faker.lorem.words(10)
    section.position = faker.datatype.number(999999)
    return section
})
