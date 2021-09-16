import Recipe from './recipe'
import Settings from './settings'

export default class User {
    public readonly id!: number

    public name!: string

    public password!: string

    public email!: string

    public tokens?: string

    public recipes?: Recipe[]

    public settingsId!: number

    public settings?: Settings
}
