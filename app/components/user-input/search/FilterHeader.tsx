import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import { removeSearch } from '../../../actions/search'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { BROWSE_SEARCH_ACTIONS } from '../../../reducers/browse'
import { MY_SEARCH_ACTIONS } from '../../../reducers/my'
import { FeatherButton } from '../Buttons'

function FilterHeader({
    route
}: { route: string }): JSX.Element {
    const globalState = useAppSelector((state) => state)
    const dispatch = useAppDispatch()

    const search = route === 'Main' ? globalState.browseSearch : globalState.mySearch
    const removeSearchType = route === 'Main' ? BROWSE_SEARCH_ACTIONS.REMOVE_SEARCH : MY_SEARCH_ACTIONS.REMOVE_SEARCH

    return (
        <Container>
            <ScrollViewContainer
                horizontal
            >
                {search.map(query => (
                    <QueryContainer key={uuid()}>
                        <QueryText>{query}</QueryText>
                        <FeatherButton
                            iconName="x"
                            onPress={() => dispatch(removeSearch(removeSearchType, query))}
                            size={16}
                        />
                    </QueryContainer>
                ))}
            </ScrollViewContainer>
        </Container>
    )

}

export default FilterHeader

const Container = styled(View)`
    width: 90%;
`

const ScrollViewContainer = styled(ScrollView)`
    flex-direction: row;
    padding-top: 3px;
    padding-bottom: 3px;
`

const QueryContainer = styled(View)`
    flex-direction: row;
    align-items: center;
    background-color: ${(props) => props.theme.backgroundVariant};
    border-radius: 10px;
    margin-right: 8px;
`

const QueryText = styled(Text)`
    color: ${(props) => props.theme.primary};
    padding-bottom: 3px;
    padding-left: 5px;
    padding-right: 5px;
`
