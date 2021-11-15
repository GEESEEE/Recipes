import { Container } from 'inversify'
import { Repository, getRepository, getCustomRepository } from 'typeorm'
import Redis from 'ioredis'
import passport from 'passport'
import dotenv from 'dotenv'
import {
    Instruction,
    RecipeIngredient,
    Settings,
    User,
    Token,
    Application,
    Ingredient,
} from '@/entities'
import {
    AuthService,
    RecipeService,
    SectionService,
    UserService,
} from '@/services'
import { TYPES } from '@/utils/constants'
import { ErrorMiddleware } from '@/middlewares'
import { RecipeRepository, SectionRepository } from '@/repositories'
import { Validator } from '@/utils'

dotenv.config()

const container = new Container()
const bind = container.bind.bind(container)

bind<any>(TYPES.Redis).toConstantValue(
    new Redis({
        host: process.env.REDIS_HOST,
        password: process.env.REDIS_PASSWORD,
    })
)

bind<any>(TYPES.PassportMiddleware).toConstantValue(
    passport.authenticate('bearer', { session: false })
)
bind<ErrorMiddleware>(TYPES.ErrorMiddleware).to(ErrorMiddleware)

// Auth Repositories
bind<Repository<User>>(TYPES.UserRepository)
    .toDynamicValue(() => {
        return getRepository(User)
    })
    .inRequestScope()
bind<Repository<Application>>(TYPES.ApplicationRepository)
    .toDynamicValue(() => {
        return getRepository(Application)
    })
    .inRequestScope()
bind<Repository<Token>>(TYPES.TokenRepository)
    .toDynamicValue(() => {
        return getRepository(Token)
    })
    .inRequestScope()

// Recipe Repositories
bind<Repository<Settings>>(TYPES.SettingsRepository).toDynamicValue(() => {
    return getRepository(Settings)
})
bind<SectionRepository>(TYPES.SectionRepository).toDynamicValue(() => {
    return getCustomRepository(SectionRepository)
})
bind<Repository<Ingredient>>(TYPES.IngredientRepository)
    .toDynamicValue(() => {
        return getRepository(Ingredient)
    })
    .inRequestScope()
bind<RecipeRepository>(TYPES.RecipeRepository)
    .toDynamicValue(() => {
        return getCustomRepository(RecipeRepository)
    })
    .inRequestScope()
bind<Repository<RecipeIngredient>>(TYPES.RecipeIngredientRepository)
    .toDynamicValue(() => {
        return getRepository(RecipeIngredient)
    })
    .inRequestScope()
bind<Repository<Instruction>>(TYPES.InstructionRepository)
    .toDynamicValue(() => {
        return getRepository(Instruction)
    })
    .inRequestScope()

bind<SectionService>(TYPES.SectionService).to(SectionService)
bind<RecipeService>(TYPES.RecipeService).to(RecipeService)
bind<AuthService>(TYPES.AuthService).to(AuthService)
bind<UserService>(TYPES.UserService).to(UserService)

bind<Validator>(TYPES.Validator).to(Validator)

export default container
