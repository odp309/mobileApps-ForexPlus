import {StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BodyRegularText } from '../components/shared/StyledText' 

const Account = () => {
   
  return (
    <View style={styles.container}>
      <BodyRegularText>Account</BodyRegularText>
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  container : {
    flex:1,
    justifyContent:'center',
    alignItems:'center'
}
})