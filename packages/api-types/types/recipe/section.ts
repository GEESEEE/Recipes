export class Section {
    constructor(id = -1, name = 'name', description = 'description') {
        this.id = id
        this.name = name
        this.description = description
    }

    public readonly id!: number
    public name!: string
    public description!: string
}
