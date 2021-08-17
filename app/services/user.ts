import { User } from '../reducers/user'
import handleError from './base'

export async function getUser(headers: { token: string }): Promise<User> {
    return handleError('GET', `/users`, { headers })
}
