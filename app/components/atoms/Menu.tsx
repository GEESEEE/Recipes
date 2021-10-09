import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { DropDownItem } from '@/components/molecules'
import Modal from './Modal'
import View from './View'
import Text from './Text'
import { Position, useAppSelector } from '@/hooks'
import { background } from '@/styles/colors'

type MenuProps = {
    items: DropDownItem[]
    toggle: () => void
}

const Menu = React.forwardRef(
    ({ items, toggle }: MenuProps, ref: any): JSX.Element => {
        const { theme } = useAppSelector((state) => state.settings)
        const coords: Position = ref.current
        const insets = useSafeAreaInsets()

        const menuStyle = {
            position: 'absolute',
            height: 100,
            width: 100,
            marginLeft: coords.pageX,
            marginTop: coords.pageY - insets.top,
        }
        console.log('Menu', items, coords, menuStyle)
        return (
            <Modal>
                <Return onPress={() => toggle()} />

                <StyledView
                    borderRadius="s"
                    backgroundColor={theme.backgroundVariant}
                    style={menuStyle}
                >
                    <Text color={theme.primary}>Jaaa</Text>
                </StyledView>
            </Modal>
        )
    }
)

export default Menu

const Return = styled(TouchableOpacity)`
    flex: 1;
    background-color: ${(props) => props.theme.error}
    border-width: 1px;
    border-color: ${(props) => props.theme.primary};
`

const StyledView = styled(View)`
    border-width: 1px;
    border-color: ${(props) => props.theme.primary};
`

const Separator = styled(View)`
    height: 1px;
    width: 100%;
`
