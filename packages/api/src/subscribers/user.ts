import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    RemoveEvent,
    UpdateEvent,
} from 'typeorm'
import bcrypt from 'bcrypt'
import getDecorators from 'inversify-inject-decorators'
import { User } from '../entities'
import { RecipeRepository } from '../repositories'
import { TYPES } from '../util/constants'
import { container } from '../config'
const { lazyInject } = getDecorators(container)

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface {
    @lazyInject(TYPES.RecipeRepository)
    private readonly recipeRepository!: RecipeRepository

    public listenTo(): any {
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

    // TODO: Test if deleteUncopiedRecipesFromAuthor works correctly
    public async BeforeRemove(event: RemoveEvent<User>): Promise<void> {
        const queryBuilder = this.recipeRepository.queryBuilder()
        await queryBuilder.deleteUncopiedRecipesFromAuthor(event.entityId)
    }

    private async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt()
        return await bcrypt.hash(password, salt)
    }
}
