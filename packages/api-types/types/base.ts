import { User } from './user'

export type Class<T> = new (...args: any[]) => T

export type Instance = { [key: string]: any }

export type Primitive = number | string | boolean

export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
    ? 1
    : 2) extends <T>() => T extends Y ? 1 : 2
    ? A
    : B

export type ReadonlyKeys<T> = {
    [P in keyof T]-?: IfEquals<
        { [Q in P]: T[P] },
        { -readonly [Q in P]: T[P] },
        never,
        P
    >
}[keyof T]

export type WritableKeys<T> = {
    [P in keyof T]: IfEquals<
        { [Q in P]: T[P] },
        { -readonly [Q in P]: T[P] },
        P,
        never
    >
}[keyof T]

export type ObjectKeys<T> = {
    [P in WritableKeys<T>]: IfEquals<T[P], Primitive, T[P]>
}

type a = User
type x = ObjectKeys<User>
type y = WritableKeys<User>
