import { Container } from 'inversify'
import { Instruction, RecipeIngredient, Section, Settings, User, Token, Application } from '../entities'
import {
    Repository,
    getRepository,
    getCustomRepository,
} from 'typeorm'
import Redis from 'ioredis'
import { AuthService, RecipeService, SectionService, UserService } from '../services'
import { TYPES } from '../util/constants'
import { ErrorMiddleware, AbilityMiddleware, PaginationMiddleware } from '../middlewares'
import passport from 'passport'
import { IngredientRepository, RecipeRepository } from '../repositories'

import dotenv from 'dotenv'

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
bind<AbilityMiddleware>(TYPES.AbilityMiddleware).to(AbilityMiddleware)
bind<ErrorMiddleware>(TYPES.ErrorMiddleware).to(ErrorMiddleware)
bind<PaginationMiddleware>(TYPES.PaginationMiddleware).to(
    PaginationMiddleware
)

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
bind<Repository<Settings>>(TYPES.SettingsRepository).toDynamicValue(
    () => {
        return getRepository(Settings)
    }
)
bind<Repository<Section>>(TYPES.SectionRepository).toDynamicValue(
    () => {
        return getRepository(Section)
    }
)
bind<IngredientRepository>(TYPES.IngredientRepository)
    .toDynamicValue(() => {
        return getCustomRepository(IngredientRepository)
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

export default container
