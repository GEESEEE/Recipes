import React from 'react'
import { StyleSheet, TouchableOpacity, View, Text} from 'react-native'
import colors from '../config/colors'
import globalStyles from '../config/globalStyles'

export default function MyButton({
    text,
    onPress,
    viewStyle = {},
    textStyle = {},
}: {
    text: string
    onPress: () => void
    viewStyle?: object
    textStyle?: object
}): JSX.Element {
    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    ...globalStyles.userinput,
                    ...styles.button,
                    ...viewStyle,
                }}
            >
                <Text
                    style={{
                        ...styles.buttonText,
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
    buttonText: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        fontSize: 16,
        textAlign: 'center',
        flex: 1,
        color: colors.white,
    },
})
