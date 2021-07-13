import { StyleSheet } from 'react-native'
import colors from './colors'

const globalStyles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
    },
    userinput: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '85%',
        marginTop: 8,
        marginBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 5,
        paddingTop: 5,
        borderRadius: 20,
        backgroundColor: colors.lightgrey,
    },

    textinput: {
        flex: 1,
        paddingLeft: 10,
        color: colors.black,
    },
})

export default globalStyles
