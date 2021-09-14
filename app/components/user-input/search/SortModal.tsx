import React from 'react'
import styled from 'styled-components'
import { View, Text, Modal } from 'react-native'
import { v4 as uuid } from 'uuid'
import { FeatherButton } from '../Buttons'
import { sorts} from '../../../actions/sort'
import { SortRow } from '.'
import { useAppSelector } from '../../../hooks'

function Sort({ routeName, toggle }: {routeName: string, toggle: () => void}): JSX.Element {
    const theme = useAppSelector((state) => state.theme)

    return (
        <Modal
            animationType='fade'
            transparent
        >
            <Container>
                <ReturnButtonContainer>
                    <FeatherButton
                        iconName="arrow-left"
                        onPress={() => toggle()}
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
        </Modal>

    )}

export default Sort

const Container = styled(View)`
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
