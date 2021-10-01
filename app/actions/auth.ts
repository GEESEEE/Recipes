import * as SecureStore from 'expo-secure-store'
import { Dispatch } from 'redux'
import { AUTH_ACTIONS, SETTINGS_ACTIONS } from '@/reducers'
import { authService, userService } from '@/services'
import { routeUtils } from '@/config'
import { retrieveRecipes } from './my-recipes'
import { getRecipes } from './browse-recipes'
import { AuthUser } from '@/reducers/auth'

export const retrieveToken =
    (navigation: any): any =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: AUTH_ACTIONS.LOADING_START,
            payload: {},
        })
        try {
            const token = await SecureStore.getItemAsync('token')
            if (token) {
                const result = await authService.verifyToken({ token })
                if (result) {
                    await dispatch(retrieveUserData(token, false, navigation))
                    return
                }
            }
            dispatch({
                type: AUTH_ACTIONS.LOADING_ERROR,
                payload: { error: '' },
            })
        } catch (err: any) {
            routeUtils.handleAPIError(
                err,
                navigation,
                dispatch,
                AUTH_ACTIONS.LOADING_ERROR
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
            type: AUTH_ACTIONS.AWAIT_RESPONSE,
            payload: {},
        })
        try {
            await authService.signUp(userData)
            dispatch({ type: AUTH_ACTIONS.SIGN_UP_SUCCES, payload: {} })
        } catch (err: any) {
            routeUtils.handleAPIError(
                err,
                navigation,
                dispatch,
                AUTH_ACTIONS.RESPONSE_ERROR
            )
        }
    }

export const signIn =
    (username: string, password: string, navigation: any): any =>
    async (dispatch: Dispatch) => {
        dispatch({
            type: AUTH_ACTIONS.AWAIT_RESPONSE,
            payload: {},
        })
        try {
            const token = await authService.signIn(username, password)
            await SecureStore.setItemAsync('token', token)

            await dispatch(retrieveUserData(token, true, navigation))
        } catch (err: any) {
            routeUtils.handleAPIError(
                err,
                navigation,
                dispatch,
                AUTH_ACTIONS.RESPONSE_ERROR
            )
        }
    }

export const retrieveUserData =
    (token: string, startLoading: boolean, navigation: any): any =>
    async (dispatch: Dispatch) => {
        if (startLoading) {
            dispatch({
                type: AUTH_ACTIONS.LOADING_START,
                payload: {},
            })
        }
        try {
            const user = await userService.getUser({ token })
            await dispatch({
                type: SETTINGS_ACTIONS.SET_SETTINGS,
                payload: {
                    invertedColors: user.settings?.invertedColors,
                    color: user.settings?.color,
                    newTheme: user.settings?.theme,
                },
            })
            await dispatch(retrieveRecipes(navigation) as any)
            await dispatch(
                getRecipes({
                    scopes: ['published'],
                    sort: ['-publishtime'],
                }) as any
            )
            const authUser: AuthUser = { ...user, token }
            dispatch({
                type: AUTH_ACTIONS.GET_USER_DATA_SUCCES,
                payload: { userData: authUser },
            })
        } catch (err: any) {
            routeUtils.handleAPIError(
                err,
                navigation,
                dispatch,
                AUTH_ACTIONS.LOADING_ERROR
            )
        }
    }

export const signOut =
    (token: string, navigation: any): any =>
    async (dispatch: Dispatch): Promise<any> => {
        dispatch({ type: AUTH_ACTIONS.AWAIT_RESPONSE, payload: {} })
        try {
            await SecureStore.deleteItemAsync('token')
            dispatch({ type: AUTH_ACTIONS.SIGN_OUT_SUCCES, payload: {} })
            dispatch({ type: SETTINGS_ACTIONS.RESET_SETTINGS, payload: {} })
            await authService.signOut({ token })
        } catch (err: any) {
            routeUtils.handleAPIError(
                err,
                navigation,
                dispatch,
                AUTH_ACTIONS.RESPONSE_ERROR,
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
