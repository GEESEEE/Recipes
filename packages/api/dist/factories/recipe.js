"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("@zchapple/typeorm-seeding");
const entities_1 = require("../entities");
(0, typeorm_seeding_1.define)(entities_1.Recipe, (faker) => {
    const recipe = new entities_1.Recipe();
    recipe.name = faker.name.title();
    recipe.description = faker.lorem.words(10);
    recipe.peopleCount = faker.datatype.number(5);
    recipe.prepareTime = faker.datatype.number(60);
    recipe.createdAt = faker.date.recent();
    const x = faker.datatype.number(1);
    if (x > 0) {
        recipe.publishedAt = faker.date.recent();
    }
    else {
        recipe.publishedAt = null;
    }
    return recipe;
});
