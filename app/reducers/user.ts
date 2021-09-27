export const USER_ACTIONS = {
    GET_USER_START: 'getUserStart',
    GET_USER_SUCCES: 'getUserSucces',
    GET_USER_ERROR: 'getUserError',
    CLEAR_USER: 'clearUser',
}

export type AuthUser = {
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

const user = (
    state = initialState,
    action: { type: string; payload: AuthUser }
): AuthUser => {
    switch (action.type) {
        case USER_ACTIONS.GET_USER_START: {
            return { ...state, loading: true }
        }

        case USER_ACTIONS.GET_USER_SUCCES: {
            return { ...state, ...action.payload, loading: false }
        }

        case USER_ACTIONS.GET_USER_ERROR: {
            return { ...state, error: action.payload.error, loading: false }
        }

        case USER_ACTIONS.CLEAR_USER: {
            return initialState
        }

        default:
            return state
    }
}

export default user
