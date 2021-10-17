"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const instruction_1 = (0, tslib_1.__importDefault)(require("./instruction"));
const recipe_ingredient_1 = (0, tslib_1.__importDefault)(require("./recipe-ingredient"));
const section_1 = (0, tslib_1.__importDefault)(require("./section"));
let Recipe = class Recipe {
    id;
    name;
    description;
    prepareTime;
    peopleCount;
    recipeIngredients;
    instructions;
    sectionId;
    section;
    publishedAt;
    createdAt;
    copyOf;
};
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Recipe.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ length: 255 }),
    (0, tslib_1.__metadata)("design:type", String)
], Recipe.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, typeorm_1.Column)({ length: 1024 }),
    (0, tslib_1.__metadata)("design:type", String)
], Recipe.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)({ name: 'prepare_time' }),
    (0, typeorm_1.Column)({ name: 'prepare_time' }),
    (0, tslib_1.__metadata)("design:type", Number)
], Recipe.prototype, "prepareTime", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)({ name: 'people_count' }),
    (0, typeorm_1.Column)({ name: 'people_count' }),
    (0, tslib_1.__metadata)("design:type", Number)
], Recipe.prototype, "peopleCount", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => recipe_ingredient_1.default),
    (0, typeorm_1.OneToMany)(() => recipe_ingredient_1.default, (recipeIngredient) => recipeIngredient.recipe),
    (0, tslib_1.__metadata)("design:type", Array)
], Recipe.prototype, "recipeIngredients", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => instruction_1.default),
    (0, typeorm_1.OneToMany)(() => instruction_1.default, (instruction) => instruction.recipe),
    (0, tslib_1.__metadata)("design:type", Array)
], Recipe.prototype, "instructions", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)({ name: 'section_id' }),
    (0, typeorm_1.Column)({ name: 'section_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], Recipe.prototype, "sectionId", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => section_1.default),
    (0, typeorm_1.ManyToOne)(() => section_1.default, (section) => section.recipes, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: 'section_id' }),
    (0, tslib_1.__metadata)("design:type", section_1.default)
], Recipe.prototype, "section", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)({ name: 'published_at' }),
    (0, typeorm_1.Column)('timestamp with time zone', {
        name: 'published_at',
        nullable: true,
    }),
    (0, tslib_1.__metadata)("design:type", Object)
], Recipe.prototype, "publishedAt", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)({ name: 'created_at' }),
    (0, typeorm_1.Column)('timestamp with time zone', { name: 'created_at' }),
    (0, tslib_1.__metadata)("design:type", Date)
], Recipe.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)({ name: 'copy_of' }),
    (0, typeorm_1.Column)({ type: 'int', name: 'copy_of', nullable: true }),
    (0, tslib_1.__metadata)("design:type", Object)
], Recipe.prototype, "copyOf", void 0);
Recipe = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)('recipe')
], Recipe);
exports.default = Recipe;
