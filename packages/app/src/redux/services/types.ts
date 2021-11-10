import { useNavigation } from '@react-navigation/native'
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
import { api } from './base'
import { showPopup } from '@/utils/screen'
import { isFetchError } from '@/utils'

type InferUseQuery<E> = E extends ApiEndpointQuery<infer QD, any>
    ? UseQuery<QD>
    : never

type InferUseMutation<E> = E extends ApiEndpointMutation<infer QD, any>
    ? UseMutation<QD>
    : never

type InferQueryArgs<E> = E extends ApiEndpointQuery<
    QueryDefinition<infer A, any, any, any>,
    any
>
    ? A
    : never

type InferMutationArgs<E> = E extends ApiEndpointMutation<
    MutationDefinition<infer A, any, any, any>,
    any
>
    ? A
    : never

type UseQueryOptions = {
    pollingInterval?: number
    refetchOnReconnect?: boolean
    refetchOnFocus?: boolean
    skip?: boolean
    refetchOnMountOrArgChange?: boolean | number
}

export function withPopupQuery<E>(hook: InferUseQuery<E>) {
    return (args: InferQueryArgs<E>, extraArgs: UseQueryOptions) => {
        const navigation = useNavigation<any>()
        const hookRes = hook(args, extraArgs)

        if (isFetchError(hookRes)) {
            showPopup(navigation, hookRes.error.message)
        }

        return hookRes
    }
}

export function withPopupMutation<E>(hook: InferUseMutation<E>) {
    return () => {
        const [func, state] = hook()
        const navigation = useNavigation<any>()

        const useFunc = async (args: InferMutationArgs<E>) => {
            const funcRes = await func(args)

            if (isFetchError(funcRes)) {
                showPopup(navigation, funcRes.error.message)
            }
            return funcRes
        }
        return [useFunc as typeof func, state as typeof state]
    }
}
