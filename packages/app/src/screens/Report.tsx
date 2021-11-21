import React from 'react'
import styled from 'styled-components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ReportType } from '@recipes/api-types/v1'
import { View } from '@/components/base'
import { Button, EditItem, TextInputWithTitle } from '@/components/atoms'
import { Picker } from '@/components/molecules'
import { useAppDispatch, useHeader, useSettings } from '@/hooks'
import { recipeService, reportActions } from '@/redux'

function ReportScreen(): JSX.Element {
    const { theme } = useSettings()
    const dispatch = useAppDispatch()
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
        const report = await reportRecipe({
            ...state,
            category: state.category,
            recipeId,
        })

        if ('data' in report) {
            dispatch(reportActions.addReport(report.data))
        }
        navigation.goBack()
    }

    useHeader(navigation, { title: 'Reporting Recipe', right: [] })

    return (
        <Container backgroundColor={theme.background}>
            <EditItem
                text="Category"
                element={
                    <Picker
                        items={Object.values(ReportType).map((cat, index) => ({
                            id: index,
                            text: cat,
                            onPress: () => changeCategory(cat),
                        }))}
                        current={state.category}
                        original={state.category}
                        width="n"
                    />
                }
                paddingVertical="s"
            />
            <TextInputWithTitle
                placeholder="Description"
                title="Description"
                value={state.description}
                onChangeText={(t: string) => changeDescription(t)}
                multiline
            />

            <Button
                type="Solid"
                text="Submit"
                onPress={() => onSubmit()}
                loading={reportRecipeStatus.isLoading}
                marginVertical="m"
                width="s"
            />
        </Container>
    )
}

export default ReportScreen

const Container = styled(View)`
    flex: 1;
    align-items: center;
`
