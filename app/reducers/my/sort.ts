import { initialSortState, RecipeSortType, SortStateType } from "../../actions/sort"

export const MY_SORT_ACTIONS = {
    ADD_SORT: 'addMySort',
    REMOVE_SORT: 'removeMySort',
    SWAP_SORT: 'swapMySort',
    TOGGLE_SORT: 'toggleMySort',
}

const mySort = (
    state = initialSortState,
    action: { type: string; payload: {sort: RecipeSortType} }
): SortStateType => {
    switch (action.type) {
        case MY_SORT_ACTIONS.ADD_SORT: {
            const { sort } = action.payload
            const sortState = [...state.sortState, sort]
            return { sortState , orders: state.orders}
        }

        case MY_SORT_ACTIONS.REMOVE_SORT: {
            const { sort } = action.payload
            const sortState = state.sortState.filter(s => !s.includes(sort))
            return { sortState, orders: state.orders}
        }

        case MY_SORT_ACTIONS.SWAP_SORT: {
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

        case MY_SORT_ACTIONS.TOGGLE_SORT: {
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

export default mySort
