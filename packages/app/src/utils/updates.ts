import { SectionUpdate, Section } from '@recipes/api-types/v1'
import { ListItem } from '@/types'

export function getNewPosition(list: ListItem[], last = true): number {
    if (list.length === 0) {
        return 1
    }

    const sorted = [...list].sort((i1, i2) => i1.position - i2.position)

    if (last) {
        return sorted[sorted.length - 1].position + 1
    } else {
        return sorted[0].position - 1
    }
}

export function sectionUpdateObject(
    old: Section,
    newObject: Section
): SectionUpdate {
    const update: SectionUpdate = { id: old.id }
    if (old.name !== newObject.name) update.name = newObject.name
    if (old.description !== newObject.description)
        update.description = newObject.description
    if (old.position !== newObject.position)
        update.position = newObject.position
    return update
}
