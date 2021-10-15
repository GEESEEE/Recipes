import { User } from '@/data'
import { api } from './base'

const authApi = api.injectEndpoints({
    endpoints: builder => ({
        retrieveToken: builder.mutation<User, string>({
            query: (token: string) => ({
                    url: '/auth/info',
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
        }),


    })
})

export const { useRetrieveTokenMutation } = authApi
