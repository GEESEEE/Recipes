import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'
import { authService, userService } from '@/services'
import { AppDispatch } from '@/redux'
import { SignUpParams } from '@/redux/services/auth'
import { User } from '@/data'

export interface Auth {
    dataLoaded: boolean
    loadingData: boolean
    responsePending: boolean
    error: string
    token: string
    user: AuthUser
}

export interface AuthUser {
    id: number
    name: string
    email: string
    settingsId: number
}

const initialState: Auth = {
    dataLoaded: false,
    loadingData: false,
    responsePending: false,
    error: '',
    token: '',
    user: {
        id: -1,
        name: '',
        email: '',
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

            const { user, token } = action.payload
            delete user.settings
            state.user = user
            state.token = token
        },

        logout() {
            return initialState
        },
    },
})

const { actions } = authSlice

export const privateAuthActions = actions

const signUp =
    (args: {
        signUp: (data: SignUpParams) => Promise<any>
        data: SignUpParams
    }) =>
    async (dispatch: AppDispatch): Promise<void> => {
        dispatch(actions.responsePending())
        let errorMessage = ''

        const res = await args.signUp(args.data)
        if (typeof res.error !== 'undefined') {
            errorMessage =
                res.error.data?.errors?.[0].message ??
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
                dispatch(actions.login({ user, token }))
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
    (verifyToken: (token: string) => Promise<any>) =>
    async (dispatch: AppDispatch) => {
        dispatch(actions.startLoading())
        let errorMessage = ''

        const token = await SecureStore.getItemAsync('token')
        const res = await verifyToken(token as string)
        if (typeof res.data !== 'undefined') {
            dispatch(actions.login({ user: res.data, token }))
            return
        }
        errorMessage =
            res.error.data?.errors?.[0].message ??
            'Could not connect to the server'

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
