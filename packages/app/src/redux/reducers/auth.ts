export const AUTH_ACTIONS = {
    AWAIT_RESPONSE: 'authLoadingStart',
    RESPONSE_ERROR: 'authLoadingError',

    LOADING_START: 'loadingStart',
    LOADING_ERROR: 'loadingError',

    SET_TOKEN: 'setToken',
    SIGN_OUT_SUCCES: 'signOutSucces',
    SIGN_UP_SUCCES: 'signUpSucces',

    GET_USER_DATA_SUCCES: 'getUserData',

    CLEAR_ERROR: 'clearError',
}

export interface Auth {
    dataLoaded: boolean
    loadingData: boolean
    awaitingResponse: boolean
    error: string
    user: AuthUser
}

export interface AuthUser {
    id: number
    name: string
    email: string
    token: string
}

const initialState: Auth = {
    dataLoaded: false,
    loadingData: false,
    awaitingResponse: false,
    error: '',
    user: {
        id: -1,
        name: '',
        email: '',
        token: '',
    },
}

const auth = (
    state = initialState,
    action: { type: string; payload: any }
): Auth => {
    switch (action.type) {
        // WAITING FOR SERVER RESPONSE
        case AUTH_ACTIONS.AWAIT_RESPONSE: {
            return { ...state, awaitingResponse: true }
        }

        case AUTH_ACTIONS.RESPONSE_ERROR: {
            const { error } = action.payload
            return { ...state, error, awaitingResponse: false }
        }

        // ASYNC LOADING OF DATA
        case AUTH_ACTIONS.LOADING_START: {
            return { ...state, loadingData: true }
        }

        case AUTH_ACTIONS.LOADING_ERROR: {
            const { error } = action.payload
            return { ...initialState, error }
        }

        // AUTH SUCCES ACTIONS
        case AUTH_ACTIONS.SIGN_UP_SUCCES: {
            return { ...state, error: '', awaitingResponse: false }
        }

        case AUTH_ACTIONS.SIGN_OUT_SUCCES: {
            return initialState
        }

        case AUTH_ACTIONS.GET_USER_DATA_SUCCES: {
            const { userData } = action.payload
            const user = { ...userData }
            return {
                ...state,
                user,
                awaitingResponse: false,
                loadingData: false,
                dataLoaded: true,
            }
        }

        // CLEAR ERROR AND DEFAULT
        case AUTH_ACTIONS.CLEAR_ERROR: {
            return { ...state, error: '' }
        }

        default:
            return state
    }
}

export default auth
