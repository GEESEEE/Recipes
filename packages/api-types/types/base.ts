export type Class<T> = new (...args: any[]) => T

export type Instance = { [key: string]: any }
