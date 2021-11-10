import { FetchError } from '@/types'

export function isFetchError(
    queryResult: any
): queryResult is { error: FetchError } {
    return 'error' in queryResult
}
