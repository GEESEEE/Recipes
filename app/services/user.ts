import { Settings, User } from '../data'
import handleError from './base'

export async function getUser(headers: { token: string }): Promise<User> {
    return handleError('GET', `/users`, { headers })
}

export async function getSettings(): Promise<Settings> {
    return handleError('GET', `/users/settings`, {})
}

export async function updateSettings(body: {
    theme?: string
    color?: string
    invertedColors?: boolean
}): Promise<void> {
    return handleError('PUT', `/users/settings`, { body })
}
