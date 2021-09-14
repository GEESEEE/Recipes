import * as SecureStore from 'expo-secure-store'
import {
    NavigationScreenProp,
    NavigationActions,
    StackActions,
} from 'react-navigation'
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
            }
        } catch (err: any) {
            dispatch({
                type: AUTH_ACTIONS.RETRIEVE_TOKEN_ERROR,
                payload: {
                    err:
                        err?.response?.data?.errors?.[0]?.message ??
                        'Could not connect to server',
                },
            })
        }
    }

export const signUp =
    (
        userData: { name: string; password: string; email: string },
        navigation: NavigationScreenProp<string>
    ): any =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: AUTH_ACTIONS.SIGN_UP_START,
            payload: {},
        })
        try {
            await authService.signUp(userData)
            dispatch({ type: AUTH_ACTIONS.SIGN_UP_SUCCES, payload: {} })
            navigation.goBack()
        } catch (err: any) {
            dispatch({
                type: AUTH_ACTIONS.SIGN_UP_ERROR,
                payload: {
                    error:
                        err?.response?.data?.errors?.[0]?.message ??
                        'Could not connect to server',
                },
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
        dispatch({
            type: AUTH_ACTIONS.SIGN_IN_START,
            payload: {},
        })
        try {
            const token = await authService.signIn(username, password)
            await SecureStore.setItemAsync('token', token)
            dispatch({ type: AUTH_ACTIONS.SIGN_IN_SUCCES, payload: { token } })
            dispatch(getUserData(token))

            navigation.navigate('Main')
        } catch (err: any) {
            dispatch({
                type: AUTH_ACTIONS.SIGN_IN_ERROR,
                payload: {
                    error:
                        err?.response?.data?.errors?.[0]?.message ??
                        'Could not connect to server',
                },
            })
        }
    }

export const signOut =
    (token: string, navigation: NavigationScreenProp<string>): any =>
    async (dispatch: Dispatch): Promise<any> => {
        dispatch({ type: AUTH_ACTIONS.SIGN_OUT_START, payload: {} })
        try {
            await SecureStore.deleteItemAsync('token')
            dispatch(clearUserData())
            dispatch({ type: AUTH_ACTIONS.SIGN_OUT_SUCCES, payload: {} })
            navigation.navigate('Login')
            await authService.signOut({ token })
        } catch (err) {
            console.error(err)
            dispatch({
                type: AUTH_ACTIONS.SIGN_OUT_ERROR,
                payload: {
                    error: 'Could not connect to server, but signed out anyway',
                },
            })
        }
    }

export const clearError =
    (): any =>
    async (dispatch: Dispatch): Promise<any> => {
        dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR, payload: {} })
    }
