import { RecipeSortType, SortStateType } from "../../actions/sort"

export const BROWSE_SORT_ACTIONS = {
    ADD_SORT: 'addBrowseSort',
    REMOVE_SORT: 'removeBrowseSort',
    SWAP_SORT: 'swapBrowseSort',
    TOGGLE_SORT: 'toggleBrowseSort'
}



const initialState: SortStateType = {
    sortState: [],
    orders: {
        publishtime: true,
        preparetime: true,
        peoplecount: true,
        ingredientcount: true,
        instructioncount: true,
    }
}

const browseSort = (
    state = initialState,
    action: { type: string; payload: {sort: RecipeSortType} }
): SortStateType => {
    switch (action.type) {
        case BROWSE_SORT_ACTIONS.ADD_SORT: {
            const { sort } = action.payload
            const sortState = [...state.sortState, sort]
            return { sortState , orders: state.orders}
        }

        case BROWSE_SORT_ACTIONS.REMOVE_SORT: {
            const { sort } = action.payload
            const sortState = state.sortState.filter(s => !s.includes(sort))
            return { sortState, orders: state.orders}
        }

        case BROWSE_SORT_ACTIONS.SWAP_SORT: {
            const { sort } = action.payload
            const sortState = state.sortState.map(s => {
                if (s.includes(sort)) {
                    return s.charAt(0) === '-' ?  s.slice(1) : `-${s}`
                }
                return s
            })
            const {orders} = state
            orders[sort] = !state.orders[sort]
            return { sortState, orders }
        }

        case BROWSE_SORT_ACTIONS.TOGGLE_SORT: {
            const { sort } = action.payload
            const {orders} = state
            orders[sort] = !state.orders[sort]
            return {sortState: state.sortState, orders}
        }

        default: {
            return state
        }
    }
}

export default browseSort
