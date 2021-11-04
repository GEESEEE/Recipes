import { GestureChangeEvent } from './events'

export interface ListItem {
    id: number
    position: number
}

export interface ListItemBaseProps<T extends ListItem> {
    item: T
    dropdownItems?: (() => void | Promise<void>)[]
    onGesture?: (e: GestureChangeEvent) => void
    editable?: boolean
    releaseHeight?: boolean
}
