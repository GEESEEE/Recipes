export class Instruction {
    constructor(id = 0, text = '', position = 0) {
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
