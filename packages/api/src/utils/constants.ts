export const TYPES = {
    Connection: Symbol.for('Connection'),

    Redis: Symbol.for('Redis'),

    Bree: Symbol.for('Bree'),

    PassportMiddleware: Symbol.for('PassportMiddleware'),
    TokenMiddleware: Symbol.for('TokenMiddleware'),
    ErrorMiddleware: Symbol.for('ErrorMiddleware'),

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

    ReportRepository: Symbol.for('ReportRepository'),

    // Services
    SectionService: Symbol.for('SectionService'),
    RecipeService: Symbol.for('RecipeService'),
    AuthService: Symbol.for('AuthService'),
    UserService: Symbol.for('UserService'),
    ReportService: Symbol.for('ReportService'),

    Validator: Symbol.for('Validator'),
}
