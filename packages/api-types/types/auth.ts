export type RegisterParams = { name: string; password: string; email: string }

export type LoginParams = { username: string; password: string }

export type LoginResult = { access_token: string; token_type: string }
