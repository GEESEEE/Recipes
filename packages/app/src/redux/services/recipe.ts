import {
    PaginationObject,
    PaginationParams,
    Recipe,
    RecipeCreate,
    RecipeScopeArgs,
    RecipeScopes,
    RecipeSortOptions,
    RecipeUpdate,
    ScopeParams,
} from '@recipes/api-types/v1'
import { api } from './base'
import { withPopupMutation, withPopupQuery } from '@/hooks'

type BaseArg = { sectionId: number }

type GetRecipeParams = ScopeParams<
    RecipeScopes,
    RecipeScopeArgs,
    RecipeSortOptions,
    true
> &
    PaginationParams & { search?: string[] }

const listParams = ['scopes', 'search', 'sort']
const singleParams = ['page', 'perPage']

const recipeApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRecipesByScopes: builder.query<
            PaginationObject<Recipe>,
            GetRecipeParams
        >({
            query: (params) => {
                let suffix = ''

                for (const param of listParams.concat(singleParams)) {
                    const par = params[param as keyof GetRecipeParams] as
                        | string[]
                        | number

                    if (typeof par !== 'undefined') {
                        if (par instanceof Array && par.length === 0) {
                            break
                        }
                        suffix =
                            suffix.length === 0
                                ? suffix.concat('?')
                                : suffix.concat('&')
                        const val = par instanceof Array ? par.join(',') : par
                        suffix = suffix.concat(`${param}=${val}`)
                    }
                }

                return {
                    url: `/recipes${suffix}`,
                    method: 'GET',
                    body: params.args,
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
