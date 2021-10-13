import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import * as SecureStore from 'expo-secure-store'
import { authService, userService } from '@/services'

export interface Auth {
    dataLoaded: boolean
    loadingData: boolean
    awaitingResponse: boolean
    error: string
    user: AuthUser
}

export interface AuthUser {
    id: number
    name: string
    email: string
    token: string
}

const initialState: Auth = {
    dataLoaded: false,
    loadingData: false,
    awaitingResponse: false,
    error: '',
    user: {
        id: -1,
        name: '',
        email: '',
        token: '',
    },
}

const retrieveToken = createAsyncThunk('auth/retrieveToken', async () => {
    const token = await SecureStore.getItemAsync('token')
    if (token) {
        const verified = await authService.verifyToken({ token })
        console.log("retrieveToken", verified)
    }
})

const signUp = createAsyncThunk('auth/signUp', async (
    userData: { name: string; password: string; email: string },
    { dispatch, rejectWithValue }) => {
    dispatch(authSlice.actions.awaitResponse())
    try {
        await authService.signUp(userData)
    } catch ( err: any) {
        const errorMessage = err?.response?.data?.errors?.[0].message ?? 'Could not connect to the server'
        dispatch(authSlice.actions.responseRejected(errorMessage))
        throw rejectWithValue
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        awaitResponse(state) {
            state.awaitingResponse = true
            state.error = ''
            console.log("awaiting Response")
        },

        responseRejected(state, action) {
            state.awaitingResponse = false
            state.error = action.payload as string
            console.log("Request rejected")
        }
    },
    extraReducers: builder => {
        builder.addCase(retrieveToken.pending, state => {
            state.loadingData = true
        })

        builder.addCase(retrieveToken.fulfilled, (state, action) => {
            state.loadingData = false
            console.log(action)
        })

        builder.addCase(retrieveToken.rejected, state => {
            state.loadingData = false
        })

        builder.addCase(signUp.fulfilled, state => {
            state.awaitingResponse = false
            console.log("Signup fulfilled")
        })
    }
})

export const authActions = { retrieveToken, signUp }

export default authSlice
