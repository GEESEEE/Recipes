import { Section, Settings, User } from '@/data'
import { api } from './base'

export type UpdateSettingsParams = {
    theme?: 'light' | 'dark'
    color?: string
    invertedColors?: boolean
}

const userApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getUser: builder.mutation<User, string>({
            query: (token: string) => ({
                url: `/users`,
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            }),
        }),

        updateSettings: builder.mutation<Settings, UpdateSettingsParams>({
            query: (body: UpdateSettingsParams) => ({
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
