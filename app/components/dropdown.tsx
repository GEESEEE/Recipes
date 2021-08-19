import React, { useState } from 'react'
import { View, TouchableOpacity, Text, Modal } from 'react-native'
import styled from 'styled-components'
import { ButtonOptions } from './user-input/buttons'

export type DropDownItem = {
    text: string
    onPress: () => void | Promise<void>
}

export function DropDown({
    items,
    iconSize = 25,
    iconOffset = 5
}: {
    items: DropDownItem[]
    iconSize?: number
    iconOffset?: number
}): JSX.Element {
    const [open, setOpen] = useState(false)


    const toggle = (): void => {
        setOpen(!open)
    }

    const offset = iconSize + iconOffset

    const Container = styled(View)`
        position: absolute;
        padding-top: ${iconOffset}px;
        padding-end: ${iconOffset}px;
        align-self: flex-end;
        width: 101px;
        height: ${offset + items.length * 25 + 2}px;
        border-color: ${(props) => props.theme.primary}
        border-width: 1px;
    `

    function handleLayout(): void {
        console.log("Layout")
    }


    return (
        <Container>
            <ButtonOptions
                onPress={toggle}
                size={iconSize}
                offset={iconOffset}
            />
            {open
            ?   <DropDownMenu
                    items={items}
                    offset={offset}
                />
            :   null}
        </Container>
    )
}


const DropDownMenu = React.forwardRef(({
    items,
    offset
}: {
    items: DropDownItem[]
    offset: number
}, ref): JSX.Element => {
    const ContainerView = styled(View)`
        position: absolute;
        margin-top: ${offset}px;
        width: 100px;
        background-color: ${(props) => props.theme.background};

    `

    return (
        <ContainerView>
            {items.map(item =>
                <ItemView onPress={item.onPress} key={items.indexOf(item)}>
                    <Item>{item.text}</Item>
                </ItemView>
            )}
        </ContainerView>
    )})

const ItemView = styled(TouchableOpacity)`
    border-width: 1px;
    border-color: ${(props) => props.theme.primary};
    padding: 2px;
    padding-left: 5px;
    height: 25px;
`

const Item = styled(Text)`
    font-size: 14px;
    color: ${(props) => props.theme.primary}
`

// const CreateModal = (x: any): JSX.Element => {
//     console.log("Modal", lay)
//     const Mod = styled(Modal)`
//         width: ${lay.width}px;
//         height: ${lay.height}px;
//         background-color: ${(props) => props.theme.background};
//         border-color: ${(props) => props.theme.primary}
//         border-width: 1px;
//     `

//     return (
//         <Mod
//             transparent={false}
//         >
//             <SampleText>
//                 Modal
//             </SampleText>
//         </Mod>
//     )
// }

const SampleText = styled(Text)`
    color: ${(props) => props.theme.primary}
    font-size: 20px;

`
