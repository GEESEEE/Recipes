"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeType = exports.TYPES = void 0;
exports.TYPES = {
    Connection: Symbol.for('Connection'),
    Redis: Symbol.for('Redis'),
    PassportMiddleware: Symbol.for('PassportMiddleware'),
    TokenMiddleware: Symbol.for('TokenMiddleware'),
    AbilityMiddleware: Symbol.for('AbilityMiddleware'),
    ErrorMiddleware: Symbol.for('ErrorMiddleware'),
    PaginationMiddleware: Symbol.for('PaginationMiddleware'),
    // Authorization Repositories
    UserRepository: Symbol.for('UserRepository'),
    TokenRepository: Symbol.for('TokenRepository'),
    ApplicationRepository: Symbol.for('ApplicationRepository'),
    // Recipe related Repositories
    SectionRepository: Symbol.for('SectionRepository'),
    SettingsRepository: Symbol.for('SettingsRepository'),
    IngredientRepository: Symbol.for('IngredientRepository'),
    RecipeRepository: Symbol.for('RecipeRepository'),
    RecipeIngredientRepository: Symbol.for('RecipeIngredientRepository'),
    InstructionRepository: Symbol.for('InstructionRepository'),
    // Services
    SectionService: Symbol.for('SectionService'),
    RecipeService: Symbol.for('RecipeService'),
    AuthService: Symbol.for('AuthService'),
    UserService: Symbol.for('UserService'),
};
var ThemeType;
(function (ThemeType) {
    ThemeType["dark"] = "dark";
    ThemeType["light"] = "light";
})(ThemeType = exports.ThemeType || (exports.ThemeType = {}));