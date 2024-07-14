import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, FONTFAMILY } from '../theme/theme'
import LottieView from 'lottie-react-native'

interface EmptyListContainerProp {
    title : string,
};

const EmptyListContainer: React.FC<EmptyListContainerProp> = ({title}:any) => {
  return (
    <View style={styles.EmptyCartContainer}>
      <LottieView
        style={styles.LottieStyle}
        source={require('../lottie/coffeecup.json')}
        autoPlay
        loop
      />
      <Text style={styles.LottieText}>{title}</Text>
    </View>
  )
}

export default EmptyListContainer

const styles = StyleSheet.create({
    EmptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
      },
      LottieStyle: {
        height: 300,
      },
      LottieText: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryOrangeHex,
        textAlign: 'center',
      },
})