import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native'
import styled from 'styled-components'

export default function MyButton({
    text,
    onPress,
    inverted,
    viewStyle,
    textStyle,
}: {
    text: string
    onPress: () => void
    inverted?: boolean
    viewStyle?: Record<string, unknown>
    textStyle?: Record<string, unknown>
}): JSX.Element {
    return (
        <TouchableOpacity onPress={onPress}>
            {
            inverted
                ?
            <InvertedButton style={viewStyle || {}}>
                <InvertedButtonText style={textStyle || {}}>
                    {text}
                </InvertedButtonText>
            </InvertedButton>
                :
            <Button style={viewStyle || {}}>
                <ButtonText style={textStyle || {}}>
                    {text}
                </ButtonText>
            </Button>
            }
        </TouchableOpacity>
    )
}

MyButton.defaultProps = {
    inverted: false,
    viewStyle: {},
    textStyle: {},
}

const ButtonGeneric = styled(View)`
    flexDirection: row;
    alignItems: center;
    width: 85%;
    marginTop: 8px;
    marginBottom: 8px;
    paddingLeft: 10px;
    paddingRight: 10px;
    borderRadius: 20px;
`

const Button = styled(ButtonGeneric)`
    paddingTop: 8px;
    paddingBottom: 8px;
    backgroundColor: ${(props) => props.theme.primary}
`

const InvertedButton = styled(ButtonGeneric)`
    paddingTop: 8px;
    paddingBottom: 8px;
    backgroundColor: ${(props) => props.theme.background}
    borderWidth: 2px;
    borderColor: ${(props) => props.theme.background}
`

const ButtonText = styled(Text)`
    fontWeight: bold;
    textTransform: uppercase;
    fontSize: 16px;
    textAlign: center;
    flex: 1px;
    color: ${(props) => props.theme.background};
`

const InvertedButtonText = styled(Text)`
    fontWeight: bold;
    textTransform: none;
    fontSize: 12px;
    textAlign: center;
    flex: 1px;
    color: ${(props) => props.theme.primary};
`

