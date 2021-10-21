export class Section {
    constructor(id = -1, userId = -1, name = '', description = '') {
        this.id = id
        this.userId = userId
        this.name = name
        this.description = description
    }

    public readonly id!: number
    public userId!: number
    public name!: string
    public description!: string
}

export type SectionCreate = Omit<Section, 'id' | 'userId'>

export type SectionUpdate = Pick<Section, 'id'> & Partial<SectionCreate>
