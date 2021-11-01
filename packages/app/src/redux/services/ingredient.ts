import {
    RecipeIngredient,
    RecipeIngredientCreate,
    RecipeIngredientUpdate,
} from '@recipes/api-types/v1'
import { api } from './base'

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

export const {
    useAddIngredientsMutation,
    useUpdateIngredientsMutation,
    useDeleteIngredientsMutation,
} = ingredientApi
