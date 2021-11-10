import {
    RecipeIngredient,
    RecipeIngredientCreate,
    RecipeIngredientUpdate,
} from '@recipes/api-types/v1'
import { api } from './base'
import { withPopupMutation } from '@/hooks'

type BaseArg = { sectionId: number; recipeId: number }

const ingredientApi = api.injectEndpoints({
    endpoints: (builder) => ({
        addIngredients: builder.mutation<
            RecipeIngredient[],
            BaseArg & { body: RecipeIngredientCreate[] }
        >({
            query: (args) => ({
                url: `/sections/${args.sectionId}/recipes/${args.recipeId}/ingredients/bulk`,
                method: 'POST',
                body: args.body,
            }),
        }),

        updateIngredients: builder.mutation<
            RecipeIngredient[],
            BaseArg & { body: RecipeIngredientUpdate[] }
        >({
            query: (args) => ({
                url: `/sections/${args.sectionId}/recipes/${args.recipeId}/ingredients/bulk`,
                method: 'PUT',
                body: args.body,
            }),
        }),

        deleteIngredients: builder.mutation<
            boolean[],
            BaseArg & { body: number[] }
        >({
            query: (args) => ({
                url: `/sections/${args.sectionId}/recipes/${args.recipeId}/ingredients/bulk`,
                method: 'DELETE',
                body: args.body,
            }),
        }),
    }),
})

const { endpoints } = ingredientApi

export const useAddIngredientsMutation = withPopupMutation<
    typeof endpoints.addIngredients
>(ingredientApi.useAddIngredientsMutation)

export const useUpdateIngredientsMutation = withPopupMutation<
    typeof endpoints.updateIngredients
>(ingredientApi.useUpdateIngredientsMutation)

export const useDeleteIngredientsMutation = withPopupMutation<
    typeof endpoints.deleteIngredients
>(ingredientApi.useDeleteIngredientsMutation)
