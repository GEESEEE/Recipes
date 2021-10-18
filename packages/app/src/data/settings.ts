import { Theme } from '@recipes/api-types/v1'
import { User } from '.'

export default class Settings {
    public readonly id!: number

    public theme!: Theme

    public color!: string

    public invertedColors!: boolean

    public user?: User
}
