import React from 'react'
import * as Keychain from 'react-native-keychain'

export const AuthContext = React.createContext<any>(undefined)





function reducer(authContext: AuthContext = initialState, action : any): AuthContext {
    switch (action.type) {
        case AUTHACTIONS.REGISTER: {
            return authContext
        }

        case AUTHACTIONS.SIGN_IN: {
            const {token, name, userId} = action.payload
            storeAuthContext(name, token)
            return {name, token, userId}
        }

        case AUTHACTIONS.SIGN_OUT: {
            storeAuthContext('', '')
            return initialState
        }

        case AUTHACTIONS.RETRIEVE_TOKEN: {
            const {token, name, userId} = action.payload
            return { token, name, userId}
        }

        default:
            return authContext
    }
}

async function storeToken(loginName: string, token: string): Promise<boolean> {
    try {
        await Keychain.setGenericPassword(loginName, token)
        return true
    } catch (err) {
        return false
    }
}

export function AuthContextProvider( { children }: {children: JSX.Element}): JSX.Element {
    const [authContext, authContextDispatch] = React.useReducer(reducer, initialState)

    const initContext = async (): Promise<void> => {
        try {
            const result = await Keychain.getGenericPassword()
            if (result) {
                const {username, password} = result
                const {token, userId} = JSON.parse(password)
                authContextDispatch({type: AUTHACTIONS.RETRIEVE_TOKEN, payload: {token, name: username, userId}})
            }
        } catch (err) {
            console.error(err)
        }
    }

    React.useEffect( () => {
        initContext()
    }, [])

    return (
        <AuthContext.Provider value={{authContext, authContextDispatch}} >
                {children}
        </AuthContext.Provider>
    )
}
