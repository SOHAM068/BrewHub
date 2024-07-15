import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/Store';
import { COLORS, SPACING } from '../theme/theme';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import HeaderBar from '../components/HeaderBar';
import EmptyListContainer from '../components/EmptyListContainer';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';

const CartScreen = ({navigation, route}:any) => {
  const CartList = useStore((state:any) => state.CartList);
  const CartPrice = useStore((state:any) => state.CartPrice);
  const calculateCartPrice = useStore((state:any) => state.calculateCartPrice);
  const incrementCartItemQuantity = useStore((state:any) => state.incrementCartItemQuantity);
  const decrementCartItemQuantity = useStore((state:any) => state.decrementCartItemQuantity);
  const addToOrderHistoryListFromCart = useStore((state:any) => state.addToOrderHistoryListFromCart);

  const IncrementCartItemQuantityHandler = (id:string, size:string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  }
  const DecrementCartItemQuantityHandler = (id:string, size:string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  }

  const tabBarHeight = useBottomTabBarHeight();

  // console.log("cartList", CartList.length)
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.ScrollViewFlex, {paddingBottom: tabBarHeight}]}
      >
        <View style={styles.ItemContainer}>
          <HeaderBar title='Cart'/>
          {CartList.length == 0 ? (
            <EmptyListContainer title='Cart is Empty'/>
          ) : (
            <View style={styles.ListItemContainer}>
              {CartList.map((data:any) => (
                <TouchableOpacity
                  key={data.id}
                  onPress={() => {
                    navigation.push('Details', {
                      id: data.id,
                      index: data.index,
                      type: data.type,
                    })
                  }}
                >
                  <CartItem 
                    id={data.id}
                    name={data.name}
                    prices={data.prices}
                    roasted={data.roasted}
                    imagelink_square={data.imagelink_square}
                    type={data.type}
                    special_ingredient={data.special_ingredient}
                    IncrementCartItemQuantityHandler={IncrementCartItemQuantityHandler}
                    DecrementCartItemQuantityHandler={DecrementCartItemQuantityHandler}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
        {CartList.length != 0 ? (
          <PaymentFooter 
            price={{price: CartPrice, currency: '$'}}
            buttonTitle='Checkout'
            buttonPresshandler={() => {navigation.navigate('Payment', {amount : CartPrice})}} 
          />
        )
        : <></>}
      </ScrollView>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
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
    gap: SPACING.space_20,
  },
})