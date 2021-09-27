import { User } from "@/data"

export const AUTH_ACTIONS = {

    RETRIEVE_TOKEN_START: 'retrieveToken',
    RETRIEVE_TOKEN_SUCCES: 'retrieveTokenSucces',
    RETRIEVE_TOKEN_ERROR: 'retrieveTokenError',

    LOADING_START: 'authLoadingStart',
    LOADING_ERROR: 'authLoadingError',

    SIGN_IN_SUCCES: 'signInSucces',
    SIGN_OUT_SUCCES: 'signOutSucces',
    SIGN_UP_SUCCES: 'signUpSucces',

    GET_USER_DATA_SUCCES: 'getUserData',

    CLEAR_ERROR: 'clearError',
}

export type Auth = {
    dataLoaded: boolean
    tokenRetrieved: boolean
    loading: boolean
    error: string
    user: {
        id: number,
        name: string
        email: string
        token: string
    }
}

const initialState: Auth = {
    dataLoaded: false,
    tokenRetrieved: false,
    loading: false,
    error: '',
    user: {
        id: -1,
        name: '',
        email: '',
        token: '',
    }
}

const auth = (
    state = initialState,
    action: { type: string; payload: any }
): Auth => {
    switch (action.type) {
        // LOADING
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
            const user = {...state.user, token}
            return { ...state, user, error: '', loading: false }
        }

        case AUTH_ACTIONS.SIGN_OUT_SUCCES: {
            return {...initialState, tokenRetrieved: true, dataLoaded: false}
        }

        case AUTH_ACTIONS.GET_USER_DATA_SUCCES: {
            const { userData } = action.payload
            const user = {...userData, token: state.user.token}
            return {...state, user, dataLoaded: true}
        }


        // RETRIEVE TOKEN ACTIONS
        case AUTH_ACTIONS.RETRIEVE_TOKEN_START: {
            return {...state, tokenRetrieved: false}
        }

        case AUTH_ACTIONS.RETRIEVE_TOKEN_SUCCES: {
            const { token } = action.payload
            const user = {...state.user, token}
            return { ...state, user, tokenRetrieved: true, error: '' }
        }

        case AUTH_ACTIONS.RETRIEVE_TOKEN_ERROR: {
            const { error } = action.payload
            const user = {...state.user, token: ''}
            return { ...state, error, tokenRetrieved: true, user}
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
