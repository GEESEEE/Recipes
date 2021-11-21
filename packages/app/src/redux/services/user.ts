import {
    Report,
    Settings,
    SettingsUpdate,
    User,
    WithoutId,
} from '@recipes/api-types/v1'
import { api } from './base'
import { withPopupMutation } from '@/hooks'

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

        getReports: builder.query<Report[], void>({
            query: () => ({
                url: `/reports`,
                method: 'GET',
            }),
        }),
    }),
})

export const { useGetUserMutation, useGetReportsQuery } = userApi

const { endpoints } = userApi

export const useUpdateSettingsMutation = withPopupMutation<
    typeof endpoints.updateSettings
>(userApi.useUpdateSettingsMutation)
