import { LoginParams } from '@recipes/api-types/v1'
import * as SecureStore from 'expo-secure-store'
import { useState } from 'react'
import { useAppDispatch } from '../redux'
import { authActions, authService, userService } from '@/redux'
import { isFetchError } from '@/utils'

export function useLogin(): [
    (args: LoginParams) => Promise<void>,
    string,
    boolean,
    boolean
] {
    const dispatch = useAppDispatch()
    const [error, setError] = useState('')

    const [signIn, signInStatus] = authService.useSignInMutation()
    const [getUser, getUserStatus] = userService.useGetUserMutation()

    async function login(loginData: LoginParams) {
        let res: any = await signIn(loginData)
        if (isFetchError(res)) {
            setError(res.error.message)
            return
        }

        if ('data' in res) {
            const token = res.data.access_token
            await SecureStore.setItemAsync('token', token)

            res = await getUser(token)
            if ('data' in res) {
                dispatch(authActions.login({ user: res.data, token }))
                return
            }
        }
    }

    return [login, error, signInStatus.isLoading, getUserStatus.isLoading]
}
