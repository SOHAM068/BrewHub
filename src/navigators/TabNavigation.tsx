import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CartScreen from '../screens/CartScreen'
import HomeScreen from '../screens/HomeScreen'
import FavoritesScreen from '../screens/FavoritesScreen'
import OrderHistoryScreen from '../screens/OrderHistoryScreen'
import CustomIcons from '../components/CustomIcons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS } from '../theme/theme'
import { BlurView } from '@react-native-community/blur'

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <>
      <Tab.Navigator screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: 'black',
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView
            style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0}}
            blurType='light'
            overlayColor=''
            blurAmount={15}
          />
        )
      }}>
        <Tab.Screen name="Home" component={HomeScreen}
          options={{ 
            tabBarIcon: ({ focused, color, size }) => (
            <CustomIcons name="home" color={focused? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} size={size} />) }} 
        />
        <Tab.Screen name="Cart" component={CartScreen} options={{ 
            tabBarIcon: ({ focused, color, size }) => (
            <CustomIcons name="cart" color={focused? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} size={size} />) }} 
        />
        <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ 
            tabBarIcon: ({ focused, color, size }) => (
            <CustomIcons name="like" color={focused? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} size={size} />) }}
        />
        <Tab.Screen name="History" component={OrderHistoryScreen} options={{ 
            tabBarIcon: ({ focused, color, size }) => (
            <CustomIcons name="bell" color={focused? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} size={size} />) }}
        />
      </Tab.Navigator>
    </>
  )
}

export default TabNavigation

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    borderTopWidth: 0,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopColor: 'transparent',
    elevation: 0,
  }
})