import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTSIZE, SPACING, FONTFAMILY, BORDERRADIUS } from '../theme/theme'
import GradiantBGIcon from '../components/GradiantBGIcon'
import PaymentMethod from '../components/PaymentMethod'
import PaymentFooter from '../components/PaymentFooter'
import CustomIcons from '../components/CustomIcons'
import LinearGradient from 'react-native-linear-gradient'
import { useStore } from '../store/Store'
import PopupAnimation from '../components/PopupAnimation'

const PaymentList = [
  {
    id: 1,
    name: 'Wallet',
    icon: 'icon',
    isIcon: true
  },
  {
    id: 2,
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false
  },
  {
    id: 3,
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false
  },
  {
    id: 4,
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
  }

]

const PaymentScreen = ({ navigation, route }: any) => {

  const [paymentMode, setPaymentMode] = useState('Credit Card')
  const [showAnimation, setShowAnimation] = useState(false)

  const calculateCartPrice = useStore((state:any) => state.calculateCartPrice)
  const addToOrderHistoryListFromCart = useStore((state:any) => state.addToOrderHistoryListFromCart)
  const buttonPressHandler = () => {
    setShowAnimation(true)
    addToOrderHistoryListFromCart()
    calculateCartPrice()
    setTimeout(() => {
      setShowAnimation(false)
      navigation.navigate('History')
    }, 2000);
  }
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar barStyle='light-content' backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation ? (
        <PopupAnimation 
          source={require('../lottie/successful.json')}
          style={styles.LottieAnimation}
        />
      ) : (<></>)}

      <ScrollView
        contentContainerStyle={styles.ScrollViewFlex}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.HeaderContainer}>
          <TouchableOpacity
            onPress={() => { navigation.goBack() }}
          >
            <GradiantBGIcon name='left' color={COLORS.primaryLightGreyHex} size={16} />
          </TouchableOpacity>
          <Text style={styles.HeaderText}>Payment</Text>
          <View style={styles.EmptyView}></View>
        </View>
        <View style={styles.PaymentOptionsContainer}>
          <TouchableOpacity
            onPress={() => {setPaymentMode('Credit Card')}}
          >
            <View style={[styles.CreditCardContainer, {
              borderColor: paymentMode === 'Credit Card' ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex
            }]}>
              <Text style={styles.CreditCardTitle}>Credit Card</Text>
              <View style={styles.CreditCardBG}>
                <LinearGradient
                  colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                  style={styles.LinearGradientStyle}
                  start={{x:0, y:0}}
                  end={{x:1, y:1}}
                >
                  <View style={styles.CreditCardRow}>
                    <CustomIcons name='chip' color={COLORS.primaryOrangeHex} size={20 * 2} />
                    <CustomIcons name='visa' color={COLORS.primaryWhiteHex} size={30 * 2} />
                  </View>
                  <View style={styles.CreditCardNumberContainer}>
                    <Text style={styles.CreditCardNumber}>****</Text>
                    <Text style={styles.CreditCardNumber}>****</Text>
                    <Text style={styles.CreditCardNumber}>****</Text>
                    <Text style={styles.CreditCardNumber}>1234</Text>
                  </View>
                  <View style={styles.CreditCardRow}>
                    <View style={styles.CreditCardNameContainer}>
                      <Text style={styles.CreditCardNameSubitle}>Card Holder</Text>
                      <Text style={styles.CreditCardNameTitle}>Soham Dwivedi</Text>
                    </View>
                    <View style={styles.CreditCardDateContainer}>
                      <Text style={styles.CreditCardNameSubitle}>Exp Date</Text>
                      <Text style={styles.CreditCardNameTitle}>12/27</Text>
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </View>
          </TouchableOpacity>
          {PaymentList.map((data:any) => (
            <TouchableOpacity key={data.id} onPress={() => {
              setPaymentMode(data.name)
            }}>
              <PaymentMethod 
                paymentMode={paymentMode}
                name = {data.name}
                icon = {data.icon}
                isIcon = {data.isIcon}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <PaymentFooter 
        price={{price: route.params.amount, currency: '$'}} 
        buttonTitle={`Pay with ${paymentMode}`}
        buttonPresshandler={buttonPressHandler}
      />
    </View>
  )
}

export default PaymentScreen
export {PaymentList}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  LottieAnimation: {
    flex: 1,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  HeaderContainer: {
    paddingHorizontal: SPACING.space_24,
    paddingVertical: SPACING.space_15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  EmptyView: {
    height: SPACING.space_36,
    width: SPACING.space_36,
  },
  PaymentOptionsContainer: {
    padding: SPACING.space_15,
    gap: SPACING.space_15,
  },
  CreditCardContainer: {
    padding: SPACING.space_10,
    gap: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_15 * 2,
    borderWidth: 3,
  },
  CreditCardTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    marginLeft: SPACING.space_10,
  },
  CreditCardBG: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: BORDERRADIUS.radius_25,
  },
  LinearGradientStyle: {
    borderRadius: BORDERRADIUS.radius_25,
    gap: SPACING.space_36,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_10,
  },
  CreditCardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CreditCardNumberContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  CreditCardNumber: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
    letterSpacing: SPACING.space_4 + SPACING.space_2,
  },
  CreditCardNameSubitle: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  CreditCardNameTitle: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryWhiteHex,
  },
  CreditCardNameContainer: {
    alignItems: 'flex-start',
  },
  CreditCardDateContainer: {
    alignItems: 'flex-end',
  },
})