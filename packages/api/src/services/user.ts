import { inject, injectable } from 'inversify'
import { Repository } from 'typeorm'
import { fitToClass, Require, Updatable } from '@recipes/api-types/v1'
import { TYPES } from '@/utils/constants'
import { User, Settings } from '@/entities'
import { UserResult, SettingsResult } from '@/types'

@injectable()
export default class UserService {
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
        settings: Updatable<SettingsResult>
    ): Promise<SettingsResult> {
        const output = await this.settingsRepository.save(settings)
        return fitToClass(output, SettingsResult)
    }
}
