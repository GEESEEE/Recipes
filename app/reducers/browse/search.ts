import { initialSearchState } from '../../actions/search'

export const BROWSE_SEARCH_ACTIONS = {
    ADD_SEARCH: 'addBrowseSearch',
    REMOVE_SEARCH: 'removeBrowseSearch',
    SET_SEARCH: 'setBrowseSearch',
}

const browseSearch = (
    state = initialSearchState,
    action: { type: string; payload: any }
): string[] => {
    switch (action.type) {
        case BROWSE_SEARCH_ACTIONS.ADD_SEARCH: {
            const { search } = action.payload
            return [...state, search]
        }

        case BROWSE_SEARCH_ACTIONS.REMOVE_SEARCH: {
            const { search } = action.payload
            return state.filter((s) => s !== search)
        }

        default: {
            return state
        }
    }
}

export default browseSearch
