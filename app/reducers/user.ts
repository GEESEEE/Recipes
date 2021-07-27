export const USERACTIONS = {
    GET_USER_SUCCES: 'getUserSucces',
    GET_USER_ERROR: 'getUserError',
    CLEAR_USER: 'clearUser',
}

export type User = {
    id: number,
    name: string,
    email: string,
    error: string
}

const initialState = {
    id: -1,
    name: '',
    email: '',
    error: '',
}

const auth = (
    state = initialState,
    action: { type: string; payload: User }
): User => {
    switch (action.type) {
        case USERACTIONS.GET_USER_SUCCES: {
            return { ...state, ...action.payload }
        }

        case USERACTIONS.GET_USER_ERROR: {
            return { ...state, error: action.payload.error }
        }

        case USERACTIONS.CLEAR_USER: {
            return initialState
        }

        default:
            return state
    }
}

export default auth
