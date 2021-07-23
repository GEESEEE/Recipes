import * as SecureStore from 'expo-secure-store'
import { Dispatch } from 'redux'
import { AUTHACTIONS, Token } from '../reducers/auth'
import * as authService from '../services/auth'

export type authPayload = {
    type: string
    payload: Token
}

export const retrieveToken =
    (navigation: any): any =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: AUTHACTIONS.RETRIEVE_TOKEN_START,
            payload: {},
        })
        try {
            const token = await SecureStore.getItemAsync('token')
            if (token) {
                const result = await authService.verifyToken({ token })
                if (result) {
                    dispatch({
                        type: AUTHACTIONS.RETRIEVE_TOKEN_SUCCES,
                        payload: { token },
                    })
                    navigation.navigate('Main')
                }
            } else {
                dispatch({
                    type: AUTHACTIONS.RETRIEVE_TOKEN_ERROR,
                    payload: { err: 'No credentials found in storage' },
                })
            }
        } catch (err) {
            dispatch({
                type: AUTHACTIONS.RETRIEVE_TOKEN_ERROR,
                payload: { err: err.message },
            })
        }
    }

export const signUp =
    (
        userData: { name: string; password: string; email: string },
        navigation: any
    ): any =>
    async (dispatch: Dispatch) => {
        try {
            await authService.signUp(userData)
            dispatch({ type: AUTHACTIONS.SIGN_UP_SUCCES, payload: {} })
            navigation.goBack()
        } catch (err) {
            dispatch({
                type: AUTHACTIONS.SIGN_UP_ERROR,
                payload: { error: err.message },
            })
        }
    }

export const signIn =
    (username: string, password: string, navigation: any): any =>
    async (dispatch: Dispatch) => {
        try {
            const token = await authService.signIn({ username, password })
            await SecureStore.setItemAsync('token', token)
            dispatch({ type: AUTHACTIONS.SIGN_IN_SUCCES, payload: { token } })
            navigation.navigate('Main')
        } catch (err) {
            dispatch({
                type: AUTHACTIONS.SIGN_IN_ERROR,
                payload: { error: err.message },
            })
        }
    }

export const signOut =
    (token: string, navigation: any): any =>
    async (dispatch: Dispatch): Promise<any> => {
        try {
            await authService.signOut({ token })
            await SecureStore.deleteItemAsync('token')
            dispatch({ type: AUTHACTIONS.SIGN_OUT_SUCCES, payload: {} })
            navigation.navigate('Login')
        } catch (err) {
            dispatch({
                type: AUTHACTIONS.SIGN_OUT_ERROR,
                payload: { error: err.message },
            })
        }
    }
