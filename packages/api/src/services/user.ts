import { inject, injectable } from 'inversify'
import { Repository } from 'typeorm'
import { fitToClass, Require, SettingsUpdate } from '@recipes/api-types/v1'
import { Redis } from 'ioredis'
import { TYPES } from '@/utils/constants'
import { User, Settings } from '@/entities'
import { UserResult, SettingsResult } from '@/types'

@injectable()
export default class UserService {
    @inject(TYPES.Redis)
    private readonly redis!: Redis

    @inject(TYPES.UserRepository)
    private readonly userRepository!: Repository<User>

    @inject(TYPES.SettingsRepository)
    private readonly settingsRepository!: Repository<Settings>

    public async getUser(id: number): Promise<UserResult> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['settings'],
        })

        const userResult = fitToClass(
            user as Require<User, 'settings'>,
            UserResult
        )
        return userResult
    }

    public async getSettings(id: number): Promise<SettingsResult> {
        const settings = (await this.settingsRepository.findOne({
            id,
        })) as Settings
        return fitToClass(settings, SettingsResult)
    }

    public async updateSettings(
        settings: SettingsUpdate
    ): Promise<SettingsResult> {
        const newSettings = await this.settingsRepository.save(settings)
        await this.updateRedis(newSettings)
        return fitToClass(newSettings, SettingsResult)
    }

    private async updateRedis(settings: Settings): Promise<void> {
        const user = (await this.userRepository.findOne({
            where: { settingsId: settings.id },
            select: ['id'],
        })) as User

        const redisUser = JSON.parse(
            (await this.redis.get(user.id as any)) as string
        )

        redisUser.settings = { ...redisUser.settings, ...settings }
        await this.redis.set(user.id as any, JSON.stringify(redisUser))
    }
}
