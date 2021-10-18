export type SortQueryTuple = [string, 'ASC' | 'DESC']

export function decodeQueryParams(param = ''): string[] | undefined {
    const result = param.split(',').filter((value) => value !== '')

    return result.length > 0 ? result : undefined
}

export function decodeSortQuery(param = ''): SortQueryTuple[] | undefined {
    const result = param
        .split(',')
        .filter((value) => value !== '')
        .map((sort) => {
            if (sort.charAt(0) === '-') {
                return [sort.substring(1), 'DESC'] as SortQueryTuple
            } else {
                return [sort, 'ASC'] as SortQueryTuple
            }
        })

    return result.length > 0 ? result : undefined
}
