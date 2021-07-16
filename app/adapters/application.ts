import axios, { AxiosPromise, Method } from "axios"
// eslint-disable-next-line import/no-unresolved
import { API_URL} from '@env'


export default function applicationAdapter(method: Method, pathName: string, data?: any): AxiosPromise {
    return axios({
        url: `${API_URL ?? '127.0.0.1'}/${pathName}`,
        method,
        data
    })
}
