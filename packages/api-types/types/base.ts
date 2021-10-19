import { User } from './user'
import { Section } from './section'
import { Settings } from './settings'

export type Copy<T> = {
    [P in keyof T]: T[P]
}

export type Class<T> = new (...args: any[]) => T

export type Instance = { [key: string]: any }

export type Primitive = number | string | boolean

// Helper Types

export type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
    ? 1
    : 2) extends <T>() => T extends Y ? 1 : 2
    ? A
    : B

export type IfIncludes<X, Y, A = X, B = never> = (<T>() => X extends T
    ? 1
    : 2) extends <T>() => Y extends T ? 1 : 2
    ? A
    : B

// Key Types
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

export type PrimitiveKeys<T> = {
    [P in keyof T]: IfIncludes<
        { [Q in P]: Primitive },
        { [Q in P]: T[P] },
        P,
        never
    >
}[keyof T]

// Just Types
export type JustReadonly<T> = {
    readonly [P in ReadonlyKeys<T>]: T[P]
}

export type JustWritable<T> = {
    [P in WritableKeys<T>]: T[P]
}

export type JustPrimitive<T> = {
    [P in PrimitiveKeys<T>]: T[P]
}

// Useful types
export type Create<T> = JustWritable<JustPrimitive<T>>

export type UpdatableFields<T> = Partial<Create<T>>

export type Updatable<T> = JustReadonly<T> & UpdatableFields<T>
