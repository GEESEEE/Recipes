import { QueryDefinition } from '@reduxjs/toolkit/dist/query'
import { ApiEndpointQuery } from '@reduxjs/toolkit/dist/query/core/module'
import { UseQuery } from '@reduxjs/toolkit/dist/query/react/buildHooks'
import { api } from './base'

type EndpointKey = keyof typeof api.endpoints
type Endpoint<EndpointName extends EndpointKey> =
    typeof api.endpoints[EndpointName]
type InferArgs<E> = E extends ApiEndpointQuery<
    QueryDefinition<infer A, any, any, any>,
    any
>
    ? A
    : never
type InferArgsKeys<E> = keyof InferArgs<E>
type InferUseQuery<E> = E extends ApiEndpointQuery<infer QD, any>
    ? UseQuery<QD>
    : never
type InferQD<E> = E extends ApiEndpointQuery<infer QD, any> ? QD : never
type InferOptions<E extends EndpointKey> = Parameters<
    Endpoint<E>['useQuery']
>[1]
type InferQdParms<E> = E extends ApiEndpointQuery<
    QueryDefinition<any, infer B, infer C, infer D>,
    any
>
    ? [B, C, D]
    : never
type ReturnQuery<E, A> = E extends ApiEndpointQuery<
    QueryDefinition<any, infer B, infer C, infer D>,
    any
>
    ? UseQuery<QueryDefinition<A, B, C, D>>
    : never
