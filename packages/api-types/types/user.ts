import { Settings } from './settings'

export class User {
    constructor(
        id = 0,
        name = 'name',
        email = 'email',
        settings = new Settings()
    ) {
        this.id = id
        this.name = name
        this.email = email
        this.settings = settings
    }

    public readonly id!: number
    public name!: string
    public email!: string
    public settings!: Settings
}
