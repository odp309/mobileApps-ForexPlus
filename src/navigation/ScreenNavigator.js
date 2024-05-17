import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LoginScreen from '../auth/screen/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import ForexSaleScreen from '../screens/ForexSaleScreen';
import BottomNavigator from './BottomNavigator';

const Stack = createNativeStackNavigator();
const ScreenNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='HomeScreen' component={BottomNavigator} />
      <Stack.Screen name='JualBeliValas' component={ForexSaleScreen} />
    </Stack.Navigator>
  )
}

export default ScreenNavigator

const styles = StyleSheet.create({})