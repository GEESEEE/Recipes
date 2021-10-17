import { User, Recipe } from '.'

export default class Section {
    public readonly id!: number

    public name!: string

    public description!: string

    public userId!: number

    public user!: User

    public recipes?: Recipe[]
}
