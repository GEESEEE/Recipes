import pickBy from 'lodash/pickBy'

type Class<T> = new (...args: any[]) => T

export function fit<T, U extends T>(object: U, subclass: Class<T>): T {
    const instance = new subclass()
    console.log('\n')
    return intersection(
        object as Record<string, unknown>,
        instance as Record<string, unknown>
    ) as T
}

export function intersection(
    obj1: Record<string, unknown>,
    obj2: Record<string, unknown>
): Record<string, unknown> {
    obj1 = pickBy(obj1, (val, key) => {
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
                obj1[key] = intersection(
                    val1 as Record<string, unknown>,
                    val2 as Record<string, unknown>
                )
            }
        }
    }
    return obj1
}

export function capitalize(str: string): string {
    if (str.length > 0) {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }
    return str
}
