"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const typeorm_1 = require("typeorm");
const ioredis_1 = (0, tslib_1.__importDefault)(require("ioredis"));
const passport_1 = (0, tslib_1.__importDefault)(require("passport"));
const dotenv_1 = (0, tslib_1.__importDefault)(require("dotenv"));
const entities_1 = require("../entities");
const services_1 = require("../services");
const constants_1 = require("../util/constants");
const middlewares_1 = require("../middlewares");
const repositories_1 = require("../repositories");
dotenv_1.default.config();
const container = new inversify_1.Container();
const bind = container.bind.bind(container);
bind(constants_1.TYPES.Redis).toConstantValue(new ioredis_1.default({
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
}));
bind(constants_1.TYPES.PassportMiddleware).toConstantValue(passport_1.default.authenticate('bearer', { session: false }));
bind(constants_1.TYPES.AbilityMiddleware).to(middlewares_1.AbilityMiddleware);
bind(constants_1.TYPES.ErrorMiddleware).to(middlewares_1.ErrorMiddleware);
bind(constants_1.TYPES.PaginationMiddleware).to(middlewares_1.PaginationMiddleware);
// Auth Repositories
bind(constants_1.TYPES.UserRepository)
    .toDynamicValue(() => {
    return (0, typeorm_1.getRepository)(entities_1.User);
})
    .inRequestScope();
bind(constants_1.TYPES.ApplicationRepository)
    .toDynamicValue(() => {
    return (0, typeorm_1.getRepository)(entities_1.Application);
})
    .inRequestScope();
bind(constants_1.TYPES.TokenRepository)
    .toDynamicValue(() => {
    return (0, typeorm_1.getRepository)(entities_1.Token);
})
    .inRequestScope();
// Recipe Repositories
bind(constants_1.TYPES.SettingsRepository).toDynamicValue(() => {
    return (0, typeorm_1.getRepository)(entities_1.Settings);
});
bind(constants_1.TYPES.SectionRepository).toDynamicValue(() => {
    return (0, typeorm_1.getRepository)(entities_1.Section);
});
bind(constants_1.TYPES.IngredientRepository)
    .toDynamicValue(() => {
    return (0, typeorm_1.getCustomRepository)(repositories_1.IngredientRepository);
})
    .inRequestScope();
bind(constants_1.TYPES.RecipeRepository)
    .toDynamicValue(() => {
    return (0, typeorm_1.getCustomRepository)(repositories_1.RecipeRepository);
})
    .inRequestScope();
bind(constants_1.TYPES.RecipeIngredientRepository)
    .toDynamicValue(() => {
    return (0, typeorm_1.getRepository)(entities_1.RecipeIngredient);
})
    .inRequestScope();
bind(constants_1.TYPES.InstructionRepository)
    .toDynamicValue(() => {
    return (0, typeorm_1.getRepository)(entities_1.Instruction);
})
    .inRequestScope();
bind(constants_1.TYPES.SectionService).to(services_1.SectionService);
bind(constants_1.TYPES.RecipeService).to(services_1.RecipeService);
bind(constants_1.TYPES.AuthService).to(services_1.AuthService);
bind(constants_1.TYPES.UserService).to(services_1.UserService);
exports.default = container;
