"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("@zchapple/typeorm-seeding");
const entities_1 = require("../entities");
(0, typeorm_seeding_1.define)(entities_1.User, (faker) => {
    const user = new entities_1.User();
    user.name = faker.name.firstName();
    user.password = faker.name.prefix();
    user.email = faker.internet.email();
    return user;
});
