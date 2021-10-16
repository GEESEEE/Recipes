import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'
import { AppDispatch } from '@/redux'
import { SignUpParams, SignInParams } from '@/redux/services/auth'

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

export const authActions = actions


// authActions to use in other files

export default authSlice.reducer
