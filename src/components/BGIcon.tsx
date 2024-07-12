import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomIcons from './CustomIcons';

interface BGIconProp {
    name : string;
    color : string;
    size : number;
    BGColor : string;
}

const BGIcon: React.FC<BGIconProp> = ({name, color, size, BGColor}) => {
  return (
    <View style={[styles.BGIcon, {backgroundColor:BGColor}]}>
      <CustomIcons name={name} color={color} size={size} />
    </View>
  )
}

export default BGIcon

const styles = StyleSheet.create({
    BGIcon: {
        borderRadius: 8,
        height : 30,
        width : 30,
        justifyContent: 'center',
        alignItems: 'center',
    }
})