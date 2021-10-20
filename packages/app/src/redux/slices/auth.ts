import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@recipes/api-types/v1'
import { fitToInstance } from '@recipes/api-types/utils'

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
        login(state, action: PayloadAction<{ user: User; token: string }>) {
            state.responsePending = false
            state.loadingData = false
            state.dataLoaded = true

            const { user, token } = action.payload
            const authUser = fitToInstance(user, initialState.user)
            state.user = authUser
            state.token = token
        },

        logout() {
            return initialState
        },
    },
})

export const authActions = authSlice.actions

export const authReducer = authSlice.reducer
