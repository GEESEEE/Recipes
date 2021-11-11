import {
    EntitySubscriberInterface,
    EventSubscriber,
    UpdateEvent,
} from 'typeorm'
import { Recipe } from '@/entities'
import { RecipeService } from '@/services'
import { TYPES } from '@/utils/constants'
import { lazyInject } from '@/config'

@EventSubscriber()
export class RecipeSubscriber implements EntitySubscriberInterface {
    @lazyInject(TYPES.RecipeService) recipeService!: RecipeService

    public listenTo() {
        return Recipe
    }

    public async beforeUpdate(event: UpdateEvent<Recipe>): Promise<void> {
        if (typeof event.entity !== 'undefined') {
            if (event.databaseEntity.sectionId !== event.entity.sectionId) {
                this.setNewPosition(event.entity as Recipe)
            }
        }
    }

    private async setNewPosition(recipe: Recipe): Promise<void> {
        const recipes = await this.recipeService.getRecipes(['section'], {
            sectionId: recipe.sectionId,
        })
        let maxPosition = 0
        recipes.forEach((recipe) => {
            if (recipe.position > maxPosition) {
                maxPosition = recipe.position
            }
        })
        recipe.position = maxPosition + 1
    }
}
