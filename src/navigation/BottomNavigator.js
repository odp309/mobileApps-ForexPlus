import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';

const BottomNavigator = () => {
const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="Home"
     screenOptions={{headerShown:false}}>
        <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  )
}

export default BottomNavigator

const styles = StyleSheet.create({

})