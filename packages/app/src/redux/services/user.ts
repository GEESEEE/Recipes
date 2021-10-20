import {
    Section,
    Settings,
    User,
    UpdatableFields,
    Creatable,
    Updatable,
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

        updateSettings: builder.mutation<Settings, UpdatableFields<Settings>>({
            query: (body) => ({
                url: `/users/settings`,
                method: 'PUT',
                body,
            }),
        }),

        createSection: builder.mutation<
            Section,
            Omit<Creatable<Section>, 'userId'>
        >({
            query: (body) => ({
                url: `/users/sections`,
                method: 'POST',
                body,
            }),
        }),

        getSections: builder.query<Section, void>({
            query: () => `/users/sections`,
        }),

        updateSection: builder.mutation<Section, Updatable<Section>>({
            query: (body) => ({
                url: `/users/sections/${body.id}`,
                method: 'PUT',
                body,
            }),
        }),

        deleteSection: builder.mutation<Section, number>({
            query: (id) => ({
                url: `/users/sections/${id}`,
                method: 'DELETE',
            }),
        }),
    }),
})

export const {
    useGetUserMutation,
    useUpdateSettingsMutation,
    useGetSectionsQuery,
} = userApi
