import { StringKeys, StringLeaves } from '@recipes/api-types/v1'

export function applySearch<T>(
    items: T[],
    search: string[],
    properties: StringLeaves<T>[]
): T[] {
    if (search.length > 0) {
        const queries = search.map((s) => s.toLowerCase())

        return items.filter((item) => {
            return properties.some((property) => {
                // @ts-ignore
                const props = property.split('.')

                if (typeof item === 'object') {
                    return objectIncludesSearch(item, queries, props)
                } else if (item instanceof Array) {
                    return listIncludesSearch(item, queries, props)
                } else if (typeof item === 'string') {
                    return queries.some((query) =>
                        item.toLowerCase().includes(query)
                    )
                } else {
                    return false
                }
            })
        })
    }
    return items
}

function objectIncludesSearch<T>(
    item: T,
    search: string[],
    properties: string[]
): boolean {
    let val: any = item
    let res = false
    properties.forEach((property) => {
        if (typeof val === 'object' && val.hasOwnProperty(property)) {
            val = val[property]
        } else if (val instanceof Array) {
            const propIndex = properties.indexOf(property)
            res = listIncludesSearch(
                val,
                search,
                properties.slice(propIndex - 1)
            )
        } else {
            res = false
        }
    })
    if (typeof val === 'string') {
        return search.some((query) => {
            return val.toLowerCase().includes(query)
        })
    }
    return res
}

function listIncludesSearch<T extends object>(
    items: T[],
    search: string[],
    properties: string[]
): boolean {
    return items.some((val) => {
        let res = false
        properties.forEach((property) => {
            if (typeof val === 'object' && val.hasOwnProperty(property)) {
                res = objectIncludesSearch(val, search, properties)
            } else if (val instanceof Array) {
                res = listIncludesSearch(val, search, properties)
            } else {
                return false
            }
        })
        return res
    })
}

type Field<T> = StringKeys<T> | `-${StringKeys<T>}`

export const fieldSorter =
    <T>(fields: Field<T>[]) =>
    (o1: T, o2: T) => {
        fields
            .map((field) => {
                let dir = 1
                if (field[0] === '-') {
                    dir = -1
                    field = field.substring(1) as Field<T>
                }

                const r1Value = o1[field as keyof T]
                const r2Value = o2[field as keyof T]

                if (typeof r1Value === 'undefined' || r1Value === null) return 0
                if (typeof r2Value === 'undefined' || r2Value === null) return 0

                if (r1Value instanceof Array && r2Value instanceof Array) {
                    return r1Value.length > r2Value.length
                        ? dir
                        : r1Value.length < r2Value.length
                        ? -dir
                        : 0
                }

                return r1Value > r2Value ? dir : r1Value < r2Value ? -dir : 0
            })
            .reduce((p, n) => p || n, 0)
    }
