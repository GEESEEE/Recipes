import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import styled from 'styled-components'
import { View, IconButton, Icons, Menu } from '@/components/atoms'
import { Spacing } from '@/styles'
import { useAppSelector, usePosition, useToggle } from '@/hooks'
import { utils } from '@/config'

export type DropDownItem = {
    id: number
    text: string
    onPress: () => void | Promise<void>
}

function createDropDownItems(
    onPresses: Array<() => (Promise<void> | void)>,
    name: string
): DropDownItem[] {
    return onPresses.map((onPress) => {
        // Slice recipe off the function name
        const text = utils.capitalizeFirstLetter(
            onPress.name.slice(0, onPress.name.length - name.length)
        )
        return {
            id: onPresses.indexOf(onPress),
            text,
            onPress,
        }
    })
}

type DropdownMenuProps = {
    functions: Array<() =>(Promise<void> | void)>
    name: string,
    iconOffset?: Spacing.Size
    iconSize?: Spacing.Size
    iconColor?: string
    dependencies?: number[]
}

function DropdownMenu({
    functions,
    name,
    iconOffset,
    iconSize,
    iconColor,
    dependencies,
}: DropdownMenuProps): JSX.Element {
    const { theme } = useAppSelector((state) => state.settings)
    const [open, toggle] = useToggle(false)
    const [positionRef, onPosition] = usePosition(dependencies)

    iconSize = iconSize || 'm'
    iconColor = iconColor || theme.primary

    const dropdownItems = createDropDownItems(functions, name)

    let containerStyle: StyleProp<ViewStyle> = {
        borderWidth: 1,
        borderColor: theme.error
    }

    if (typeof iconOffset !== 'undefined') {
        containerStyle = {
            ...containerStyle,
            alignSelf: 'flex-end',
            position: 'absolute',
            paddingTop: Spacing.spacings[iconOffset] ,
            paddingEnd: Spacing.spacings[iconOffset] ,
        }
    }

    return (
        <View
            style={containerStyle}
            onLayout={onPosition}
        >
            <StyledIcon
                IconType={Icons.MyMaterialCommunityIcons}
                iconName='dots-vertical'
                onPress={() => toggle()}
                color={iconColor}
                size={iconSize}
            />
            { open ?
            <Menu
                ref={positionRef}
                items={dropdownItems}
                toggle={() => toggle()}
            /> : null}
        </View>
    )
}
export default DropdownMenu

const StyledIcon = styled(IconButton)`
    border-width: 1px;
    border-color: ${(props) => props.theme.primary};
`
