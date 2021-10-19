import { Section, Settings, User, UpdatableFields } from '@recipes/api-types/v1'
import { api } from './base'

const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.mutation<User, string>({
            query: (token) => ({
                url: `/users`,
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            }),
        }),

        updateSettings: builder.mutation<Settings, UpdatableFields<Settings>>({
            query: (body) => ({
                url: `/users/settings`,
                method: 'PUT',
                body,
            }),
        }),

        getSections: builder.query<Section, void>({
            query: () => `/users/sections`,
        }),
    }),
})

export const {
    useGetUserMutation,
    useUpdateSettingsMutation,
    useGetSectionsQuery,
} = userApi
