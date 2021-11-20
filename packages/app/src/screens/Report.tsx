import React from 'react'
import styled from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ReportType } from '@recipes/api-types'
import { View, Text, TextInput } from '@/components/base'
import { useHeader, useSettings } from '@/hooks'
import { recipeService } from '@/redux'
import { Picker } from '@/components/molecules'
import { Button } from '@/components/atoms'

function ReportScreen(): JSX.Element {
    const { theme } = useSettings()
    const navigation = useNavigation<any>()
    const route = useRoute() as {
        params?: { recipeId: number }
    }

    let recipeId = -1
    if (typeof route.params !== 'undefined') {
        recipeId = route.params.recipeId
    }

    const [state, setState] = React.useState({
        category: ReportType.INVALID,
        description: '',
    })

    function changeCategory(category: ReportType) {
        setState({ ...state, category })
    }

    function changeDescription(description: string) {
        setState({ ...state, description })
    }

    const [reportRecipe, reportRecipeStatus] =
        recipeService.useReportRecipeMutation()

    async function onSubmit() {
        await reportRecipe({
            ...state,
            recipeId,
        })
        navigation.goBack()
    }

    useHeader(navigation, { title: 'Reporting Recipe', right: [] })

    return (
        <Container backgroundColor={theme.background}>
            <Text>Report </Text>
            <Picker
                items={Object.values(ReportType).map((cat, index) => ({
                    id: index,
                    text: cat,
                    onPress: () => changeCategory(cat),
                }))}
                current={state.category}
                original={state.category}
            />
            <TextInput
                placeholder="Description"
                value={state.description}
                onChangeText={(t: string) => changeDescription(t)}
            />
            <Button
                type="Solid"
                text="Submit"
                onPress={() => console.log('Submitting report')}
                loading={reportRecipeStatus.isLoading}
            />
        </Container>
    )
}

export default ReportScreen

const Container = styled(View)`
    flex: 1;
    align-items: center;
`
