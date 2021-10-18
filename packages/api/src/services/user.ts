import { inject, injectable } from 'inversify'
import { Repository } from 'typeorm'
import { Theme } from '@recipes/api-types/v1'
import { fitToClass } from '@recipes/api-types/utils'
import { TYPES } from '@/utils/constants'
import { User, Settings } from '@/entities'
import { OutputUser, OutputSettings } from '@/types'

@injectable()
export default class UserService {
    @inject(TYPES.UserRepository)
    private readonly userRepository!: Repository<User>

    @inject(TYPES.SettingsRepository)
    private readonly settingsRepository!: Repository<Settings>

    public async getUser(id: number): Promise<OutputUser> {
        const user = await this.userRepository.findOne({
            where: { id },
            relations: ['settings'],
        })

        const outputUser = fitToClass(user as any, OutputUser)
        return outputUser
    }

    public async getSettings(id: number): Promise<OutputSettings> {
        const settings = (await this.settingsRepository.findOne({
            id,
        })) as Settings
        return fitToClass(settings, OutputSettings)
    }

    public async updateSettings(settings: {
        id: number
        theme?: Theme
        color?: string
        invertedColors?: boolean
    }): Promise<OutputSettings> {
        const output = await this.settingsRepository.save(settings)
        return fitToClass(output, OutputSettings)
    }
}
