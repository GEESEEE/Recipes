import React from 'react'
import styled from 'styled-components'
import { Instruction } from '@recipes/api-types/v1'
import { Icons, View } from '@/components/base'
import { ListItemRecyclerView } from '@/components/organisms'
import { useEditRecipe, useHeader, useSettings } from '@/hooks'
import { InstructionListItem } from '@/components/molecules'
import { sortPosition } from '@/utils'
import { editRecipeActions } from '@/redux'

function EditInstructionsScreen({
    navigation,
}: {
    navigation: any
}): JSX.Element {
    const settings = useSettings()
    const editRecipe = useEditRecipe()
    const { theme } = settings

    useHeader(navigation, {
        title: 'Instructions',
        right: [
            {
                type: Icons.MyFeather,
                name: 'plus',
                onPress: () => navigation.navigate('EditInstruction'),
            },
        ],
    })

    const instructions = sortPosition(editRecipe.instructions)

    const updateSlice = (instructions: Instruction[]) => {
        return editRecipeActions.updateInstructions(instructions)
    }

    return (
        <Container backgroundColor={theme.background}>
            <ListItemRecyclerView
                Element={InstructionListItem}
                data={instructions}
                props={{ instructions, useDropdown: true }}
                dragDrop
                updateSlice={updateSlice}
            />
        </Container>
    )
}

export default EditInstructionsScreen

const Container = styled(View)`
    flex: 1;
`
