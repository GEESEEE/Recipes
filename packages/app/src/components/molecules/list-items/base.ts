export interface ListItemBaseProps<T extends { id: number }> {
    item: T
}

export function listItemHeightMap<T extends ListItemBaseProps<any>>(
    listItem: React.ComponentType<T>
): number {
    console.log(listItem)
    return 100
}
