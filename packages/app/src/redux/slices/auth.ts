import { createSlice } from '@reduxjs/toolkit'
import { User } from '@recipes/api-types/v1'

type AuthUser = Omit<User, 'settings'>

export interface Auth {
    dataLoaded: boolean
    loadingData: boolean
    responsePending: boolean
    error: string
    token: string
    user: AuthUser
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
