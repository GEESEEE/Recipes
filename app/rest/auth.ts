import handleError from './base'

export async function signUp(body: {
    name: string
    password: string
    email: string
}): Promise<{ id: number }> {
    return handleError('POST', '/auth/register', { body })
}

export async function signIn(body: {
    username: string
    password: string
}): Promise<string> {
    return handleError('POST', `/auth/token`, { body })
}

export async function signOut(headers: { token: string }): Promise<boolean> {
    return handleError('POST', `/auth/revoke`, { headers })
}

export async function verifyToken(headers: { token: string }): Promise<any> {
    return handleError('GET', '/auth/info', { headers })
}
