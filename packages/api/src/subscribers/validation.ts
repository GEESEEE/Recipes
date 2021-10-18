import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    UpdateEvent,
} from 'typeorm'
import { validate } from 'class-validator'
import { ValidationError } from '@/errors'

@EventSubscriber()
export class ValidationSubscriber implements EntitySubscriberInterface {
    public async beforeInsert(event: InsertEvent<any>): Promise<void> {
        const errors = await validate(event.entity)
        if (errors.length > 0) {
            throw new ValidationError(errors)
        }
    }

    public async beforeUpdate(event: UpdateEvent<any>): Promise<void> {
        const errors = await validate(event.entity as object)
        if (errors.length > 0) {
            throw new ValidationError(errors)
        }
    }
}
