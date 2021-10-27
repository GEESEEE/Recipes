import { useRoute } from '@react-navigation/native'

export function useSearch(): string {
    const route = useRoute() as {
        params?: { headerSearch: string }
    }
    let search = ''
    if (
        typeof route.params !== 'undefined' &&
        typeof route.params.headerSearch !== 'undefined' &&
        route.params.headerSearch.length > 0
    ) {
        search = route.params.headerSearch
    }
    return search
}
