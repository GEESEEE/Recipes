export enum RequestError {
    FORBIDDEN = 403,
    NOT_FOUND = 404,
}

export type ModifyError = {
    id: number
    statusCode: RequestError
    statusMessage: string
}

export type PaginationObject = {
    from: number | null
    to: number
    per_page: number
    total: number
    current_page: number
    prev_page?: number | null
    next_page?: number | null
    last_page: number | null
    data: any
}
