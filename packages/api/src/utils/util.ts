export function groupBy<T>(records: T[], key: string): T[][] {
    const result: T[][] = []
    const keys: any[] = []
    for (const record of records) {
        const recordKey = (record as any)[key]

        if (!keys.includes(recordKey)) {
            keys.push(recordKey)
        }

        const recordGroup = result.find(
            (group) => (group[0] as any)[key] === recordKey
        )
        if (typeof recordGroup === 'undefined') {
            result.push([record])
        } else {
            recordGroup.push(record)
        }
    }

    return result
}

export function mergeArray<T>(arr: T[], mergeBy?: string): T[] {
    const temp: T[][] = groupBy(arr, mergeBy || 'id')
    return temp.map((group) => mergeGroup(group))
}

export function mergeGroup(group: any[]): any {
    let res = group[0]
    group = group.slice(1)
    for (const obj of group) {
        res = mergeObjects(res, obj)
    }

    // Check result for nested arrays that also need merging
    for (const [key, value] of Object.entries(res)) {
        if (Array.isArray(value)) {
            res[key] = mergeArray(value)
        }
    }

    return res
}

export function mergeObjects(obj1: object, obj2: object): object {
    const res: any = {}
    for (const [key1, value1] of Object.entries(obj1)) {
        for (const [key2, value2] of Object.entries(obj2)) {
            if (key1 === key2) {
                if (Array.isArray(value1) && Array.isArray(value2)) {
                    res[key1] = value1.concat(value2)
                } else {
                    res[key1] = value2
                }
            }
        }
    }

    return res
}
