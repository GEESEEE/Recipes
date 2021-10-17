
export interface ModifyError {
    id: number
    statusCode: number
    statusMessage: string
}

export const methodMap: { [key: string]: string } = {
    POST: 'create',
    GET: 'read',
    PUT: 'update',
    DELETE: 'delete',
}
