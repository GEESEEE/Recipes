import { RecipeQueryBuilder, SectionQueryBuilder } from '@/repositories'

// Recipe
export type RecipeScopes = keyof RecipeQueryBuilder['scopes']
export interface RecipeScopeArgs {
    sectionId?: number
    searchQuery?: string[]
}
export type RecipeSortQuery = 'preparetime' | 'ingredientcount' | 'publishtime'

// Section
export type SectionScopes = keyof SectionQueryBuilder['scopes']
export interface SectionScopeArgs {
    userId?: number
    recipeIds?: number[]
    sectionIds?: number[]
}
