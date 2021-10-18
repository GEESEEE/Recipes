// eslint-disable-next-line import/no-unresolved
import { APPLICATION_ID } from '@env'
import { User } from '@recipes/api-types/v1'
import { api } from './base'

export type SignUpParams = { name: string; password: string; email: string }
export type SignInParams = { username: string; password: string }

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

        signUp: builder.mutation<void, SignUpParams>({
            query: (body) => ({
                url: `/auth/register`,
                method: 'POST',
                body,
            }),
        }),

        signOut: builder.mutation<void, string>({
            query: (token) => ({
                url: `/auth/revoke`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        signIn: builder.mutation<
            { access_token: string; token_type: string },
            SignInParams
        >({
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
