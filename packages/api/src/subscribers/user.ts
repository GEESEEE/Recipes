import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    UpdateEvent,
} from 'typeorm'
import bcrypt from 'bcrypt'

import { User } from '@/entities'

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface {
    public listenTo() {
        return User
    }

    public async beforeInsert(event: InsertEvent<User>): Promise<void> {
        event.entity.password = await this.hashPassword(event.entity.password)
    }

    public async beforeUpdate(event: UpdateEvent<User>): Promise<void> {
        if (typeof event.entity === 'undefined') {
            return
        }

        const newPassword = event.updatedColumns.find(
            (column) => column.propertyName === 'password'
        )
        if (typeof newPassword !== 'undefined') {
            event.entity.password = await this.hashPassword(
                event.entity.password
            )
        }
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt()
        return await bcrypt.hash(password, salt)
    }
}
