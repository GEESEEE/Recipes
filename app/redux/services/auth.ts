import { User } from '@/data'
import { api } from './base'

export type SignUpParams = { name: string; password: string; email: string }
export type SignOutParams = { token: string }

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

        signOut: builder.mutation<void, SignOutParams>({
            query: (headers: SignOutParams) => ({
                url: `/auth/revoke`,
                method: 'POST',
                headers,
            }),
        }),
    }),
})

export const { useVerifyTokenMutation, useSignUpMutation, useSignOutMutation } =
    authApi
