import { createApi } from '@reduxjs/toolkit/query/react'
import { Section } from '@/data'
import { baseQuery }  from './base'

export const sectionApi = createApi({
    reducerPath: 'sectionApi',
    baseQuery: baseQuery(),
    endpoints: builder => ({
        getSections: builder.query<Section, void>({
            query: () => `/users/sections`
        })
    })
})

export const { useGetSectionsQuery } = sectionApi

