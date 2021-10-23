import {
    Settings,
    SettingsUpdate,
    User,
    WithoutId,
} from '@recipes/api-types/v1'
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

        updateSettings: builder.mutation<Settings, WithoutId<SettingsUpdate>>({
            query: (body) => ({
                url: `/users/settings`,
                method: 'PUT',
                body,
            }),
        }),
    }),
})

export const { useGetUserMutation, useUpdateSettingsMutation } = userApi
