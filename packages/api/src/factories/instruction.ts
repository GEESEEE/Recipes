import Faker from 'faker'
import { define } from '@zchapple/typeorm-seeding'
import { Instruction } from '../entities'

define(Instruction, (faker: typeof Faker) => {
    const instruction = new Instruction()
    instruction.text = faker.lorem.words(10)
    instruction.position = faker.datatype.number(999999)
    return instruction
})
