import { ScrollView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SPACING, BORDERRADIUS, FONTFAMILY, FONTSIZE } from '../theme/theme'
import { useStore } from '../store/Store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import HeaderBar from '../components/HeaderBar'
import PopupAnimation from '../components/PopupAnimation'
import EmptyListContainer from '../components/EmptyListContainer'
import OrderHistoryCard from '../components/OrderHistoryCard'
import { PaymentList } from './PaymentScreen'
import PaymentMethod from '../components/PaymentMethod'


const OrderHistoryScreen = ({ navigation, route }: any) => {

  const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = useState(false)

  const [paymentMode, setPaymentMode] = useState('Credit Card')
  

  const navigationHandler = ({ index, id, type }: any) => {
    navigation.push('Details', {
      index,
      id,
      type
    })
  }
  const buttonPressHandler = () => {
    setShowAnimation(true)
    setTimeout(() => {
      setShowAnimation(false)
    } ,2000)
  }
  return (
    <View style={styles.ScreenContainer}>
      
      <StatusBar barStyle='light-content' backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation ? (
        <PopupAnimation
          source={require('../lottie/download.json')}
          style={styles.LottieAnimation}
        />) : (<></>)
      }
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title='Order History' />
            {OrderHistoryList.length == 0 ? (
              <EmptyListContainer title='No Order History' />
            ) : (
              <View style={styles.ListItemContainer}>
                {OrderHistoryList.map((data: any, index: any) => (
                  <OrderHistoryCard
                    key={index.toString()}
                    navigationHandler={navigationHandler}
                    CartList={data.CartList}
                    CartListPrice={data.CartListPrice}
                    OrderDate={data.OrderDate}
                    paymentMode={paymentMode}
                    name={data.name}
                  />
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
      {OrderHistoryList.length > 0 ? (
        <TouchableOpacity
          onPress={() => {buttonPressHandler()}}
        >
          <View style={[styles.DownloadButton, {marginBottom: tabBarHeight}]}>
            <Text style={styles.ButtonText}>Download</Text>
          </View>
        </TouchableOpacity>
      ) : <></>}
    </View>
  )
}

export default OrderHistoryScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  LottieAnimation: {
    height: 250,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_30,
  },
  DownloadButton: {
    margin: SPACING.space_20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
})