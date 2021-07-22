export const AUTHACTIONS = {
    SIGN_IN: 'signIn',
    SIGN_OUT: 'signOut',
    REGISTER: 'register',
    RETRIEVE_TOKEN: 'retrieveToken',
}

export type Token = {
    token: string,
}

const initialState = {
    token: '',
}

const auth = (state = initialState, action: {type: string, payload: Token}): Token => {
    switch(action.type) {
        case AUTHACTIONS.REGISTER: {
            return state
        }

        case AUTHACTIONS.SIGN_IN: {
            const {token} = action.payload
            return {token}
        }

        case AUTHACTIONS.SIGN_OUT: {
            return initialState
        }

        case AUTHACTIONS.RETRIEVE_TOKEN: {
            const {token} = action.payload
            return { token}
        }

        default:
            return state
    }
}

export default auth
