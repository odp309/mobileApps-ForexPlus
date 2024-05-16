import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StyledButton from '../components/shared/StyledButton'

const LoginScreen = () => {
  return (
    <View>
      <StyledButton mode="primary" title="Primary" onPress={() => console.log("Test")}/>
      
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  
})