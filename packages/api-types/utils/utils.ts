import pickBy from 'lodash/pickBy'

type Class<T> = new (...args: any[]) => T
type Instance = { [key: string]: any }

export function fitToClass<T, U extends T>(object: U, subclass: Class<T>): T {
    const instance = new subclass()
    return fitToInstance(object, instance)
}

export function fitToInstance<T extends Instance, U extends T>(
    obj1: U,
    obj2: T
): T {
    const res = pickBy(obj1, (val, key) => {
        return key in obj2 && typeof val === typeof obj2[key]
    })

    for (const key in obj1) {
        if (key in obj2) {
            const val1 = obj1[key]
            const val2 = obj2[key]
            if (
                typeof val1 === 'object' &&
                typeof val2 === 'object' &&
                val1 !== null &&
                val2 !== null
            ) {
                res[key] = fitToInstance(val1, val2)
            }
        }
    }
    return res as T
}

export function capitalize(str: string): string {
    if (str.length > 0) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    return str
}
