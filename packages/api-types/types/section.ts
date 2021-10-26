export class Section {
    constructor(
        id = -1,
        userId = -1,
        name = '',
        description = '',
        position = -1
    ) {
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
