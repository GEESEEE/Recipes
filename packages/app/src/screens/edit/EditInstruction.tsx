import React from 'react'
import styled from 'styled-components'
import { useRoute } from '@react-navigation/native'
import { Instruction } from '@recipes/api-types/v1'
import { View, Icons } from '@/components/base'
import { useAppDispatch, useEditRecipe, useHeader, useSettings } from '@/hooks'
import { InstructionListItem } from '@/components/molecules'
import { getNewId } from '@/utils'
import { editRecipeActions } from '@/redux'

function EditInstructionScreen({
    navigation,
}: {
    navigation: any
}): JSX.Element {
    const { theme } = useSettings()
    const editRecipe = useEditRecipe()
    const dispatch = useAppDispatch()

    const route = useRoute() as {
        params?: { instructionId: number }
    }
    const editing = Boolean(route.params)

    let instructionId = -1
    if (typeof route.params !== 'undefined') {
        instructionId = route.params.instructionId
    }

    let instruction = editRecipe.instructions.find(
        (instruction) => instruction.id === instructionId
    )
    if (typeof instruction === 'undefined') {
        instruction = new Instruction(getNewId(editRecipe.instructions))
    }

    const [instructionData, setInstructionData] =
        React.useState<Instruction>(instruction)

    const handleCreateInstruction = React.useCallback((): void => {
        dispatch(editRecipeActions.addInstruction(instructionData))
    }, [dispatch, instructionData])

    const handleEditInstruction = React.useCallback((): void => {
        dispatch(editRecipeActions.updateInstructions([instructionData]))
    }, [dispatch, instructionData])

    function handleInstructionTextChange(text: string) {
        setInstructionData({ ...instructionData, text })
    }

    useHeader(navigation, {
        title: editing ? 'Edit Instruction' : 'Create Instruction',
        right: [
            {
                type: Icons.MyFeather,
                name: 'save',
                onPress: () => {
                    editing
                        ? handleEditInstruction()
                        : handleCreateInstruction()
                    navigation.pop()
                },
            },
        ],
    })

    return (
        <Container backgroundColor={theme.background}>
            <InstructionListItem
                item={instructionData}
                editable
                instructions={[instructionData]}
                handleInstructionTextChange={handleInstructionTextChange}
            />
        </Container>
    )
}

export default EditInstructionScreen

const Container = styled(View)`
    flex: 1;
`
