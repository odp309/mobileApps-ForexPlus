import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ForexSaleScreen from '../screens/ForexSaleScreen';

const Stack = createNativeStackNavigator();
const ScreenNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='JualBeliValas' component={ForexSaleScreen} />
    </Stack.Navigator>
  )
}

export default ScreenNavigator

const styles = StyleSheet.create({})