import * as SecureStore from 'expo-secure-store'
import { Method } from 'axios'
import applicationAdapter from '../adapters/application'

async function getTokenHeader(): Promise<{ token: string }> {
    const token = await SecureStore.getItemAsync('token')
    if (token === null) {
        return { token: '' }
    }

    return { token }
}

export default async function handleError<T>(
    method: Method,
    pathName: string,
    {
        body,
        headers,
    }: {
        body?: Record<string, unknown> | unknown[]
        headers?: Record<string, unknown>
    } = {}
): Promise<T> {
    if (typeof headers === 'undefined') {
        headers = await getTokenHeader()
    }
    if (typeof headers.token === 'undefined') {
        const token = await getTokenHeader()
        headers = { ...headers, token }
    }
    return (await applicationAdapter(method, pathName, headers, body)).data

    // if (err.response.status === 404) {
    //     return new APIError(APIErrorType.NOT_FOUND, err.response.data.errors[0].message ?? err.message)
    // }
    // return new APIError(APIErrorType.DEFAULT, err.response.data.errors[0].message ?? err.message)
}
