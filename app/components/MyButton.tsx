import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import colors from '../config/colors'
import globalStyles from '../config/globalStyles'

export default function MyButton({
    text,
    onPress,
    inverted,
    viewStyle = {},
    textStyle = {},
}: {
    text: string
    onPress: () => void
    inverted?: boolean
    viewStyle?: Record<string, unknown>
    textStyle?: Record<string, unknown>
}): JSX.Element {
    const vStyle = inverted ? styles.invertedButton : styles.button
    const tStyle = inverted ? styles.invertedButtonText : styles.buttonText
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    ...globalStyles.userinput,
                    ...vStyle,
                    ...viewStyle,
                }}
            >
                <Text
                    style={{
                        ...tStyle,
                        ...textStyle,
                    }}
                >
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: colors.primary,
    },
    invertedButton: {
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: colors.white,
        borderWidth: 2,
        borderColor: colors.white
    },
    buttonText: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
        flex: 1,
        color: colors.white,
    },
    invertedButtonText: {
        fontWeight: 'bold',
        textTransform: 'none',
        fontSize: 12,
        textAlign: 'center',
        flex: 1,
        color: colors.primary,
    }
})
