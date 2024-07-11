import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import HomeScreen from './src/screens/HomeScreen'
import DetailsScreen from './src/screens/DetailsScreen'
import PaymentScreen from './src/screens/PaymentScreen'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import TabNavigation from './src/navigators/TabNavigation'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Tab" component={TabNavigation} options={{animation:'slide_from_bottom'}}/>
        <Stack.Screen name="Details" component={DetailsScreen} options={{animation:'slide_from_bottom'}}/>
        <Stack.Screen name="Payment" component={PaymentScreen} options={{animation:'slide_from_bottom'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App