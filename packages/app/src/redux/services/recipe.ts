import {
    Recipe,
    RecipeCreate,
    RecipeScopeArgs,
    RecipeScopes,
    RecipeSortOptions,
    RecipeUpdate,
    Sort,
} from '@recipes/api-types/v1'
import { api } from './base'
import { withPopupMutation, withPopupQuery } from '@/hooks'

type BaseArg = { sectionId: number }

type GetRecipeParams = {
    scopes?: RecipeScopes[]
    search?: string[]
    sort?: Sort<RecipeSortOptions>[]
    page?: number
    body?: RecipeScopeArgs
}

const recipeApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRecipesByScopes: builder.query<Recipe[], any>({
            query: (params: GetRecipeParams) => {
                let suffix = ''

                for (const param of ['scopes', 'search', 'sort']) {
                    const par = params[
                        param as keyof GetRecipeParams
                    ] as Array<any>

                    if (typeof par !== 'undefined' && par.length > 0) {
                        suffix.length === 0
                            ? suffix.concat('?')
                            : suffix.concat('&')
                        suffix = suffix.concat(`?${param}=${par.join(',')}`)
                    }
                }

                suffix.length === 0 ? suffix.concat('?') : suffix.concat('&')
                const page = params.page || 1
                suffix = suffix.concat(`page=${page}`)

                return {
                    url: `/recipes${suffix}`,
                    method: 'GET',
                    body: params.body,
                }
            },
        }),

        getRecipesBySectionId: builder.query<Recipe[], number>({
            query: (sectionId) => ({
                url: `/sections/${sectionId}/recipes`,
                method: 'GET',
            }),
        }),

        createRecipes: builder.mutation<
            Recipe[],
            BaseArg & { body: Array<Omit<RecipeCreate, 'sectionId'>> }
        >({
            query: (args) => ({
                url: `/sections/${args.sectionId}/recipes/bulk`,
                method: 'POST',
                body: args.body,
            }),
        }),

        updateRecipes: builder.mutation<
            Recipe[],
            BaseArg & { body: Array<RecipeUpdate> }
        >({
            query: (args) => ({
                url: `/sections/${args.sectionId}/recipes/bulk`,
                method: 'PUT',
                body: args.body,
            }),
        }),

        deleteRecipe: builder.mutation<boolean, BaseArg & { recipeId: number }>(
            {
                query: (args) => ({
                    url: `/sections/${args.sectionId}/recipes/${args.recipeId}`,
                    method: 'DELETE',
                }),
            }
        ),
    }),
})

const { endpoints } = recipeApi

export const useGetRecipesByScopesQuery = withPopupQuery<
    typeof endpoints.getRecipesByScopes
>(recipeApi.useGetRecipesByScopesQuery)

export const useGetRecipesBySectionIdQuery = withPopupQuery<
    typeof endpoints.getRecipesBySectionId
>(recipeApi.useGetRecipesBySectionIdQuery)

export const useCreateRecipesMutation = withPopupMutation<
    typeof endpoints.createRecipes
>(recipeApi.useCreateRecipesMutation)

export const useUpdateRecipesMutation = withPopupMutation<
    typeof endpoints.updateRecipes
>(recipeApi.useUpdateRecipesMutation)

export const useDeleteRecipeMutation = withPopupMutation<
    typeof endpoints.deleteRecipe
>(recipeApi.useDeleteRecipeMutation)
