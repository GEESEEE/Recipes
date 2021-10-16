import { createSlice } from '@reduxjs/toolkit'

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

export const authActions = authSlice.actions

// authActions to use in other files

export default authSlice.reducer
