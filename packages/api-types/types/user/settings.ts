import { Theme } from './theme'

export class Settings {
    constructor(
        id = -1,
        theme = Theme.DARK,
        color = '#fff',
        invertedColors = false
    ) {
        this.id = id
        this.theme = theme
        this.color = color
        this.invertedColors = invertedColors
    }

    public readonly id!: number
    public theme!: Theme
    public color!: string
    public invertedColors!: boolean
}
