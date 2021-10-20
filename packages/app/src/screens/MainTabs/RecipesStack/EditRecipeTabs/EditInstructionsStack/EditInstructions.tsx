import React from 'react'
import styled from 'styled-components'
import { Instruction } from '@recipes/api-types/v1'
import { View } from '@/components/base'
import { ListItemRecyclerView } from '@/components/organisms'
import { useAppSelector } from '@/hooks'
import { InstructionListItem } from '@/components/molecules'

function EditInstructionsScreen(): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)
    const instructions: Instruction[] = []
    const instrs = [0, 1, 2, 3, 4]
    instrs.forEach((i) =>
        instructions.push(new Instruction(i, `Instruction ${i}`, i))
    )

    return (
        <Container backgroundColor={theme.background}>
            <ListItemRecyclerView
                Element={InstructionListItem}
                data={instructions}
                props={{ instructions }}
            />
        </Container>
    )
}

export default EditInstructionsScreen

const Container = styled(View)`
    flex: 1;
`
