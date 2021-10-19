import pickBy from 'lodash/pickBy'
import { Class, Instance } from '../types'

export function fitToClass<T, U extends T>(object: U, subclass: Class<T>): T {
    const instance = new subclass()
    return fitToInstance(object, instance)
}

export function fitToInstance<T extends Instance, U extends T>(
    object: U,
    instance: T
): T {
    const res = pickBy(object, (_, key) => {
        return key in instance
    })

    for (const key in object) {
        if (key in instance) {
            const val1 = object[key]
            const val2 = instance[key]
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
