export function handleNumericTextInput(number: string, integer = false): number {
    let val = parseFloat(number.replace(',', '.'))
    if (integer) {
        val = parseInt(number, 10)
    }
    if (val) {
        return val
    }
    return 0
}

export function deleteElement<T>(arr: Array<T>, element: T): boolean {
    const index = arr.indexOf(element)
    if (index > -1) {
        arr.splice(index, 1)
    }
    return index > -1
}

export function deleteElements<T>(arr: Array<T>, elements: Array<T>): void {
    elements.forEach(element => deleteElement(arr, element))
}

export function replaceElement<T extends {id: number}>(arr: Array<T>, element: T): boolean {
    let res = false
    arr.map(el => {
        if (el.id === element.id) {
            res = true
            return element
        }
        return el
    })
    return res
}

export function replaceElements<T extends {id: number}>(arr: Array<T>, arr2: Array<T>): Array<T> {
    arr.map(el => arr2.find(el2 => el.id === el2.id) || el)
    return arr
}
