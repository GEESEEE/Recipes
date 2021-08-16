export const AUTH_ACTIONS = {
    SIGN_IN_SUCCES: 'signInSucces',
    SIGN_IN_ERROR: 'signInError',
    SIGN_OUT_SUCCES: 'signOutSucces',
    SIGN_OUT_ERROR: 'signOutError',
    SIGN_UP_SUCCES: 'signUpSucces',
    SIGN_UP_ERROR: 'signUpError',
    RETRIEVE_TOKEN_START: 'retrieveToken',
    RETRIEVE_TOKEN_SUCCES: 'retrieveTokenSucces',
    RETRIEVE_TOKEN_ERROR: 'retrieveTokenError',
}

export type Auth = {
    loading: boolean
    token: string
    error: string
}

const initialState = {
    loading: false,
    token: '',
    error: '',
}

const auth = (
    state = initialState,
    action: { type: string; payload: Auth }
): Auth => {
    switch (action.type) {
        case AUTH_ACTIONS.SIGN_UP_SUCCES: {
            return { ...state, error: '' }
        }

        case AUTH_ACTIONS.SIGN_UP_ERROR: {
            const { error } = action.payload
            return { ...state, error }
        }

        case AUTH_ACTIONS.SIGN_IN_SUCCES: {
            const { token } = action.payload
            return { ...state, token }
        }

        case AUTH_ACTIONS.SIGN_IN_ERROR: {
            const { error } = action.payload
            return { ...state, error }
        }

        case AUTH_ACTIONS.SIGN_OUT_SUCCES: {
            return initialState
        }

        case AUTH_ACTIONS.SIGN_OUT_ERROR: {
            const { error } = action.payload
            return { ...state, error }
        }

        case AUTH_ACTIONS.RETRIEVE_TOKEN_START: {
            return { ...state, loading: true }
        }

        case AUTH_ACTIONS.RETRIEVE_TOKEN_SUCCES: {
            const { token } = action.payload
            return {token, loading: false, error: '' }
        }

        case AUTH_ACTIONS.RETRIEVE_TOKEN_ERROR: {
            const { error } = action.payload
            return { ...state, error, loading: false }
        }

        default:
            return state
    }
}

export default auth
