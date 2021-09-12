import React from 'react'
import { View, Text } from 'react-native'
import styled from 'styled-components'
import { useAppSelector } from '../../../hooks'

type FilterHeaderProps = {
    route: string
}

function FilterHeader({
    route
}: FilterHeaderProps): JSX.Element {
    const globalState = useAppSelector((state) => state)

    const search = route === 'Main' ? globalState.browseSearch : globalState.mySearch

    return (
        <Container>
            <SampleText>{search.join(", ")}</SampleText>
        </Container>
    )

}

export default FilterHeader

const Container = styled(View)`
    flex-direction: row;
`

const SampleText = styled(Text)`
    color: ${(props) => props.theme.primary}
`
