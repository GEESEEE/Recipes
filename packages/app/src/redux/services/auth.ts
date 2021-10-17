// eslint-disable-next-line import/no-unresolved
import { APPLICATION_ID } from '@env'
import { api } from './base'
import { User } from '@/data'

export type SignUpParams = { name: string; password: string; email: string }
export type SignOutParams = { token: string }
export type SignInParams = { username: string; password: string }

const authApi = api.injectEndpoints({
    endpoints: (builder) => ({
        verifyToken: builder.mutation<User, string>({
            query: (token: string) => ({
                url: '/auth/info',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        signUp: builder.mutation<void, SignUpParams>({
            query: (body: SignUpParams) => ({
                url: `/auth/register`,
                method: 'POST',
                body,
            }),
        }),

        signOut: builder.mutation<void, string>({
            query: (token: string) => ({
                url: `/auth/revoke`,
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }),
        }),

        signIn: builder.mutation<any, SignInParams>({
            query: (params: SignInParams) => {
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
