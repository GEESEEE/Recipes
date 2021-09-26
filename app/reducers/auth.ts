export const AUTH_ACTIONS = {

    RETRIEVE_TOKEN_START: 'retrieveToken',
    RETRIEVE_TOKEN_SUCCES: 'retrieveTokenSucces',
    RETRIEVE_TOKEN_ERROR: 'retrieveTokenError',

    LOADING_START: 'authLoadingStart',
    LOADING_ERROR: 'authLoadingError',

    SIGN_IN_SUCCES: 'signInSucces',
    SIGN_OUT_SUCCES: 'signOutSucces',
    SIGN_UP_SUCCES: 'signUpSucces',

    CLEAR_ERROR: 'clearError',
}

export type Auth = {
    initialized: boolean
    retrieveFinished: boolean
    loading: boolean
    token: string
    error: string
}

const initialState = {
    initialized: false,
    retrieveFinished: false,
    loading: false,
    token: '',
    error: '',
}

const auth = (
    state = initialState,
    action: { type: string; payload: Auth }
): Auth => {
    switch (action.type) {
        // SIGN UP ACTIONS
        case AUTH_ACTIONS.LOADING_START: {
            return { ...state, loading: true }
        }

        case AUTH_ACTIONS.LOADING_ERROR: {
            const { error } = action.payload
            return { ...state, error, loading: false }
        }

        // AUTH SUCCES ACTIONS
        case AUTH_ACTIONS.SIGN_UP_SUCCES: {
            return { ...state, error: '', loading: false }
        }

        case AUTH_ACTIONS.SIGN_IN_SUCCES: {
            const { token } = action.payload
            return { ...state, token, error: '', loading: false }
        }

        case AUTH_ACTIONS.SIGN_OUT_SUCCES: {
            return {...initialState, retrieveFinished: true}
        }



        // RETRIEVE TOKEN ACTIONS
        case AUTH_ACTIONS.RETRIEVE_TOKEN_START: {
            return {...state, retrieveFinished: false}
        }

        case AUTH_ACTIONS.RETRIEVE_TOKEN_SUCCES: {
            const { token } = action.payload
            return { ...state, token, retrieveFinished: true, error: '' }
        }

        case AUTH_ACTIONS.RETRIEVE_TOKEN_ERROR: {
            const { error } = action.payload
            return { ...state, error, retrieveFinished: true, token: ''}
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
