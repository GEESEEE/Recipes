import {
    PaginationObject,
    PaginationParams,
    Recipe,
    RecipeCreate,
    RecipeScopeArgs,
    RecipeScopes,
    RecipeSortOptions,
    RecipeUpdate,
    Report,
    ReportCreate,
    ScopeParams,
    Sort,
} from '@recipes/api-types/v1'
import { api } from './base'
import { withPopupMutation, withPopupQuery } from '@/hooks'

type BaseArg = { sectionId: number }

export type GetRecipeParams = ScopeParams<
    RecipeScopes,
    RecipeScopeArgs,
    Sort<RecipeSortOptions>,
    true
> &
    PaginationParams & { search?: string[] }

const recipeParams = ['scopes', 'search', 'sort', 'page', 'perPage']

const recipeApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRecipesByScopes: builder.query<
            PaginationObject<Recipe>,
            GetRecipeParams
        >({
            query: (params) => {
                let suffix = ''

                for (const param of recipeParams) {
                    const par = params[param as keyof GetRecipeParams] as
                        | string[]
                        | number

                    if (typeof par !== 'undefined') {
                        if (par instanceof Array && par.length === 0) {
                            continue
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

        reportRecipe: builder.mutation<Report, Omit<ReportCreate, 'userId'>>({
            query: (args) => ({
                url: `/recipes/${args.recipeId}/report`,
                method: 'PUT',
                body: {
                    description: args.description,
                    category: args.category,
                },
            }),
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

export const useReportRecipeMutation = withPopupMutation<
    typeof endpoints.reportRecipe
>(recipeApi.useReportRecipeMutation)

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
