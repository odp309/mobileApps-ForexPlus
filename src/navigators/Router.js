import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import ScreenNavigator from './ScreenNavigator';
import { StatusBar } from 'expo-status-bar';

const Router = () => {
  return (
    <NavigationContainer >
      <StatusBar style="light" translucent={true} backgroundColor="transparent" />
        <ScreenNavigator />
    </NavigationContainer>
  )
}

export default Router

const styles = StyleSheet.create({})