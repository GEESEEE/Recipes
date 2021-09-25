import * as SecureStore from 'expo-secure-store'
import { Dispatch } from 'redux'
import { AUTH_ACTIONS } from '@/reducers'
import { authService } from '@/services'
import { resetTheme } from './theme'
import { clearUserData } from './user'
import { routeUtils } from '@/config'

export const retrieveToken =
    (navigation: any): any =>
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

                    navigation.navigate('Main')
                }
            }
        } catch (err: any) {
            routeUtils.handleAPIError(
                err,
                navigation,
                dispatch,
                AUTH_ACTIONS.RETRIEVE_TOKEN_ERROR
            )
        }
    }

export const signUp =
    (
        userData: { name: string; password: string; email: string },
        navigation: any
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
            routeUtils.handleAPIError(
                err,
                navigation,
                dispatch,
                AUTH_ACTIONS.SIGN_UP_ERROR
            )
        }
    }

export const signIn =
    (username: string, password: string, navigation: any): any =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: AUTH_ACTIONS.SIGN_IN_START,
            payload: {},
        })
        try {
            const token = await authService.signIn(username, password)
            await SecureStore.setItemAsync('token', token)
            dispatch({ type: AUTH_ACTIONS.SIGN_IN_SUCCES, payload: { token } })

            navigation.navigate('Main')
        } catch (err: any) {
            routeUtils.handleAPIError(
                err,
                navigation,
                dispatch,
                AUTH_ACTIONS.SIGN_IN_ERROR,
                'Could not connect to server'
            )
        }
    }

export const signOut =
    (token: string, navigation: any): any =>
    async (dispatch: Dispatch): Promise<any> => {
        dispatch({ type: AUTH_ACTIONS.SIGN_OUT_START, payload: {} })
        try {
            await SecureStore.deleteItemAsync('token')
            dispatch(clearUserData())
            dispatch({ type: AUTH_ACTIONS.SIGN_OUT_SUCCES, payload: {} })
            dispatch(resetTheme())
            navigation.navigate('Login')
            await authService.signOut({ token })
        } catch (err: any) {
            routeUtils.handleAPIError(
                err,
                navigation,
                dispatch,
                AUTH_ACTIONS.SIGN_OUT_ERROR,
                'Could not connect to server',
                'But signed out anyway'
            )
        }
    }

export const clearError =
    (): any =>
    async (dispatch: Dispatch): Promise<any> => {
        dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR, payload: {} })
    }
