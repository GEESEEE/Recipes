import { User } from "."

export default class Settings {

    public readonly id!: number

    public theme!: string

    public color!: string

    public invertedColors!: boolean

    public user?: User
}
