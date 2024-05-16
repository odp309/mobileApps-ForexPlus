import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import ScreenNavigator from './ScreenNavigator';

const Router = () => {
  return (
    <NavigationContainer>
        <ScreenNavigator />
    </NavigationContainer>
  )
}

export default Router

const styles = StyleSheet.create({})