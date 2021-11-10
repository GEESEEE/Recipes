import {
    QueryDefinition,
    MutationDefinition,
} from '@reduxjs/toolkit/dist/query'
import {
    ApiEndpointQuery,
    ApiEndpointMutation,
} from '@reduxjs/toolkit/dist/query/core/module'
import {
    UseQuery,
    UseMutation,
} from '@reduxjs/toolkit/dist/query/react/buildHooks'

export type FetchError = {
    message: string
    status: number
}

// Query
export type InferUseQuery<E> = E extends ApiEndpointQuery<infer QD, any>
    ? UseQuery<QD>
    : never

export type InferQueryArgs<E> = E extends ApiEndpointQuery<
    QueryDefinition<infer Args, any, any, any>,
    any
>
    ? Args
    : never

export type InferQueryResult<E> = E extends ApiEndpointQuery<
    QueryDefinition<any, any, any, infer Res>,
    any
>
    ? Res
    : never

export type UseQueryOptions = {
    pollingInterval?: number
    refetchOnReconnect?: boolean
    refetchOnFocus?: boolean
    skip?: boolean
    refetchOnMountOrArgChange?: boolean | number
}

export type UseQueryResult<T> = {
    originalArgs?: unknown
    data?: T
    error?: FetchError
    requestId?: string
    endpointName?: string
    startedTimeStamp?: number
    fulfilledTimeStamp?: number

    isUninitialized: boolean
    isLoading: boolean
    isFetching: boolean
    isSuccess: boolean
    isError: boolean

    refetch: () => void
}

// Mutation
export type InferUseMutation<E> = E extends ApiEndpointMutation<infer QD, any>
    ? UseMutation<QD>
    : never

export type InferMutationArgs<E> = E extends ApiEndpointMutation<
    MutationDefinition<infer Args, any, any, any>,
    any
>
    ? Args
    : never

export type InferMutationResult<E> = E extends ApiEndpointMutation<
    MutationDefinition<any, any, any, infer Res>,
    any
>
    ? Res
    : never

export type UseMutationTrigger<T> = (arg: any) => Promise<
    { data: T } | { error: FetchError }
> & {
    requestId: string
    abort: () => void
    unwrap: () => Promise<T>
    unsubscribe: () => void
}

export type UseMutationResult<T> = {
    originalArgs?: unknown
    data?: T
    error?: FetchError
    endpointName?: string
    fulfilledTimestamp?: number

    isUninitialized: boolean
    isLoading: boolean
    isSuccess: boolean
    isError: boolean
    startedTimeStamp?: number
}
