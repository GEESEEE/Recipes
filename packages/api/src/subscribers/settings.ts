import {
    EntitySubscriberInterface,
    EventSubscriber,
    // Repository,
    // UpdateEvent,
} from 'typeorm'
// import { Redis } from 'ioredis'
import {
    Settings,
    // , User
} from '@/entities'
// import { TYPES } from '@/utils/constants'
// import { lazyInject } from '@/config'

@EventSubscriber()
export class SettingsSubscriber implements EntitySubscriberInterface {
    // @lazyInject(TYPES.Redis)
    // private readonly redis!: Redis

    // @lazyInject(TYPES.UserRepository)
    // private readonly userRepository!: Repository<User>

    public listenTo() {
        return Settings
    }

    // public async afterUpdate(event: UpdateEvent<Settings>): Promise<void> {
    //     await this.updateRedis(event.entity as Settings)
    // }

    // private async updateRedis(settings: Settings): Promise<void> {
    //     const user = (await this.userRepository.findOne({
    //         where: { settingsId: settings.id },
    //         select: ['id'],
    //     })) as User

    //     const redisUser = JSON.parse(
    //         (await this.redis.get(user.id as any)) as string
    //     )

    //     redisUser.settings = { ...redisUser.settings, ...settings }
    //     await this.redis.set(user.id as any, JSON.stringify(redisUser))
    // }
}
