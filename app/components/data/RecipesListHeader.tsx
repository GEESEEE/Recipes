import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { FilterHeader, SortHeader } from '../user-input/search'

interface RecipesListHeaderProps {
    search: string[]
    sort: string[]
}

function RecipesListHeader({
    search,
    sort
}: RecipesListHeaderProps): JSX.Element {

    const display = search.length > 0 || sort.length > 0

    return (
        <Container>
            {display
            ? <Container>
                <FilterHeader route="Recipes" />
                <SortHeader route="Recipes" />
                <Separator />
                </Container>
            : null}

        </Container>
    )
}

export default RecipesListHeader

const Container = styled(View)`

`

const Separator = styled(View)`
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.primary};
`
