import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '@/redux/store'

const V1 = 'v1'

export const baseQuery = fetchBaseQuery({
    baseUrl: `${'http://60b2-85-145-4-64.ngrok.io' ?? '127.0.0.1'}/${V1}`,
    prepareHeaders: (headers, { getState }) => {
        const { token } = (getState() as RootState).auth
        if (token.length > 0) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
})

export const api = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: () => ({}),
})
