export class Section {
    constructor(id = 0, userId = 0, name = '', description = '', position = 0) {
        this.id = id
        this.userId = userId
        this.name = name
        this.description = description
        this.position = position
    }

    public readonly id!: number
    public userId!: number
    public name!: string
    public description!: string
    public position!: number
}

export type SectionCreate = Omit<Section, 'id'>

export type SectionUpdate = Pick<Section, 'id'> &
    Partial<Omit<SectionCreate, 'userId'>>

export type SectionScopes = 'user' | 'recipes' | 'ids'

export type SectionScopeArgs = {
    userId?: number
    recipeIds?: number[]
    sectionIds?: number[]
}
