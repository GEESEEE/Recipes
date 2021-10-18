import { inject, injectable } from 'inversify'
import { Repository } from 'typeorm'
import { Theme } from '@recipes/api-types/v1'
import { User, Settings } from '../entities'
import { TYPES } from '../utils/constants'

@injectable()
export default class UserService {
    @inject(TYPES.UserRepository)
    private readonly userRepository!: Repository<User>

    @inject(TYPES.SettingsRepository)
    private readonly settingsRepository!: Repository<Settings>

    public async getUser(id: number): Promise<User> {
        const user = (await this.userRepository.findOne({
            where: { id },
            relations: ['settings'],
        })) as User
        user.password = ''
        return user
    }

    public async getSettings(id: number): Promise<Settings> {
        return (await this.settingsRepository.findOne({ id })) as Settings
    }

    public async updateSettings(settings: {
        id: number
        theme?: Theme
        color?: string
        invertedColors?: boolean
    }): Promise<Settings> {
        return await this.settingsRepository.save(settings)
    }
}
