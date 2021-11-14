export type SortQueryTuple<T extends string> = [T, 'ASC' | 'DESC']

export function decodeQueryParams(param = ''): string[] | undefined {
    const result = param.split(',').filter((value) => value !== '')

    return result.length > 0 ? result : undefined
}

export function decodeSortQuery<T extends string>(
    param = ''
): SortQueryTuple<T>[] | undefined {
    const result = param
        .split(',')
        .filter((value) => value !== '')
        .map((sort) => {
            if (sort.charAt(0) === '-') {
                return [sort.substring(1), 'DESC'] as SortQueryTuple<T>
            } else {
                return [sort, 'ASC'] as SortQueryTuple<T>
            }
        })

    return result.length > 0 ? result : undefined
}
