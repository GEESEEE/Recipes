import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../config/colors';

export default function MyFontAwesome({ name }: {name: string}): JSX.Element {
  return (
    <FontAwesome
      name={name}
      color={colors.grey}
      size={20}
    />
  ); 
}
