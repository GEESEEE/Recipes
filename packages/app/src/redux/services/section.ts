import { Section, SectionCreate, SectionUpdate } from '@recipes/api-types/v1'
import { api } from './base'
import { withPopupMutation, withPopupQuery } from '@/hooks'

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

const { endpoints } = sectionApi

export const useCreateSectionMutation = withPopupMutation<
    typeof endpoints.createSection
>(sectionApi.useCreateSectionMutation)

export const useGetSectionsQuery = withPopupQuery<typeof endpoints.getSections>(
    sectionApi.useGetSectionsQuery
)

export const useUpdateSectionMutation = withPopupMutation<
    typeof endpoints.updateSection
>(sectionApi.useUpdateSectionMutation)

export const useUpdateSectionsMutation = withPopupMutation<
    typeof endpoints.updateSections
>(sectionApi.useUpdateSectionsMutation)

export const useDeleteSectionMutation = withPopupMutation<
    typeof endpoints.deleteSection
>(sectionApi.useDeleteSectionMutation)
