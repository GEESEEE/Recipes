import React from 'react'
import styled from 'styled-components'
import { View } from '@/components/base'
import { InstructionsRecyclerListView } from '@/components/organisms'
import { useAppSelector } from '@/hooks'
import { Instruction } from '@/data'

function EditInstructionsScreen(): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)
    const instructions: Instruction[] = []
    const instrs = [0, 1, 2, 3, 4]
    instrs.forEach((i) =>
        instructions.push(new Instruction(i, `Instruction ${i}`, i))
    )

    return (
        <Container backgroundColor={theme.background}>
            <InstructionsRecyclerListView instructions={instructions} />
        </Container>
    )
}

export default EditInstructionsScreen

const Container = styled(View)`
    flex: 1;
`
