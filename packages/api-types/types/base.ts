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

export type Join<K, P> = K extends string | number
    ? P extends string | number
        ? `${K}${'' extends P ? '' : '' extends K ? '' : '.'}${P}`
        : never
    : never

export type JoinWithoutNumber<K, P> = K extends string | number
    ? P extends string
        ? `${K}${'' extends P ? '' : '' extends K ? '' : '.'}${P}`
        : never
    : never

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

export type StringKeys<T> = keyof T extends string ? keyof T : never

export type Paths<T> = T extends object
    ? {
          [K in keyof T]-?: K extends string
              ? JoinWithoutNumber<K, Paths<T[K]>>
              : K extends number
              ? JoinWithoutNumber<'', Paths<T[K]>>
              : never
      }[keyof T]
    : ''

export type StringLeaves<T> = T extends object
    ? {
          [K in keyof T]-?: T[K] extends object | string
              ? K extends number
                  ? JoinWithoutNumber<'', StringLeaves<T[K]>>
                  : JoinWithoutNumber<K, StringLeaves<T[K]>>
              : never
      }[keyof T]
    : ''

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
