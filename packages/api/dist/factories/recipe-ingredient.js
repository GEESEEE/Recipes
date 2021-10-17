"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_seeding_1 = require("@zchapple/typeorm-seeding");
const entities_1 = require("../entities");
(0, typeorm_seeding_1.define)(entities_1.RecipeIngredient, (faker) => {
    const recipeIngredient = new entities_1.RecipeIngredient();
    recipeIngredient.amount = faker.datatype.number(500);
    recipeIngredient.position = faker.datatype.number(999999);
    return recipeIngredient;
});
