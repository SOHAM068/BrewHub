import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, FONTFAMILY } from '../theme/theme'
import LottieView from 'lottie-react-native'

interface FovouriteEmptyListLottieProp {
    title : string,
};

const FovouriteEmptyListLottie: React.FC<FovouriteEmptyListLottieProp> = ({title}:any) => {
  return (
    <View style={styles.EmptyCartContainer}>
      <LottieView
        style={styles.LottieStyle}
        source={require('../lottie/Animation - 1720992799799.json')}
        autoPlay
        loop
      />
      <Text style={styles.LottieText}>{title}</Text>
    </View>
  )
}

export default FovouriteEmptyListLottie

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