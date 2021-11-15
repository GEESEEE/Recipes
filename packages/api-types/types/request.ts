export enum RequestError {
    FORBIDDEN = 403,
    NOT_FOUND = 404,
}

export type ModifyError = {
    id: number
    statusCode: RequestError
    statusMessage: string
}

export type PaginationObject<T> = {
    from: number | null
    to: number
    per_page: number
    total: number
    current_page: number
    prev_page?: number | null
    next_page?: number | null
    last_page: number | null
    data: T[]
}

export type PaginationParams = {
    page?: number
    perPage?: number
}

export type SortQueryTuple<T extends string> = [T, 'ASC' | 'DESC']

export type ScopeParams<S, A, O extends string, Q extends boolean> = {
    scopes?: S[]
    args?: A
    sort?: Q extends false ? SortQueryTuple<O>[] : O[]
}
