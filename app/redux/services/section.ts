import { Section } from '@/data'
import { api } from './base'

const sectionApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getSections: builder.query<Section, void>({
            query: () => `/users/sections`,
        }),
    }),
})

export const { useGetSectionsQuery } = sectionApi
