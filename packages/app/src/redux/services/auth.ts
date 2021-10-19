// eslint-disable-next-line import/no-unresolved
import { APPLICATION_ID } from '@env'
import {
    User,
    RegisterParams,
    LoginParams,
    LoginResult,
} from '@recipes/api-types/v1'
import { api } from './base'

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        verifyToken: builder.mutation<User, string>({
            query: (token) => ({
                url: '/auth/info',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        signUp: builder.mutation<true, RegisterParams>({
            query: (body) => ({
                url: `/auth/register`,
                method: 'POST',
                body,
            }),
        }),

        signOut: builder.mutation<true, string>({
            query: (token) => ({
                url: `/auth/revoke`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        signIn: builder.mutation<LoginResult, LoginParams>({
            query: (params) => {
                const body = {
                    client_id: APPLICATION_ID,
                    username: params.username,
                    password: params.password,
                    scope: 'create delete',
                    grant_type: 'password',
                }
                return {
                    url: `/auth/token`,
                    method: 'POST',
                    body,
                }
            },
        }),
    }),
})

export const {
    useVerifyTokenMutation,
    useSignUpMutation,
    useSignOutMutation,
    useSignInMutation,
} = authApi
