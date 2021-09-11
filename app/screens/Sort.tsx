import React from 'react'
import styled from 'styled-components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { View, Text } from 'react-native'
import { v4 as uuid } from 'uuid'
import { FeatherButton } from '../components/user-input/Buttons'
import { sorts } from '../actions/sort'
import SortRow from '../components/user-input/SortRow'

const Sort = ({ navigation }: { navigation: any }): JSX.Element => {
    const routeName = navigation.state.params?.route

    return (
        <Container>
            <ReturnButtonContainer>
                <FeatherButton
                    iconName="arrow-left"
                    onPress={() => navigation.pop()}
                    size={35}
                />
            </ReturnButtonContainer>

            <CategoryHeader>Sort (order matters)</CategoryHeader>
            {sorts.map((sort) => (
                <SortRow
                    key={uuid()}
                    type={sort.type}
                    name={sort.name}
                    options={sort.options}
                    routeName={routeName}
                />
            ))}
        </Container>
    )
}

export default Sort

const Container = styled(SafeAreaView)`
    flex: 1;
    background-color: ${(props) => props.theme.background};
    align-items: center;
    justify-content: flex-start;
`

const ReturnButtonContainer = styled(View)`
    width: 100%;
    height: 50px;
    padding-left: 10px;
`

const CategoryHeader = styled(Text)`
    width: 90%;
    color: ${(props) => props.theme.primary};
    font-size: 20px;
    align-content: flex-start;
`
