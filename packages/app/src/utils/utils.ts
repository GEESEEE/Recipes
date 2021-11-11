import isEqual from 'lodash/isEqual'
import { StyleProp, ViewStyle } from 'react-native'
import { capitalize } from '@recipes/api-types/utils'
import { DropdownItem } from '@/types'
import { ListItem } from '@/types'

export function handleNumericTextInput(
    number: string,
    integer = false
): number {
    let val = parseFloat(number.replace(',', '.'))
    if (integer) {
        val = parseInt(number, 10)
    }
    if (val) {
        return val
    }
    return 0
}

export function createDropDownItems(
    onPresses: Array<() => Promise<void> | void>,
    name: string
): DropdownItem[] {
    return onPresses.map((onPress) => {
        // Slice recipe off the function name
        const text = capitalize(
            onPress.name.slice(0, onPress.name.length - name.length)
        )
        return {
            id: onPresses.indexOf(onPress),
            text,
            onPress,
        }
    })
}

export function sortPosition<T extends ListItem>(arr: T[], ascending = true) {
    return new Array(...arr).sort((a, b) =>
        ascending ? a.position - b.position : b.position - a.position
    )
}

export function round(value: number, decimals: number) {
    return Number(Math.round(Number(value + 'e' + decimals)) + 'e-' + decimals)
}

export function moveElement<T>(
    arr: Array<T>,
    from: number,
    to: number
): Array<T> {
    const element = arr[from]
    arr.splice(from, 1)
    arr.splice(to, 0, element)
    return arr
}

export function inElementOf(arr: string[], val: string): boolean {
    return arr.some((el) => el.includes(val))
}

export function indexOfIncludedElement(arr: string[], val: string): number {
    const found = arr.find((el) => el.includes(val))
    if (typeof found === 'undefined') {
        return -1
    }
    return arr.indexOf(found)
}

export function deleteElement<T>(arr: Array<T>, element: T): boolean {
    const sameElement = arr.find((e) => isEqual(e, element))
    if (!sameElement) return false
    const index = arr.indexOf(sameElement)
    if (index > -1) {
        arr.splice(index, 1)
    }
    return index > -1
}

export function deleteElements<T>(arr: Array<T>, elements: Array<T>): void {
    elements.forEach((element) => deleteElement(arr, element))
}

export function replaceElement<T extends { id: number }>(
    arr: Array<T>,
    element: T
): boolean {
    let res = false
    arr.map((el) => {
        if (el.id === element.id) {
            res = true
            return element
        }
        return el
    })
    return res
}

export function replaceElements<T extends { id: number }>(
    arr: Array<T>,
    arr2: Array<T>
): Array<T> {
    arr.map((el) => arr2.find((el2) => el.id === el2.id) || el)
    return arr
}

// Can be used to merge 2 styles to 1 object containing all style props
export function mergeStyles(styles: Array<any>): StyleProp<ViewStyle> {
    let res: any = {}
    styles.forEach((style) => {
        if (typeof style === 'undefined') {
            return
        }

        if (Object.prototype.toString.call(style) === '[object Array]') {
            style = mergeStyles(style)
        }

        if (Object.prototype.toString.call(style) === '[object Object]') {
            if (Object.keys(style).length > 0) {
                res = { ...res, ...style }
            }
        }
    })

    return res
}

export function searchStyles(styles: any, property: string): any {
    let res: any
    if (Object.prototype.toString.call(styles) === '[object Array]') {
        styles.forEach((style: any) => {
            if (typeof res !== 'undefined') {
                return
            }

            if (typeof style === 'undefined') {
                return
            }

            if (Object.prototype.toString.call(style) === '[object Object]') {
                if (typeof style[property] !== 'undefined') {
                    res = style[property]
                    return
                }
            }

            if (Object.prototype.toString.call(style) === '[object Array]') {
                res = searchStyles(style, property)
            }
        })
    }

    return res
}
