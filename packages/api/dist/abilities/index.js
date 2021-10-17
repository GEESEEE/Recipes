"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ability_1 = require("@casl/ability");
const Ability = ability_1.PureAbility;
const lambdaMatcher = (matchConditions) => matchConditions;
function defineUserAbilities(user) {
    const { can, build } = new ability_1.AbilityBuilder(Ability);
    // Users can only read Recipes from other people if they are published
    can('read', 'Recipe', ({ publishedAt, section, }) => publishedAt !== null && section.userId !== user.id);
    // Users can only manage recipes, instructions and recipeIngredients from themselves
    can('manage', 'Section', ({ userId }) => userId === user.id);
    can('manage', 'Recipe', ({ section }) => section.userId === user.id);
    can('manage', 'Instruction', ({ recipe }) => recipe.section.userId === user.id);
    can('manage', 'RecipeIngredient', ({ recipe }) => recipe.section.userId === user.id);
    return build({ conditionsMatcher: lambdaMatcher });
}
exports.default = defineUserAbilities;
