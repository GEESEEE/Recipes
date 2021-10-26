import { RecipeQueryBuilder } from '@/repositories/recipe'

export type RecipeScopes = keyof RecipeQueryBuilder['scopes']

export interface RecipeScopeArgs {
    sectionId?: number
    searchQuery?: string[]
}

export type RecipeSortQuery = 'preparetime' | 'ingredientcount' | 'publishtime'
