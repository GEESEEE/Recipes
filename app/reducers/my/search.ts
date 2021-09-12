import { initialSearchState } from "../../actions/search"

export const MY_SEARCH_ACTIONS = {
    ADD_SEARCH: 'addMySearch',
    REMOVE_SEARCH: 'removeMySearch',
    SET_SEARCH: 'setMySearch',
}

const mySearch = (
    state = initialSearchState,
    action: { type: string, payload: any }
): string[] => {
    switch (action.type) {
        case MY_SEARCH_ACTIONS.ADD_SEARCH: {
            const { search } = action.payload
            return [...state, search]
        }

        case MY_SEARCH_ACTIONS.REMOVE_SEARCH: {
            const { search } = action.payload
            return state.filter(s => s !== search)
        }

        default: {
            return state
        }
    }
}

export default mySearch
