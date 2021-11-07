import {
    EntitySubscriberInterface,
    EventSubscriber,
    InsertEvent,
    UpdateEvent,
} from 'typeorm'
import { Recipe } from '@/entities'
import { lazyInject } from '@/config'
import { RecipeService } from '@/services'
import { TYPES } from '@/utils/constants'

@EventSubscriber()
export class RecipeSubscriber implements EntitySubscriberInterface {
    @lazyInject(TYPES.RecipeService) recipeService!: RecipeService

    public listenTo(): any {
        return Recipe
    }

    public async beforeInsert(event: InsertEvent<Recipe>): Promise<void> {
        this.unpublishCopies(event.entity)
    }

    public async beforeUpdate(event: UpdateEvent<Recipe>): Promise<void> {
        console.log(
            'Before Recipe Update',
            event,
            event.entity,
            this.recipeService
        )
        if (typeof event.entity !== 'undefined') {
            this.unpublishCopies(event.entity as Recipe)
            if (event.databaseEntity.sectionId !== event.entity.sectionId) {
                const recipes = await this.recipeService.getRecipes(
                    ['section'],
                    {
                        sectionId: event.entity.sectionId,
                    }
                )
                let maxPosition = 0
                recipes.forEach((recipe) => {
                    if (recipe.position > maxPosition) {
                        maxPosition = recipe.position
                    }
                })
                event.entity.position = maxPosition + 1
            }
        }
    }

    private unpublishCopies(recipe: Recipe): void {
        if (recipe.copyOf != null) {
            recipe.publishedAt = null
        }
    }
}
