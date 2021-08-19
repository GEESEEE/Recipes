import React from 'react'
import { StyleSheet } from 'react-native'
import ModalDropdown from 'react-native-modal-dropdown'
import styled from 'styled-components'

import colors from '../config/colors'

const DropDownMenu = ({
    items
}: {
    items: string[]
}): JSX.Element => {
    console.log('DropDownMenu')

    return(
        <DropDown
            options={items}
            textStyle={styles.buttonText}
        />
    )
}

export default DropDownMenu

const DropDown = styled(ModalDropdown)`
    background-color: ${(props) => props.theme.background}
`

const styles = StyleSheet.create({
    buttonText: {
        color: colors.primary,
    }
})
