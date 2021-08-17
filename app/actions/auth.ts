import * as SecureStore from 'expo-secure-store'
import { NavigationScreenProp } from 'react-navigation'
import { Dispatch } from 'redux'
import { AUTH_ACTIONS } from '../reducers/auth'
import * as authService from '../services/auth'
import { clearUserData, getUserData } from './user'

export const retrieveToken =
    (navigation: NavigationScreenProp<string>): any =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: AUTH_ACTIONS.RETRIEVE_TOKEN_START,
            payload: {},
        })
        try {
            const token = await SecureStore.getItemAsync('token')
            if (token) {
                const result = await authService.verifyToken({ token })
                if (result) {
                    dispatch({
                        type: AUTH_ACTIONS.RETRIEVE_TOKEN_SUCCES,
                        payload: { token },
                    })

                    dispatch(getUserData(token))
                    navigation.navigate('Main')
                }
            } else {
                dispatch({
                    type: AUTH_ACTIONS.RETRIEVE_TOKEN_ERROR,
                    payload: { err: 'No credentials found in storage' },
                })
            }
        } catch (err) {
            dispatch({
                type: AUTH_ACTIONS.RETRIEVE_TOKEN_ERROR,
                payload: { err: err.message },
            })
        }
    }

export const signUp =
    (
        userData: { name: string; password: string; email: string },
        navigation: NavigationScreenProp<string>
    ): any =>
    async (dispatch: Dispatch) => {
        try {
            await authService.signUp(userData)
            dispatch({ type: AUTH_ACTIONS.SIGN_UP_SUCCES, payload: {} })
            navigation.goBack()
        } catch (err) {
            dispatch({
                type: AUTH_ACTIONS.SIGN_UP_ERROR,
                payload: { error: err.message },
            })
        }
    }

export const signIn =
    (
        username: string,
        password: string,
        navigation: NavigationScreenProp<string>
    ): any =>
    async (dispatch: Dispatch) => {
        try {
            const token = await authService.signIn({ username, password })
            await SecureStore.setItemAsync('token', token)
            dispatch({ type: AUTH_ACTIONS.SIGN_IN_SUCCES, payload: { token } })
            dispatch(getUserData(token))
            navigation.navigate('Main')
        } catch (err) {
            dispatch({
                type: AUTH_ACTIONS.SIGN_IN_ERROR,
                payload: { error: err.message },
            })
        }
    }

export const signOut =
    (token: string, navigation: NavigationScreenProp<string>): any =>
    async (dispatch: Dispatch): Promise<any> => {
        try {
            await authService.signOut({ token })
            await SecureStore.deleteItemAsync('token')
            dispatch({ type: AUTH_ACTIONS.SIGN_OUT_SUCCES, payload: {} })
            dispatch(clearUserData())
            navigation.navigate('Login')
        } catch (err) {
            dispatch({
                type: AUTH_ACTIONS.SIGN_OUT_ERROR,
                payload: { error: err.message },
            })
        }
    }
