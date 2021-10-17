"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("@zchapple/typeorm-seeding");
const entities_1 = require("../entities");
(0, typeorm_seeding_1.define)(entities_1.Instruction, (faker) => {
    const instruction = new entities_1.Instruction();
    instruction.text = faker.lorem.words(10);
    instruction.position = faker.datatype.number(999999);
    return instruction;
});
