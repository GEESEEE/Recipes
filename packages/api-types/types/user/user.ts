import { Settings } from './settings'

export class User {
    public readonly id!: number
    public name!: string
    public email!: string
    public settings?: Settings
}
