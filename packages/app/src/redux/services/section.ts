import { Section, SectionCreate, SectionUpdate } from '@recipes/api-types/v1'
import { api } from './base'

const sectionApi = api.injectEndpoints({
    endpoints: (builder) => ({
        createSection: builder.mutation<Section, Omit<SectionCreate, 'userId'>>(
            {
                query: (body) => ({
                    url: `/sections`,
                    method: 'POST',
                    body,
                }),
            }
        ),

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

        updateSections: builder.mutation<Array<Section>, Array<SectionUpdate>>({
            query: (body) => ({
                url: `/sections/bulk`,
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
    useUpdateSectionsMutation,
    useDeleteSectionMutation,
} = sectionApi
