/* eslint-disable react-native/no-inline-styles */
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import styled from 'styled-components'
import { ListItem } from '@/data'
import { useAppSelector } from '@/hooks'
import { MyFeather } from '@/components/Icons'

interface ListItemProps {
    children: (JSX.Element | undefined | null)[]
    list: ListItem[]
    item: ListItem
    editable: boolean
    handleRemove?: (key: string) => void
}

function ListItemWrapper({
    children,
    list,
    item,
    editable,
    handleRemove,
}: ListItemProps): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)
    const index = list.indexOf(item)
    let listSize = list.length - 1
    if (editable) listSize += 1



    return (
        <Container
            style={{
                borderBottomWidth: index === listSize ? 3 : 0,
                borderBottomLeftRadius: index === listSize ? 20 : 0,
                borderBottomRightRadius: index === listSize ? 20 : 0,
                paddingBottom: index === listSize ? 5 : 0,
            }}
        >
            <ItemContainer>{children}</ItemContainer>

            {editable ? (
                <RemoveButton
                    onPress={() =>
                        handleRemove
                            ? handleRemove(item.id.toString())
                            : undefined
                    }
                >
                    <MyFeather name="minus" size={20} color={theme.text} />
                </RemoveButton>
            ) : null}
        </Container>
    )
}

export default ListItemWrapper

const Container = styled(View)`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    border-left-width: 3px;
    border-right-width: 3px;
    border-color: ${(props) => props.theme.primary};
    border-bottom-color: ${(props) => props.theme.primary};
`

const ItemContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-left: 10px;
`

const RemoveButton = styled(TouchableOpacity)`
    align-content: flex-end;
    padding: 3px;
`
