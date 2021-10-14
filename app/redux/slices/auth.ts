import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'
import { authService, userService } from '@/services'
import { AppDispatch } from '@/redux'

export interface Auth {
    dataLoaded: boolean
    loadingData: boolean
    responsePending: boolean
    error: string
    user: AuthUser
}

export interface AuthUser {
    id: number
    name: string
    email: string
    token: string
    settingsId: number
}

const initialState: Auth = {
    dataLoaded: false,
    loadingData: false,
    responsePending: false,
    error: '',
    user: {
        id: -1,
        name: '',
        email: '',
        token: '',
        settingsId: -1,
    },
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        responsePending(state) {
            state.responsePending = true
            state.error = ''
        },

        responseRejected(state, action: PayloadAction<string>) {
            state.responsePending = false
            state.error = action.payload
        },

        startLoading(state) {
            state.loadingData = true
            state.error = ''
        },

        failedLoading(state, action: PayloadAction<string>) {
            state.loadingData = false
            state.error = action.payload
        },

        clearError(state) {
            state.error = ''
        },

        login(state, action) {
            state.responsePending = false
            state.loadingData = false
            state.dataLoaded = true

            delete action.payload.settings
            state.user = action.payload
        },

        logout() {
            return initialState
        },
    },
})

const { actions } = authSlice

export const privateAuthActions = actions

const signUp =
    (data: { name: string; password: string; email: string }) =>
    async (dispatch: AppDispatch): Promise<void> => {
        dispatch(actions.responsePending())
        let errorMessage = ''
        try {
            await authService.signUp(data)
        } catch (err: any) {
            errorMessage =
                err?.response?.data?.errors?.[0].message ??
                'Could not connect to the server'
        }
        dispatch(actions.responseRejected(errorMessage))
    }

const signOut =
    () =>
    async (dispatch: AppDispatch): Promise<void> => {
        dispatch(actions.responsePending())
        try {
            const token = (await SecureStore.getItemAsync('token')) as string
            await SecureStore.deleteItemAsync('token')
            dispatch(actions.logout())
            await authService.signOut({ token })
        } catch (err: any) {
            const errorMessage =
                err?.response?.data?.errors?.[0].message ??
                'Could not connect to the server'
            dispatch(actions.responseRejected(errorMessage))
        }
    }

const signIn =
    (data: { username: string; password: string }) =>
    async (dispatch: AppDispatch): Promise<void> => {
        try {
            const token = await authService.signIn(data.username, data.password)
            await SecureStore.setItemAsync('token', token)

            dispatch(actions.startLoading())
            try {
                const user = await userService.getUser({ token })
                dispatch(actions.login(user))
            } catch (err: any) {
                const errorMessage =
                    err?.response?.data?.errors?.[0].message ??
                    'Could not connect to the server'
                dispatch(actions.failedLoading(errorMessage))
            }
        } catch (err: any) {
            const errorMessage =
                err?.response?.data?.errors?.[0].message ??
                'Could not connect to the server'
            dispatch(actions.responseRejected(errorMessage))
        }
    }

const retrieveToken =
    () =>
    async (dispatch: AppDispatch): Promise<void> => {
        dispatch(actions.startLoading())

        let errorMessage = ''
        try {
            const user = await authService.verifyToken()
            if (user) {
                dispatch(actions.login(user))
                return
            }
        } catch (err: any) {
            errorMessage = err?.response?.data?.errors?.[0].message
            if (err?.response.status !== 400) {
                errorMessage = 'Could not connect to the server'
            }
        }
        dispatch(actions.failedLoading(errorMessage))
    }

// authActions to use in other files
const { clearError } = actions
export const authActions = {
    retrieveToken,
    signUp,
    signIn,
    signOut,
    clearError,
}

export default authSlice.reducer
