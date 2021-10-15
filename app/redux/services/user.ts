import { Section, User } from '@/data'
import { api } from './base'

const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.mutation<User, string>({
            query: (token: string) => ({
                url: `/users`,
                method: 'GET',
                headers: { 'Authorization': `Bearer ${token}` },
            })
        }),

        getSections: builder.query<Section, void>({
            query: () => `/users/sections`,
        }),
    }),
})

export const { useGetUserMutation, useGetSectionsQuery } = userApi
