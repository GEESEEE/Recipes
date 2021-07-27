import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import colors from '../config/colors'
import globalStyles from '../config/globalStyles'
import MyButton from './MyButton'

export default function AddableListComponent({
    children,
    headerText,
    buttonText,
    onButtonClick,
}:{
    children: JSX.Element[],
    headerText: string
    buttonText: string,
    onButtonClick: () => void
}): JSX.Element {

    return (
        <View style={{...globalStyles.userinput, ...styles.container}}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{headerText}</Text>
            </View>
            {children}

            <MyButton
                text={buttonText}
                onPress={onButtonClick}
                inverted
                viewStyle={styles.button}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.white,
        width: '85%',
        borderWidth: 3,
        borderColor: colors.primary
    },
    button: {
        paddingBottom: 0
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    headerText: {
        flex: 1,
        fontSize: 20,
        textAlign: 'center',
        color: colors.black,
    },

})
