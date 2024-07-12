import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import { Header } from 'react-native/Libraries/NewAppScreen';
import GradiantBGIcon from './GradiantBGIcon';
import ProfilePic from './ProfilePic';

interface HeaderBarProps {
  title ?: string;
}

const HeaderBar : React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View style={styles.headerContainer}>
      <GradiantBGIcon name='menu' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16}/>
      <Text style={styles.headerText}>{title}</Text>
      <ProfilePic />
    </View>
  )
}

export default HeaderBar

const styles = StyleSheet.create({
  headerContainer: {
    padding: SPACING.space_30,
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
  },
  headerText:{
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold
  }
})