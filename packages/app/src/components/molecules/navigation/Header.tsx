import React from 'react'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'
import { SortModal } from '@/components/organisms'
import { View, Text, Icons } from '@/components/base'
import { IconButton, TextInputWithIcons } from '@/components/atoms'
import { useSettings, useToggle } from '@/hooks'
import { Spacing } from '@/styles'
import { LayoutProps } from '@/components/higher-order'

type HeaderIcon = {
    type: any
    name: string
    onPress: () => void
    loading?: boolean
    disabled?: boolean
}

type HeaderIconProps = HeaderIcon & {
    color: string
    size?: Spacing.Size
} & LayoutProps

function HeaderIcon({ size, ...rest }: HeaderIconProps): JSX.Element {
    size = size || 'l'
    return <IconButton size={size} paddingHorizontal="s" {...rest} />
}

export type HeaderConfig = {
    drawer?: boolean
    return?: () => void
    search?: boolean
    sort?: boolean
    title?: string
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
    const { theme, invertedColors } = useSettings()
    const route = useRoute()
    const routeName = route.name

    const [search, toggleSearch] = useToggle(false)
    const [sort, toggleSort] = useToggle(false)

    function handleSearchToggle(): void {
        navigation.setParams({ headerSearch: '' })
        toggleSearch()
    }

    function onChangeText(text: string): void {
        navigation.setParams({ headerSearch: text })
    }

    const height = 45
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
                ) : null}
                {!config.drawer || config.return ? (
                    <HeaderIcon
                        type={Icons.MyMaterialIcons}
                        name="arrow-back"
                        onPress={() => {
                            config.return
                                ? config.return()
                                : navigation.goBack()
                        }}
                        color={color}
                    />
                ) : null}

                <HeaderCenter>
                    {search ? (
                        <TextInputWithIcons
                            leftIcon={
                                <HeaderIcon
                                    type={Icons.MyMaterialIcons}
                                    name="arrow-back"
                                    onPress={() => handleSearchToggle()}
                                    color={color}
                                    size="m"
                                    paddingHorizontal="n"
                                />
                            }
                            autoFocus
                            type="SubHeader"
                            onChangeText={(text: string) => onChangeText(text)}
                            placeholder="Search"
                            paddingVertical="s"
                            paddingHorizontal="s"
                            marginHorizontal="s"
                            width="n"
                        />
                    ) : (
                        <Text
                            type="Header"
                            color={color}
                            paddingHorizontal="m"
                            numberOfLines={1}
                        >
                            {config.title || routeName}
                        </Text>
                    )}
                </HeaderCenter>

                {config.search && !search ? (
                    <HeaderIcon
                        type={Icons.MyMaterialIcons}
                        name="search"
                        onPress={() => handleSearchToggle()}
                        color={color}
                    />
                ) : null}
                {config.sort ? (
                    <HeaderIcon
                        type={Icons.MyMaterialIcons}
                        name="filter-list"
                        onPress={toggleSort}
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
                            disabled={icon.disabled}
                        />
                    )
                })}
                {sort ? <SortModal toggle={() => toggleSort(false)} /> : null}
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
