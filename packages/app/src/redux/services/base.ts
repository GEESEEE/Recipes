import {
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react'
import {
    BaseQueryApi,
    QueryReturnValue,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes'
import { RootState } from '@/redux/store'
import { FetchError } from '@/types'

const V1 = 'v1'

const base = fetchBaseQuery({
    baseUrl: `${'http://60b2-85-145-4-64.ngrok.io' ?? '127.0.0.1'}/${V1}`,
    prepareHeaders: (headers, { getState }) => {
        const { token } = (getState() as RootState).auth
        if (token.length > 0) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
})

const baseQuery = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: any
): Promise<QueryReturnValue<unknown, FetchError, FetchBaseQueryMeta>> => {
    const result = await base(args, api, extraOptions)

    if ('error' in result) {
        const message =
            (result.error as any)?.data?.errors?.[0].message ??
            'Could not connect to the server'
        const status = (result.error?.status as number) || 400

        return {
            error: {
                message,
                status,
            },
        }
    }

    return result
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery,
    endpoints: () => ({}),
})
