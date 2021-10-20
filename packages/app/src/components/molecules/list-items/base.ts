import { Typography } from '@/styles'

export interface ListItem {
    id: number
}

export interface ListItemBaseProps<T extends ListItem> {
    item: T
}

export function listItemHeightMap<T>(
    listItem: React.ComponentType<T>,
    textSize: Typography.TextSize
): number {
    const listItemBaseOffset = 16
    switch (listItem.name) {
        case 'SectionListItem':
            return (
                listItemBaseOffset +
                Typography.lineHeight('SubHeader', textSize) +
                2 * Typography.lineHeight('Text', textSize)
            )

        case 'IngredientListItem':
            return (
                listItemBaseOffset + 2 * Typography.lineHeight('Text', textSize)
            )

        case 'InstructionListItem':
            return (
                listItemBaseOffset +
                Typography.lineHeight('SubHeader', textSize)
            )

        default:
            console.log(
                `ListItem ${listItem.name} not registered in height map`
            )
            return 100
    }
}