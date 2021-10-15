import axios, { AxiosPromise, Method } from 'axios'
// eslint-disable-next-line import/no-unresolved
import { API_URL } from '@env'

const V1 = 'v1'

export default function applicationAdapter(
    method: Method,
    pathName: string,
    headers?: Record<string, unknown>,
    data?: Record<string, unknown> | unknown[]
): AxiosPromise {
    if (typeof headers?.token !== 'undefined') {
        headers = {
            ...headers,
            token: undefined,
            authorization: `Bearer ${headers.token}`,
        }
    }

    console.log('PATH:', `${API_URL ?? '127.0.0.1'}/${V1}${pathName}`)
    // API_URL
    return axios({
        url: `${
            'http://7fc9-5-132-11-58.ngrok.io' ?? '127.0.0.1'
        }/${V1}${pathName}`,
        method,
        data,
        headers,
    })
}
