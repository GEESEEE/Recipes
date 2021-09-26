export const INITIALIZATION_ACTIONS = {
    DONE: 'initDone',
    RESET: 'initReset',
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

        case INITIALIZATION_ACTIONS.RESET: {
            return false
        }

        default:
            return state
    }
}

export default initialized
