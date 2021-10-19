export class Section {
    constructor(
        id = -1,
        name = 'section_name',
        description = 'section_description'
    ) {
        this.id = id
        this.name = name
        this.description = description
    }

    public readonly id!: number
    public name!: string
    public description!: string
}
