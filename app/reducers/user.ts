export const USERACTIONS = {
    GET_USER_START: 'getUserStart',
    GET_USER_SUCCES: 'getUserSucces',
    GET_USER_ERROR: 'getUserError',
    CLEAR_USER: 'clearUser',
}

export type Auth = {
    id: number
    name: string
    email: string
    error: string
    loading: boolean
}

const initialState = {
    id: -1,
    name: '',
    email: '',
    error: '',
    loading: false,
}

const auth = (
    state = initialState,
    action: { type: string; payload: Auth }
): Auth => {
    switch (action.type) {
        case USERACTIONS.GET_USER_START: {
            return { ...state, loading: true }
        }

        case USERACTIONS.GET_USER_SUCCES: {
            return { ...state, ...action.payload, loading: false }
        }

        case USERACTIONS.GET_USER_ERROR: {
            return { ...state, error: action.payload.error, loading: false }
        }

        case USERACTIONS.CLEAR_USER: {
            return initialState
        }

        default:
            return state
    }
}

export default auth
