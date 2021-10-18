import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    UpdateEvent,
} from 'typeorm'
import { Recipe } from '@/entities'

@EventSubscriber()
export class RecipeSubscriber implements EntitySubscriberInterface {
    public listenTo(): any {
        return Recipe
    }

    public async beforeInsert(event: InsertEvent<Recipe>): Promise<void> {
        this.unpublishCopies(event.entity)
    }

    public async beforeUpdate(event: UpdateEvent<Recipe>): Promise<void> {
        if (typeof event.entity !== 'undefined') {
            this.unpublishCopies(event.entity as Recipe)
        }
    }

    private unpublishCopies(recipe: Recipe): void {
        if (recipe.copyOf != null) {
            recipe.publishedAt = null
        }
    }
}
