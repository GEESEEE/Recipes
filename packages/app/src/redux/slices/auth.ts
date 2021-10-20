import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@recipes/api-types/v1'
import { fitToInstance } from '@recipes/api-types/utils'
import { AppDispatch } from '../store'

type AuthUser = Omit<User, 'settings'>

export interface Auth {
    token: string
    user: AuthUser
}

const initialState: Auth = {
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
