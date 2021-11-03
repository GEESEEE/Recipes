import React from 'react'
import styled from 'styled-components'
import { useRoute } from '@react-navigation/native'
import { Instruction } from '@recipes/api-types/v1'
import { View, Text, Icons } from '@/components/base'
import { useAppDispatch, useEditRecipe, useHeader, useSettings } from '@/hooks'
import { InstructionListItem } from '@/components/molecules'
import { getNewId, getNewPosition } from '@/utils'
import { editRecipeActions } from '@/redux'

function EditInstructionScreen({
    navigation,
}: {
    navigation: any
}): JSX.Element {
    const { theme } = useSettings()
    const editRecipe = useEditRecipe()
    const dispatch = useAppDispatch()

    const route = useRoute()
    const editing = Boolean(route.params)

    let instructionId = -1
    if (route.params) {
        const params = route.params as any
        instructionId = params.instructionId
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
