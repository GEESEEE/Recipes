export const INITIALIZATION_ACTIONS = {
    DONE: 'initDone'
}

const initialState = false

const initialized = (
    state = initialState,
    action: { type: string; payload: any }
): boolean => {
    switch (action.type) {
        case INITIALIZATION_ACTIONS.DONE: {
            return true
        }

        default:
            return state
    }
}

export default initialized
