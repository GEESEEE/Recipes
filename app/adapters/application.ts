import axios, { AxiosPromise, Method } from 'axios'
// eslint-disable-next-line import/no-unresolved
import { API_URL } from '@env'

const V1 = 'v1'

export default function applicationAdapter(
    method: Method,
    pathName: string,
    data?: any
): AxiosPromise {
    return axios({
        url: `${API_URL ?? '127.0.0.1'}/${V1}${pathName}`,
        method,
        data,
    })
}
