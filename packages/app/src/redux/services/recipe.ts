import { PaginationObject } from '@recipes/api-types/v1'
import { api } from './base'

const recipeApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getRecipesBySectionId: builder.query<PaginationObject, number>({
            query: (sectionId) => ({
                url: `/sections/${sectionId}/recipes`,
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetRecipesBySectionIdQuery } = recipeApi
