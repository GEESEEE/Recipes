export const BROWSE_SORT_ACTIONS = {
    ADD_SORT: 'addBrowseSort',
    REMOVE_SORT: 'removeBrowseSort',
    SWAP_SORT: 'swapBrowseSort',
}

const initialState: string[] = []

const browseSort = (
    state = initialState,
    action: { type: string; payload: any }
): string[] => {
    switch (action.type) {
        case BROWSE_SORT_ACTIONS.ADD_SORT: {
            const { sort } = action.payload
            return [...state, sort]
        }

        case BROWSE_SORT_ACTIONS.REMOVE_SORT: {
            const { sort } = action.payload
            return state.filter(s => !s.includes(sort))
        }

        case BROWSE_SORT_ACTIONS.SWAP_SORT: {
            const { sort } = action.payload
            return state.map(s => {
                if (s.includes(sort)) {
                    return s.charAt(0) === '-' ?  s.slice(1) : `-${s}`
                }
                return s
            })
        }

        default: {
            return state
        }
    }
}

export default browseSort
