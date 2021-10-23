import { Section, SectionCreate, SectionUpdate } from '@recipes/api-types/v1'
import { api } from './base'

const sectionApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createSection: builder.mutation<Section, SectionCreate>({
            query: (body) => ({
                url: `/sections`,
                method: 'POST',
                body,
            }),
        }),

        getSections: builder.query<Section[], void>({
            query: () => `/sections`,
        }),

        updateSection: builder.mutation<Section, SectionUpdate>({
            query: (body) => ({
                url: `/sections/${body.id}`,
                method: 'PUT',
                body,
            }),
        }),

        deleteSection: builder.mutation<boolean, number>({
            query: (id) => ({
                url: `/sections/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useCreateSectionMutation,
    useGetSectionsQuery,
    useUpdateSectionMutation,
    useDeleteSectionMutation,
} = sectionApi
