export type Copy<T> = {
    [P in keyof T]: T[P]
}

export type Class<T> = new (...args: any[]) => T

export type Instance = { [key: string]: any }

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

export type ObjectKeys<T> = {
    [P in keyof T]: IfIncludes<
        { [Q in P]: object },
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

export type JustPrimitive<T> = Omit<T, ObjectKeys<T>>

export type JustObjects<T> = {
    [P in ObjectKeys<T>]: T[P]
}

// Useful types
export type Require<T, Req extends keyof T> = Omit<T, Req> &
    Required<Pick<T, Req>>

export type Optional<T, Opt extends keyof T> = Omit<T, Opt> &
    Partial<Pick<T, Opt>>

export type WithoutId<T> = Omit<T, 'id'>
