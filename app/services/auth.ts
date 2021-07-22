import handleError from './base'
import { APIError } from "../config/constants"

export async function signUp(body: {name: string, password: string, email: string}): Promise<{id: number} | APIError> {
    return handleError(
        'POST',
        '/auth/register',
        {body}
    )
}

export async function signIn(body: {name?: string, password: string, email?: string}): Promise<string  | APIError> {
    return handleError(
        'POST',
        `/auth/token`,
        {body}
    )
}

export async function signOut(headers: {token: string}): Promise<boolean | APIError> {
    return handleError(
        'POST',
        `/auth/revoke`,
        {headers}
    )
}

export async function verifyToken(headers: {token: string}): Promise<any | APIError> {
    return handleError(
        'GET',
        '/auth/info',
        {headers}
    )
}
