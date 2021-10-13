import { createSlice } from '@reduxjs/toolkit'

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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    }
})

export default authSlice
