export function getRandomInt(min: number, max: number): number {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
}

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
