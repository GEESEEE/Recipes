export class Section {
    constructor(
        id = -1,
        userId = -1,
        name = 'section_name',
        description = 'section_description'
    ) {
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
