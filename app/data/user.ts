import Recipe from './recipe'

export default class User {
    public readonly id!: number

    public name!: string

    public password!: string

    public email!: string

    public tokens?: string

    public recipes?: Recipe[]
}
