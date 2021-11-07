import { TouchableEvent } from './events'

export type DropdownItem = {
    id: number
    text: string
    onPress: (e?: TouchableEvent) => void | Promise<void>
}
