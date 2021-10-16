// eslint-disable-next-line import/no-unresolved
import { APPLICATION_ID } from '@env'
import handleError from './base'

type TokenBody = {
    client_id: string
    username: string
    password: string
    scope: string
    grant_type: string
}

export async function signUp(body: {
    name: string
    password: string
    email: string
}): Promise<{ id: number }> {
    return handleError('POST', '/auth/register', { body })
}

export async function signIn(
    username: string,
    password: string
): Promise<string> {
    const tokenBody: TokenBody = {
        client_id: APPLICATION_ID,
        username,
        password,
        scope: 'create delete',
        grant_type: 'password',
    }
    const tokenObject: any = await handleError('POST', `/auth/token`, {
        body: tokenBody,
    })
    return tokenObject.access_token
}

export async function signOut(headers: { token: string }): Promise<boolean> {
    return handleError('POST', `/auth/revoke`, { headers })
}

export async function verifyToken(): Promise<any> {
    return handleError('GET', '/auth/info')
}
