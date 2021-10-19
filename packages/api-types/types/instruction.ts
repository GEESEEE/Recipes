export class Instruction {
    constructor(id = -1, text = 'instruction_text', position = -1) {
        this.id = id
        this.text = text
        this.position = position
    }

    public readonly id!: number
    public text!: string
    public position!: number
}
