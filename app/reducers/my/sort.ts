export const MY_SORT_ACTIONS = {
    ADD_SORT: 'addMySort',
    REMOVE_SORT: 'removeMySort',
    SWAP_SORT: 'swapMySort',
}

const initialState: string[] = []

const mySort = (
    state = initialState,
    action: { type: string; payload: any }
): string[] => {
    switch (action.type) {
        case MY_SORT_ACTIONS.ADD_SORT: {
            const { sort } = action.payload
            return [...state, sort]
        }

        case MY_SORT_ACTIONS.REMOVE_SORT: {
            const { sort } = action.payload
            return state.filter(s => !s.includes(sort))
        }

        case MY_SORT_ACTIONS.SWAP_SORT: {
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

export default mySort
