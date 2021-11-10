import { GestureChangeEvent } from './events'

export interface ListItem {
    id: number
    position: number
}

export interface ListItemBaseProps<T extends ListItem> {
    item: T
    useDropdown?: boolean
    onGesture?: (e: GestureChangeEvent) => void
    editable?: boolean
    releaseHeight?: boolean
}
