import { useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store'
import { useUpdateEffect } from '../util/update-effect'
import { useAppDispatch } from '../redux'
import { useReports } from './report'
import { authActions, authService } from '@/redux'

export function useVerifyToken() {
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(true)
    const [verifyToken, verifyTokenStatus] =
        authService.useVerifyTokenMutation()
    useReports()

    useUpdateEffect(() => {
        setLoading(verifyTokenStatus.isLoading)
    }, [verifyTokenStatus.isLoading])

    async function retrieveToken(): Promise<void> {
        const token = await SecureStore.getItemAsync('token')
        if (token) {
            const res = await verifyToken(token)
            if ('data' in res) {
                await dispatch(authActions.login({ user: res.data, token }))
            }
        } else {
            setLoading(false)
        }
    }

    useEffect(() => {
        retrieveToken()
    }, [])

    return [loading]
}
