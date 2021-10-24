import React from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'
import { View, Text, Icons } from '@/components/base'
import { IconButton, TextInputWithIcons } from '@/components/atoms'
import { useAppSelector, useToggle } from '@/hooks'
import { Spacing } from '@/styles'

type HeaderIcon = {
    type: any
    name: string
    onPress: () => void
    loading?: boolean
}

type HeaderIconProps = HeaderIcon & {
    color: string
    size?: Spacing.Size
}

function HeaderIcon({ size, ...rest }: HeaderIconProps): JSX.Element {
    size = size || 'l'
    return <IconButton size={size} paddingHorizontal="n" {...rest} />
}

export type HeaderConfig = {
    drawer?: boolean
    search?: boolean
    right: Array<HeaderIcon>
}

type HeaderComponentProps = {
    navigation: any
    config: HeaderConfig
}

function HeaderComponent({
    navigation,
    config,
}: HeaderComponentProps): JSX.Element {
    const { theme, invertedColors } = useAppSelector((state) => state.settings)
    const route = useRoute()
    const routeName = route.name

    const [search, toggleSearch] = useToggle(false)

    const height = 40
    const insets = useSafeAreaInsets()
    const horizontalInsets = 4

    const backgroundColor = invertedColors ? theme.primary : theme.background
    const color = invertedColors ? theme.background : theme.primary

    const containerStyle = {
        height: insets.top + height,
        backgroundColor,
        borderColor: theme.primary,
        borderBottomWidth: 1,
    }

    const safeContainerStyle = {
        marginTop: insets.top,
        paddingLeft: insets.left + horizontalInsets,
        paddingRight: insets.right + horizontalInsets,
    }

    return (
        <Container style={containerStyle}>
            <SafeContainer style={safeContainerStyle}>
                {config.drawer ? (
                    <HeaderIcon
                        type={Icons.MyFeather}
                        name="menu"
                        onPress={() => navigation.toggleDrawer()}
                        color={color}
                    />
                ) : (
                    <HeaderIcon
                        type={Icons.MyMaterialIcons}
                        name="arrow-back"
                        onPress={() => navigation.pop()}
                        color={color}
                    />
                )}

                <HeaderCenter>
                    {search ? (
                        <TextInputWithIcons
                            leftIcon={
                                <HeaderIcon
                                    type={Icons.MyMaterialIcons}
                                    name="arrow-back"
                                    onPress={() => toggleSearch()}
                                    color={color}
                                    size="m"
                                />
                            }
                            onChangeText={() => console.log('asda')}
                            placeholder="Search"
                            paddingVertical="s"
                            paddingHorizontal="s"
                            marginHorizontal="s"
                            width="n"
                        />
                    ) : (
                        <Text
                            type="SubHeader"
                            color={color}
                            paddingHorizontal="m"
                        >
                            {routeName}
                        </Text>
                    )}
                </HeaderCenter>

                {config.search && !search ? (
                    <HeaderIcon
                        type={Icons.MyMaterialIcons}
                        name="search"
                        onPress={() => toggleSearch()}
                        color={color}
                    />
                ) : null}
                {config.right.map((icon) => {
                    return (
                        <HeaderIcon
                            key={uuid()}
                            type={icon.type}
                            name={icon.name}
                            onPress={icon.onPress}
                            color={color}
                            loading={icon.loading}
                        />
                    )
                })}
            </SafeContainer>
        </Container>
    )
}

export default HeaderComponent

const Container = styled(View)``

const SafeContainer = styled(View)`
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`

const HeaderCenter = styled(View)`
    flex: 1;
`
