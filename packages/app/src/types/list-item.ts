export interface ListItem {
    id: number
    position: number
}

export interface ListItemBaseProps<T extends ListItem> {
    item: T
    dropdownItems?: (() => void | Promise<void>)[]
    onGesture?: any
}
