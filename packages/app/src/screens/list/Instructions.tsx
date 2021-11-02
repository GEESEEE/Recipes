import React from 'react'
import styled from 'styled-components'
import { Instruction, InstructionUpdate } from '@recipes/api-types/v1'
import { Icons, View } from '@/components/base'
import { ListItemRecyclerView } from '@/components/organisms'
import { useAppSelector, useHeader } from '@/hooks'
import { InstructionListItem } from '@/components/molecules'
import { utils } from '@/utils'
import { editRecipeActions, instructionService } from '@/redux'

function EditInstructionsScreen({
    navigation,
}: {
    navigation: any
}): JSX.Element {
    const { settings, editRecipe } = useAppSelector((state) => state)
    const { theme } = settings

    useHeader(navigation, {
        right: [
            {
                type: Icons.MyFeather,
                name: 'plus',
                onPress: () => navigation.navigate('EditInstruction'),
            },
        ],
    })

    console.log('Instructions', editRecipe.instructions)
    const instructions = utils.sortPosition(editRecipe.instructions)

    const [updateInstructions] =
        instructionService.useUpdateInstructionsMutation()

    const updateSlice = (instructions: Instruction[]) => {
        return editRecipeActions.updateInstructions(instructions)
    }

    const updateDatabase = (instructions: InstructionUpdate[]) => {
        return updateInstructions({
            sectionId: editRecipe.sectionId,
            recipeId: editRecipe.id,
            body: instructions,
        })
    }

    return (
        <Container backgroundColor={theme.background}>
            <ListItemRecyclerView
                Element={InstructionListItem}
                data={instructions}
                props={{ instructions }}
                dragDrop
                updateSlice={updateSlice}
                updateDatabase={updateDatabase}
            />
        </Container>
    )
}

export default EditInstructionsScreen

const Container = styled(View)`
    flex: 1;
`
