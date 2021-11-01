export class Instruction {
    constructor(id = -1, text = '', position = -1) {
        this.id = id
        this.text = text
        this.position = position
    }

    public readonly id!: number
    public text!: string
    public position!: number
}

export type InstructionCreate = Omit<Instruction, 'id'>

export type InstructionUpdate = Pick<Instruction, 'id'> &
    Partial<InstructionCreate>
