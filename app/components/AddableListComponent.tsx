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
        <View style={styles.container}>
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
        marginTop: 8,
        marginBottom: 8,
        paddingTop: 5,
        borderRadius: 12,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: colors.white,
        width: '85%',
        borderWidth: 3,
        borderColor: colors.primary
    },
    button: {

        width: '50%',
        marginTop: 10,
        marginBottom: 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: colors.white,
        borderBottomColor: colors.primary,
        borderBottomWidth: 1,
        paddingBottom: 5,
    },
    headerText: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        color: colors.black,
    },

})
